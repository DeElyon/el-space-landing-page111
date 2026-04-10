import { NextRequest, NextResponse } from 'next/server';
import { sendClientWelcomeEmail, sendFreelancerWelcomeEmail } from '@/lib/email';
import { createUser, createWallet } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, name, userType } = await request.json();

    if (!email || !name || !userType) {
      return NextResponse.json(
        { error: 'Email, name, and user type are required' },
        { status: 400 }
      );
    }

    // 1. Create user in Supabase
    const { data: user, error } = await createUser(email, name, userType);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. Create wallet for user
    await createWallet(user.id);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://elspace.tech';

    // 3. Send welcome email
    if (userType === 'client') {
      await sendClientWelcomeEmail(email, {
        clientName: name,
        jobTitle: 'Your First Project', // Placeholder
        dashboardUrl: `${appUrl}/dashboard`,
        slackInviteUrl: 'https://slack.com/invite/elspace', // Placeholder
      });
    } else {
      await sendFreelancerWelcomeEmail(email, {
        freelancerName: name,
        elitesUrl: 'https://elites.elspace.tech',
        profileUrl: `${appUrl}/profile`,
        slackInviteUrl: 'https://slack.com/invite/elspace',
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful. Welcome email sent!',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in register:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
