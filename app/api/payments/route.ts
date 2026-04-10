import { NextRequest, NextResponse } from 'next/server';
import { initializePayment, verifyPayment } from '@/lib/korapay';
import { supabase, updateWalletBalance, createPayment, updatePaymentStatus } from '@/lib/supabase';
import { calculateClientFee, calculateFreelancerPayout, getProjectSize } from '@/lib/fees';

/**
 * Handle payment actions:
 * 1. fund-wallet: Initialize Korapay payment to fund client wallet
 * 2. verify-funding: Verify Korapay payment and update wallet balance
 * 3. fund-milestone: Move funds from wallet to project escrow
 * 4. release-payment: Release funds from escrow to freelancer (with fees/penalties)
 */
export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json();

    switch (action) {
      case 'fund-wallet':
        return await handleFundWallet(params);
      case 'verify-funding':
        return await handleVerifyFunding(params);
      case 'fund-milestone':
        return await handleFundMilestone(params);
      case 'release-payment':
        return await handleReleasePayment(params);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error in payments API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleFundWallet({ amount, currency, email, name, userId }: any) {
  if (!amount || !email || !userId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const reference = `WAL-${userId}-${Date.now()}`;
  const data = await initializePayment({
    amount,
    currency: currency || 'USD',
    customer: { email, name: name || email },
    reference,
    description: 'Funding EL SPACE wallet',
  });

  // Record pending payment in DB
  await createPayment({
    user_id: userId,
    amount,
    currency: currency || 'USD',
    status: 'pending',
    reference,
    payment_type: 'wallet_funding',
  });

  return NextResponse.json({ success: true, checkout_url: data.checkout_url, reference });
}

async function handleVerifyFunding({ reference, userId }: any) {
  const data = await verifyPayment(reference);
  
  if (data.status === 'success') {
    // Check if already processed to avoid double funding
    const { data: existing } = await supabase
      .from('payments')
      .select('*')
      .eq('reference', reference)
      .single();
    
    if (existing && existing.status === 'completed') {
      return NextResponse.json({ success: true, message: 'Already funded' });
    }

    // Update wallet balance
    await updateWalletBalance(userId, data.amount);
    
    // Update payment record
    await updatePaymentStatus(existing.id, 'completed');

    return NextResponse.json({ success: true, amount: data.amount });
  }

  return NextResponse.json({ success: false, status: data.status });
}

async function handleFundMilestone({ userId, milestoneId, projectId, amount }: any) {
  // 1. Check wallet balance
  const { data: wallet } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', userId)
    .single();

  const clientFee = calculateClientFee(amount);
  const totalNeeded = amount + clientFee;

  if (!wallet || wallet.balance < totalNeeded) {
    return NextResponse.json({ error: 'Insufficient wallet balance' }, { status: 400 });
  }

  // 2. Deduct from wallet
  await updateWalletBalance(userId, -totalNeeded);

  // 3. Create escrow payment record
  await createPayment({
    user_id: userId,
    project_id: projectId,
    milestone_id: milestoneId,
    amount: amount,
    fee_amount: clientFee,
    currency: 'USD',
    status: 'escrowed',
    payment_type: 'milestone_funding',
  });

  return NextResponse.json({ success: true });
}

async function handleReleasePayment({ milestoneId, freelancerId, isLate }: any) {
  // 1. Get escrowed payment
  const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('milestone_id', milestoneId)
    .eq('status', 'escrowed')
    .single();

  if (!payment) {
    return NextResponse.json({ error: 'Escrowed payment not found' }, { status: 404 });
  }

  // 2. Calculate payout
  const payout = calculateFreelancerPayout(payment.amount, isLate);
  
  // 3. Update freelancer wallet
  await updateWalletBalance(freelancerId, payout);

  // 4. Mark payment as released
  await updatePaymentStatus(payment.id, 'released');

  return NextResponse.json({ success: true, payout });
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  const { data: wallet } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single();

  return NextResponse.json({ wallet });
}
