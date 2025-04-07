# CI/CD Setup with GitHub Actions and Vercel

This guide explains how to set up Continuous Integration and Continuous Deployment (CI/CD) for the Educational Platform using GitHub Actions and Vercel.

## Overview

The CI/CD pipeline automatically deploys your application to Vercel whenever changes are pushed to the main branch. It:

1. Checks out the latest code
2. Sets up Node.js
3. Installs dependencies
4. Builds the project
5. Deploys to Vercel production

## Required Secrets

You need to add the following secrets to your GitHub repository:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `VERCEL_TOKEN` | API token for Vercel | From Vercel account settings → Tokens |
| `VERCEL_ORG_ID` | Your Vercel organization ID | From Vercel project settings → General → "Vercel for GitHub" section |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | From Vercel project settings → General → "Vercel for GitHub" section |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | From Supabase project settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | From Supabase project settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | From Supabase project settings → API |
| `NEXT_PUBLIC_APP_URL` | Your production app URL | e.g., `https://your-app.vercel.app` |
| `NEXTAUTH_URL` | Same as `NEXT_PUBLIC_APP_URL` | e.g., `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | A secret key for NextAuth | Generate with `openssl rand -base64 32` |

## Setting up Secrets in GitHub

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click on "Secrets and variables" → "Actions"
4. Click "New repository secret" to add each secret

## Getting Vercel Configuration Values

### Vercel Token
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your profile picture in the top-right corner
3. Select "Settings"
4. Go to "Tokens" tab
5. Create a new token with scope "Full Account"
6. Copy the token value

### Vercel Organization and Project IDs
1. Go to your project in Vercel Dashboard
2. Click on "Settings"
3. Scroll down to "Vercel for GitHub" section
4. You'll find both Organization ID and Project ID there

## Testing the Workflow

You can manually trigger the workflow by:

1. Going to your GitHub repository
2. Clicking on the "Actions" tab
3. Selecting the "Deploy to Vercel" workflow
4. Clicking "Run workflow" button

## Troubleshooting

If your workflow fails, check:

1. GitHub Actions logs for specific error messages
2. Verify all secrets are correctly set
3. Ensure your Vercel token has the necessary permissions
4. Check that your Supabase project is active and the API keys are valid

## Custom Domains

To use a custom domain:

1. Add your domain in Vercel project settings
2. Update the `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` secrets to match your domain
3. Configure your DNS settings as instructed by Vercel 