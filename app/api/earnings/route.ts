import { NextRequest, NextResponse } from 'next/server';
import { getFreelancerEarnings, getWallet, updateWalletBalance, createPayment } from '@/lib/supabase';
import { calculateFreelancerPayout, calculateInstantPayFee } from '@/lib/fees';

export async function GET(request: NextRequest) {
  try {
    const freelancerId = request.nextUrl.searchParams.get('freelancerId');

    if (!freelancerId) {
      return NextResponse.json({ error: 'freelancerId required' }, { status: 400 });
    }

    const { data: wallet } = await getWallet(freelancerId);
    const { total, earnings } = await getFreelancerEarnings(freelancerId);

    // Calculate earnings statistics
    const completedProjects = earnings.length;
    const pendingEarnings = earnings.reduce((sum: number, e: any) => {
      if (e.status === 'pending' || e.status === 'processing') return sum + (e.amount - (e.fee_amount || 0));
      return sum;
    }, 0);

    return NextResponse.json({
      wallet,
      earnings,
      stats: {
        totalEarnings: total,
        completedProjects,
        pendingEarnings,
        averageProjectValue: completedProjects > 0 ? (total / completedProjects).toFixed(2) : 0,
      }
    });
  } catch (error: any) {
    console.error('Error fetching earnings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { freelancerId, amount, type } = await request.json();

    if (!freelancerId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: wallet } = await getWallet(freelancerId);
    if (!wallet || wallet.balance < amount) {
        return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    let payoutAmount = amount;
    let fee = 0;

    if (type === 'instant') {
        fee = calculateInstantPayFee(amount);
        payoutAmount = amount - fee;
    }

    // 1. Deduct from wallet
    await updateWalletBalance(freelancerId, -amount);

    // 2. Create withdrawal payment record
    const { data: payment } = await createPayment({
        user_id: freelancerId,
        amount: amount,
        fee_amount: fee,
        currency: wallet.currency,
        status: 'processing',
        payment_type: 'withdrawal',
        metadata: { withdrawal_type: type }
    });

    return NextResponse.json({
      success: true,
      message: type === 'instant' ? 'Instant withdrawal processed' : 'Standard withdrawal requested',
      withdrawal: {
        id: payment.id,
        amount: payoutAmount,
        fee,
        status: 'processing',
        createdAt: new Date().toISOString(),
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error processing withdrawal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
