import { NextRequest, NextResponse } from 'next/server';
// Email imports moved to inside POST function
import { createUser, createWallet, createFreelancerProfile, createClientProfile } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      name, 
      userType, 
      password,
      // Client fields
      companyName,
      businessType,
      industry,
      companySize,
      phoneNumber,
      countryCode,
      companyLogo,
      // Freelancer fields
      techStack,
      experienceLevel,
      aboutYou,
      profilePicture,
      cvUrl,
    } = body;

    if (!email || !name || !userType) {
      return NextResponse.json(
        { error: 'Email, name, and user type are required' },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 1. Create user in Supabase
    const { data: user, error } = await createUser(email, name, userType);
    if (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: error.message || 'Failed to create user' }, { status: 400 });
    }

    // Update user with password hash
    const { supabase } = await import('@/lib/supabase');
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        password_hash: passwordHash,
        phone_number: phoneNumber || null,
        country_code: countryCode || null,
        avatar_url: userType === 'freelancer' ? profilePicture : companyLogo,
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating user:', updateError);
    }

    // 2. Create wallet for user
    await createWallet(user.id);

    // 3. Create role-specific profile
    if (userType === 'client') {
      const { error: clientError } = await createClientProfile(user.id, {
        company_name: companyName || name,
        business_type: businessType || 'Starter Business',
        industry: industry || 'Other',
        company_size: companySize || '1-10 employees (Startup)',
        phone_number: phoneNumber || null,
        country_code: countryCode || null,
        company_logo: companyLogo || null,
        total_spent: 0,
        total_projects_posted: 0,
        avg_rating: 0,
        total_reviews: 0,
        verification_status: 'unverified',
      });

      if (clientError) {
        console.error('Error creating client profile:', clientError);
      }
    } else if (userType === 'freelancer') {
      const { error: freelancerError } = await createFreelancerProfile(user.id, {
        hourly_rate: 0,
        years_experience: experienceLevel ? parseInt(experienceLevel.split('-')[1]) || 0 : 0,
        skills: techStack || [],
        total_earnings: 0,
        total_projects: 0,
        avg_rating: 0,
        total_reviews: 0,
        availability_status: 'available',
        bio: aboutYou || '',
        languages: ['English'],
        profile_picture: profilePicture || null,
        cv_url: cvUrl || null,
        tech_stack: techStack || [],
      });

      if (freelancerError) {
        console.error('Error creating freelancer profile:', freelancerError);
      }
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://elspace.tech';

    // 4. Send welcome email
    if (userType === 'client') {
      const { sendClientWelcomeEmail } = await import('@/lib/email');
      await sendClientWelcomeEmail(email, {
        clientName: name,
        companyName: companyName || name,
        jobTitle: 'Your First Project',
        dashboardUrl: `${appUrl}/dashboard`,
        slackInviteUrl: 'https://slack.com/invite/elspace',
      });
    } else {
      const { sendFreelancerWelcomeEmail } = await import('@/lib/email');
      await sendFreelancerWelcomeEmail(email, {
        freelancerName: name,
        techStack: techStack?.slice(0, 3).join(', ') || 'your skills',
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
        userType,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in register:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to register user' },
      { status: 500 }
    );
  }
}
