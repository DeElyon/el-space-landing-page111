import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return NextResponse.json({ success: true, jobs: data });
  } catch (error: any) {
    console.error('Error in admin jobs API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
