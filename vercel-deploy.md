# Vercel Deployment Guide

## Issue Identified
The deployment is failing due to an invalid URL construction in the Supabase client initialization. The error occurs during build time in the `/api/auth/register` route.

## Solution Steps

### 1. Set up Environment Variables in Vercel Dashboard

Go to your Vercel dashboard and follow these steps:

1. Select your project
2. Go to "Settings" tab
3. Click on "Environment Variables"
4. Add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXTAUTH_URL=https://your-vercel-app-url.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret
```

> **Important**: Make sure the NEXT_PUBLIC_SUPABASE_URL is a complete URL starting with `https://`

### 2. Configure Additional Authentication Settings

If you're using Next-Auth, ensure these additional environment variables are set:

```
GITHUB_ID=your-github-oauth-client-id
GITHUB_SECRET=your-github-oauth-client-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

### 3. Redeploy Your Application

After setting up the environment variables:

1. Go to the "Deployments" tab
2. Find your latest deployment
3. Click on the three dots (⋮) menu
4. Select "Redeploy" 

### 4. Verifying Deployment

After redeployment, check:
- Build logs for any remaining errors
- Test authentication and registration functionality

## Troubleshooting

If you continue to encounter issues:

1. Ensure your Supabase URL format is correct in the environment variables
2. Check that your service role key is valid
3. Verify your database tables and schema match what the application expects
4. Consider temporarily disabling server-side rendering for problematic routes 