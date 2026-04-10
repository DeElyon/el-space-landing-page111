import { NextRequest, NextResponse } from 'next/server';
import { getWallet, updateWalletBalance, createPayment } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const { data: wallet, error } = await getWallet(userId);

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to fetch wallet' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      wallet: wallet || {
        id: userId,
        user_id: userId,
        balance: 0,
        pending: 0,
        total_earned: 0,
      }
    });
  } catch (error) {
    console.error('[Wallet] Error fetching wallet:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, amount, description, metadata } = body;

    if (!userId || !type || !amount) {
      return NextResponse.json(
        { error: 'User ID, type, and amount are required' },
        { status: 400 }
      );
    }

    if (type === 'withdraw') {
      // Create withdrawal payment
      const { data: payment, error } = await createPayment({
        user_id: userId,
        amount,
        type: 'withdrawal',
        status: 'pending',
        description: description || 'Withdrawal request',
        metadata: {
          ...metadata,
          requested_at: new Date().toISOString(),
        },
      });

      if (error) {
        return NextResponse.json(
          { error: error.message || 'Failed to create withdrawal' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Withdrawal request created',
        payment
      });
    } else if (type === 'deposit') {
      // Update wallet balance for deposit
      const { error } = await updateWalletBalance(userId, amount);

      if (error) {
        return NextResponse.json(
          { error: error.message || 'Failed to update wallet' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Deposit processed',
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid transaction type' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('[Wallet] Error processing transaction:', error);
    return NextResponse.json(
      { error: 'Failed to process transaction' },
      { status: 500 }
    );
  }
}
