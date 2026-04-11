import { NextRequest, NextResponse } from 'next/server';
import { initializePayment, verifyPayment, createPayout } from '@/lib/korapay';
import { createPayment, updatePaymentStatus } from '@/lib/supabase';
import { sendPaymentReceivedEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { action, ...payload } = await request.json();

    switch (action) {
      case 'initialize':
        return await handleInitializePayment(payload);
      
      case 'verify':
        return await handleVerifyPayment(payload);
      
      case 'payout':
        return await handlePayout(payload);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleInitializePayment(payload: any) {
  try {
    const { amount, currency, email, name, projectId, milestoneId, userId, type, fullName } = payload;

    if (!amount || !currency || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For wallet funding, use different reference and description
    const isWalletFunding = type === 'wallet_funding';
    const reference = isWalletFunding 
      ? `WALLET-${userId}-${Date.now()}`
      : `EL-${projectId}-${milestoneId}-${Date.now()}`;
    
    const description = isWalletFunding
      ? `Wallet funding - $${amount}`
      : `Payment for milestone on project ${projectId}`;

    // Initialize Korapay payment
    const paymentData = await initializePayment({
      amount,
      currency,
      customer: { name: fullName || name, email },
      reference,
      description,
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/wallet?status=success`,
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/korapay?action=webhook`,
    });

    // Save payment record in our database if not wallet funding (wallet funding is handled separately)
    if (!isWalletFunding) {
      const { data: payment, error } = await createPayment({
        project_id: projectId,
        milestone_id: milestoneId,
        amount,
        currency,
        korapay_reference: paymentData.reference,
        charge_code: paymentData.charge_code,
        checkout_url: paymentData.checkout_url,
        status: 'pending',
      });

      if (error) {
        return NextResponse.json(
          { error: 'Failed to save payment record' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        payment,
        authorization_url: paymentData.checkout_url,
      });
    }

    // For wallet funding, return simpler response
    return NextResponse.json({
      success: true,
      authorization_url: paymentData.checkout_url,
      reference: paymentData.reference,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}

async function handleVerifyPayment(payload: any) {
  try {
    const { reference, paymentId } = payload;

    if (!reference) {
      return NextResponse.json(
        { error: 'Missing reference' },
        { status: 400 }
      );
    }

    // Verify with Korapay
    const verification = await verifyPayment(reference);

    // Update payment status in database
    let newStatus = 'pending';
    if (verification.status === 'success') {
      newStatus = 'completed';
    } else if (verification.status === 'failed') {
      newStatus = 'failed';
    } else if (verification.status === 'pending') {
      newStatus = 'pending';
    }

    const { data: payment, error } = await updatePaymentStatus(
      paymentId,
      newStatus
    );

    if (newStatus === 'completed' && payment) {
      // Send email notification to freelancer
      // This would be connected to the actual email service
      console.log('Payment completed, sending email to freelancer');
    }

    return NextResponse.json({
      success: true,
      status: newStatus,
      payment,
      verification,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

async function handlePayout(payload: any) {
  try {
    const { amount, currency, freelancerId, destinationType, destination } = payload;

    if (!amount || !currency || !freelancerId || !destination) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create payout with Korapay
    const payout = await createPayout({
      amount,
      currency,
      reference: `PAYOUT-${freelancerId}-${Date.now()}`,
      destination: {
        type: destinationType || 'bank_account',
        amount,
        currency,
        ...destination,
      },
    });

    return NextResponse.json({
      success: true,
      payout,
    });
  } catch (error) {
    console.error('Payout error:', error);
    return NextResponse.json(
      { error: 'Failed to process payout' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Handle webhook or callback
  const searchParams = request.nextUrl.searchParams;
  const reference = searchParams.get('reference');
  const status = searchParams.get('status');

  if (reference && status) {
    // This would be called from Korapay webhook
    console.log(`Webhook received: ${reference} - ${status}`);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
