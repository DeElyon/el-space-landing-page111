import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============ USERS ============

export const createUser = async (email: string, name: string, userType: 'client' | 'freelancer') => {
  const el_space_id = `EL-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const { data, error } = await supabase
    .from('users')
    .insert([{ 
      email, 
      name, 
      user_type: userType, 
      verified_badge: 0, 
      role: 'user',
      el_space_id,
      created_at: new Date(),
      updated_at: new Date()
    }])
    .select();
  return { data: data?.[0], error };
};

export const deleteUser = async (userId: string) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);
  return { error };
};

export const getUser = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  return { data, error };
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

export const getUserBySpaceId = async (spaceId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('el_space_id', spaceId)
    .single();
  return { data, error };
};

// ============ PROJECTS & FEED ============

export const createProject = async (projectData: any) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([{ ...projectData, status: 'open' }])
    .select();
  return { data: data?.[0], error };
};

export const getProject = async (projectId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();
  return { data, error };
};

export const getProjectsByClient = async (clientId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getOpenProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getProjectFeed = async (limit = 20) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      client:users!client_id(name, avatar_url)
    `)
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data, error };
};

export const updateProjectStatus = async (projectId: string, status: string) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ status, updated_at: new Date() })
    .eq('id', projectId)
    .select();
  return { data: data?.[0], error };
};

// ============ FREELANCER PROFILES ============

export const createFreelancerProfile = async (userId: string, profileData: any) => {
  const { data, error } = await supabase
    .from('freelancer_profiles')
    .insert([{ ...profileData, user_id: userId }])
    .select();
  return { data: data?.[0], error };
};

export const getFreelancerProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('freelancer_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

export const getFreelancersBySkills = async (skills: string[], limit = 10) => {
  const { data, error } = await supabase
    .from('freelancer_profiles')
    .select('*')
    .contains('skills', skills)
    .limit(limit)
    .order('avg_rating', { ascending: false });
  return { data, error };
};

export const updateFreelancerProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('freelancer_profiles')
    .update({ ...updates, updated_at: new Date() })
    .eq('user_id', userId)
    .select();
  return { data: data?.[0], error };
};

// ============ MILESTONES ============

export const createMilestone = async (milestoneData: any) => {
  const { data, error } = await supabase
    .from('milestones')
    .insert([{ ...milestoneData, status: 'pending' }])
    .select();
  return { data: data?.[0], error };
};

export const getMilestonesByProject = async (projectId: string) => {
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('project_id', projectId)
    .order('due_date', { ascending: true });
  return { data, error };
};

export const updateMilestoneStatus = async (milestoneId: string, status: string) => {
  const { data, error } = await supabase
    .from('milestones')
    .update({ 
      status, 
      updated_at: new Date(),
      ...(status === 'released' && { released_at: new Date() })
    })
    .eq('id', milestoneId)
    .select();
  return { data: data?.[0], error };
};

// ============ WALLETS & TRANSFERS ============

export const getWallet = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code === 'PGRST116') {
    // Wallet doesn't exist, create one
    return createWallet(userId);
  }
  return { data, error };
};

export const createWallet = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallets')
    .insert([{ user_id: userId, balance: 0, currency: 'USD' }])
    .select();
  return { data: data?.[0], error };
};

export const updateWalletBalance = async (userId: string, amount: number) => {
  // Use a RPC call for atomic increment to avoid race conditions
  const { data, error } = await supabase.rpc('increment_wallet_balance', {
    user_id_param: userId,
    amount_param: amount
  });
  return { data, error };
};

export const internalTransfer = async (fromUserId: string, toSpaceId: string, amount: number) => {
  // 1. Get recipient
  const { data: recipient, error: recError } = await getUserBySpaceId(toSpaceId);
  if (recError || !recipient) throw new Error('Recipient not found');

  // 2. Perform atomic transfer via RPC
  const { data, error } = await supabase.rpc('process_internal_transfer', {
    sender_id: fromUserId,
    recipient_id: recipient.id,
    transfer_amount: amount
  });
  
  return { data, error, recipient };
};

// ============ PAYMENTS ============

export const createPayment = async (paymentData: any) => {
  const { data, error } = await supabase
    .from('payments')
    .insert([{ 
      ...paymentData, 
      status: 'pending',
      created_at: new Date()
    }])
    .select();
  return { data: data?.[0], error };
};

export const getPaymentsByProject = async (projectId: string) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('project_id', projectId);
  return { data, error };
};

export const updatePaymentStatus = async (paymentId: string, status: string) => {
  const { data, error } = await supabase
    .from('payments')
    .update({ status, updated_at: new Date() })
    .eq('id', paymentId)
    .select();
  return { data: data?.[0], error };
};

// ============ REVIEWS ============

export const createReview = async (reviewData: any) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{ ...reviewData, both_submitted: false }])
    .select();
  return { data: data?.[0], error };
};

export const getReviewsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('reviewee_id', userId)
    .eq('visibility', 'public');
  return { data, error };
};

export const getUserAverageRating = async (userId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('reviewee_id', userId)
    .eq('visibility', 'public');
  
  if (error || !data || data.length === 0) return 0;
  const avgRating = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
  return parseFloat(avgRating.toFixed(1));
};

// ============ APPLICATIONS ============

export const createApplication = async (applicationData: any) => {
  const { data, error } = await supabase
    .from('applications')
    .insert([{ ...applicationData, status: 'pending' }])
    .select();
  return { data: data?.[0], error };
};

export const getApplicationsByProject = async (projectId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getApplicationsByFreelancer = async (freelancerId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('freelancer_id', freelancerId);
  return { data, error };
};

export const updateApplicationStatus = async (applicationId: string, status: string) => {
  const { data, error } = await supabase
    .from('applications')
    .update({ status, updated_at: new Date() })
    .eq('id', applicationId)
    .select();
  return { data: data?.[0], error };
};

// ============ EARNINGS ============

export const getFreelancerEarnings = async (freelancerId: string) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('freelancer_id', freelancerId)
    .eq('status', 'completed');
  
  if (error || !data) return { total: 0, earnings: [] };
  const total = data.reduce((sum, p) => sum + (p.amount - p.fee_amount), 0);
  return { total, earnings: data };
};

// ============ TIME LOGS ============

export const createTimeLog = async (timeLogData: any) => {
  const { data, error } = await supabase
    .from('time_logs')
    .select('*')
    .insert([timeLogData])
    .select();
  return { data: data?.[0], error };
};

export const getTimeLogs = async (projectId: string) => {
  const { data, error } = await supabase
    .from('time_logs')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  return { data, error };
};

// ============ SAVED FREELANCERS ============

export const saveFreelancer = async (clientId: string, freelancerId: string) => {
  const { data, error } = await supabase
    .from('saved_freelancers')
    .insert([{ client_id: clientId, freelancer_id: freelancerId }])
    .select();
  return { data: data?.[0], error };
};

export const getSavedFreelancers = async (clientId: string) => {
  const { data, error } = await supabase
    .from('saved_freelancers')
    .select('*')
    .eq('client_id', clientId);
  return { data, error };
};
