import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, getAllPayments, getAllJobs } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const users = await getAllUsers();
    const payments = await getAllPayments();
    const jobs = await getAllJobs();

    const stats = {
      totalUsers: users?.length || 0,
      totalPayments: payments?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0,
      pendingPayments: payments?.filter((p: any) => p.status === 'pending').length || 0,
      totalJobListings: jobs?.length || 0,
      pendingApprovals: jobs?.filter((j: any) => j.status === 'pending').length || 0,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
