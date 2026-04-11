import { NextRequest, NextResponse } from 'next/server';
import { 
  createApplication, 
  getApplicationsByProject, 
  getApplicationsByFreelancer, 
  updateApplicationStatus, 
  updateProjectStatus, 
  createMilestone, 
  getUserById, 
  getProject,
  getFreelancerProfile 
} from '@/lib/supabase';
import { calculateClientFee } from '@/lib/fees';

export async function POST(request: NextRequest) {
  try {
    const { freelancerId, projectId, coverLetter, rate, estimatedDays } = await request.json();

    if (!freelancerId || !projectId || !coverLetter) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const appData = {
      freelancer_id: freelancerId,
      project_id: projectId,
      cover_letter: coverLetter,
      proposed_rate: rate,
      estimated_days: estimatedDays,
      status: 'pending' as const,
    };

    const { data, error } = await createApplication(appData);

    if (error) throw error;

    return NextResponse.json({ success: true, application: data }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { applicationId, status, clientId } = await request.json();

    if (!applicationId || !status) {
      return NextResponse.json({ error: 'applicationId and status required' }, { status: 400 });
    }

    // 1. Update application status
    const { data: application, error: appError } = await updateApplicationStatus(applicationId, status);
    if (appError) throw appError;

    if (status === 'accepted') {
        // 2. Mark project as in_progress
        const { data: project, error: projError } = await getProject(application.project_id);
        if (projError) throw projError;
        
        await updateProjectStatus(application.project_id, 'in_progress');

        // 3. Create initial milestone
        const milestoneAmountValue = application.proposed_rate || project.total_budget || 0;
        const { data: milestone, error: mileError } = await createMilestone({
            project_id: application.project_id,
            freelancer_id: application.freelancer_id,
            title: 'Initial Milestone',
            description: 'Phase 1 of project delivery',
            amount: milestoneAmountValue,
            due_date: new Date(Date.now() + (application.estimated_days || 7) * 24 * 60 * 60 * 1000).toISOString(),
            status: 'funded',
        });
        if (mileError) throw mileError;

        // 4. Send emails
        const { data: client } = await getUserById(clientId || project.client_id);
        const { data: freelancer } = await getUserById(application.freelancer_id);
        
        if (client && freelancer) {
            const clientFee = calculateClientFee(milestoneAmountValue);
            const commonData = {
                clientName: client.name,
                freelancerName: freelancer.name,
                projectTitle: project.title,
                milestoneAmount: milestoneAmountValue,
                platformFee: clientFee,
                totalCharged: milestoneAmountValue + clientFee,
                projectSlug: project.id,
                timezone: 'UTC',
                milestone1Description: milestone.description,
                milestone1DueDate: milestone.due_date,
                slackChannelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
                dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
                receiptUrl: `${process.env.NEXT_PUBLIC_APP_URL}/receipts/${milestone.id}`,
                paymentMethodLast4: 'XXXX',
                transactionId: `TRX-${milestone.id}`,
            };

            try {
              const { sendMilestoneFundedEmail } = await import('@/lib/email');
              await sendMilestoneFundedEmail(client.email, 'client', commonData);
              await sendMilestoneFundedEmail(freelancer.email, 'freelancer', {
                  ...commonData,
                  feePercentage: '5%',
                  yourEarnings: milestoneAmountValue * 0.95,
                  milestone1Deliverables: 'To be provided by client',
                  slackChannelUrl: commonData.slackChannelUrl,
              });
            } catch (emailError) {
              console.warn('Email sending failed:', emailError);
            }
        }
    }

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const projectId = request.nextUrl.searchParams.get('projectId');
    const freelancerId = request.nextUrl.searchParams.get('freelancerId');

    if (projectId) {
      const { data, error } = await getApplicationsByProject(projectId);
      if (error) throw error;
      
      // Enhance applications with freelancer data
      const applicationsWithFreelancer = await Promise.all(
        (data || []).map(async (app: any) => {
          const { data: freelancer } = await getFreelancerProfile(app.freelancer_id);
          const { data: user } = await getUserById(app.freelancer_id);
          return {
            ...app,
            freelancer: freelancer ? {
              ...freelancer,
              full_name: user?.user_metadata?.full_name || user?.email || 'Anonymous',
              profile_picture: user?.user_metadata?.profile_picture || null,
            } : null,
          };
        })
      );
      
      return NextResponse.json({ applications: applicationsWithFreelancer });
    }

    if (freelancerId) {
      const { data, error } = await getApplicationsByFreelancer(freelancerId);
      if (error) throw error;
      return NextResponse.json({ applications: data });
    }

    return NextResponse.json({ error: 'projectId or freelancerId required' }, { status: 400 });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
