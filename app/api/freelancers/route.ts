import { NextRequest, NextResponse } from 'next/server';
import { getFreelancers } from '@/lib/supabase';

interface FreelancerData {
  user_id: string;
  user?: {
    name?: string;
    email?: string;
    avatar_url?: string;
  };
  profile_type?: string;
  hourly_rate?: number;
  avg_rating?: number;
  review_count?: number;
  skills?: string[];
}

export async function GET(request: NextRequest) {
  try {
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    
    const { data, error } = await getFreelancers(limit);
    
    if (error) throw error;
    
    return NextResponse.json({ 
      success: true, 
      freelancers: (data as FreelancerData[]).map((f) => ({
        id: f.user_id,
        name: f.user?.name || 'Unknown',
        title: f.profile_type || 'Freelancer',
        hourlyRate: `$${f.hourly_rate || 0}/hr`,
        rating: f.avg_rating || 5.0,
        reviews: f.review_count || 0,
        skills: f.skills || [],
        badges: ['Verified Expert'], // Default for now
        availability: 'Available Now'
      })) 
    });
  } catch (error: any) {
    console.error('Error in freelancers API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
