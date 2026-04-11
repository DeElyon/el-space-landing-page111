import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return NextResponse.json({ success: true, payments: data });
  } catch (error: any) {
    console.error('Error in admin payments API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
