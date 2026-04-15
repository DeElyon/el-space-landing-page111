import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'el-space-secret-key';
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GitHubUserInfo {
  id: string;
  login: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  company?: string;
  location?: string;
  blog?: string;
}

/**
 * GET /api/auth/github - Generate GitHub OAuth URL
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  if (action === 'url') {
    const state = Math.random().toString(36).substring(7);
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    
    githubAuthUrl.searchParams.append('client_id', GITHUB_CLIENT_ID || '');
    githubAuthUrl.searchParams.append('redirect_uri', `${REDIRECT_URI}/api/auth/github/callback`);
    githubAuthUrl.searchParams.append('scope', 'user:email read:user');
    githubAuthUrl.searchParams.append('state', state);
    githubAuthUrl.searchParams.append('allow_signup', 'true');

    return NextResponse.json(
      { url: githubAuthUrl.toString(), state },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: 'Invalid request. Use action=url' },
    { status: 400 }
  );
}
