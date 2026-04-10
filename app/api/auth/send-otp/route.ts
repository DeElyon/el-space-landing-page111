import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, storeOTP } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/email';

const VALID_TYPES = ['register', 'login', 'transfer', 'withdrawal'];

export async function POST(request: NextRequest) {
  try {
    const { email, type } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid request type. Must be one of: ' + VALID_TYPES.join(', ') },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP(6);
    storeOTP(email, otp, 900); // 15 minutes

    // Try to send email, but don't fail if email is not configured
    let emailSent = false;
    try {
      await sendOTPEmail(email, otp);
      console.log(`[OTP] Sent to ${email} for ${type}`);
      emailSent = true;
    } catch (emailError) {
      console.warn('[OTP] Email sending failed, but OTP is stored:', emailError);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `OTP for ${type} sent to your email`,
        otp: otp,
        emailSent
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[OTP] Error in send-otp:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP. Please try again.' },
      { status: 500 }
    );
  }
}
