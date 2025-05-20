# Vercel Deployment Guide for FinGenie

This guide will help you deploy your FinGenie application to Vercel without any issues.

## Prerequisites

1. A Vercel account
2. A GitHub, GitLab, or Bitbucket account
3. Your Supabase database credentials

## Step 1: Prepare Your Repository

1. Push your FinGenie code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Make sure your repository includes all the files from the ZIP package

## Step 2: Connect to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New..." > "Project"
3. Select your Git provider and authorize Vercel if needed
4. Find and select your FinGenie repository

## Step 3: Configure Project Settings

1. Leave the Framework Preset as "Next.js"
2. Set the Root Directory to the location of your project (if not the repository root)
3. Under "Environment Variables", add the following:
   - `DATABASE_URL`: Your Supabase PostgreSQL connection string
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `NEXTAUTH_SECRET`: A random string for NextAuth.js (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your Vercel deployment URL (you can update this after the first deployment)

## Step 4: Deploy

1. Click "Deploy"
2. Wait for the build and deployment to complete
3. Once deployed, update the `NEXTAUTH_URL` environment variable with your actual deployment URL

## Troubleshooting

If you encounter any issues:

1. Check the build logs for specific errors
2. Ensure all environment variables are correctly set
3. Verify your Supabase database is accessible from Vercel

## Important Notes

- This version of FinGenie uses serverless-compatible libraries (bcryptjs instead of bcrypt)
- PDF generation is implemented in a serverless-friendly way
- All dependencies are compatible with Vercel's serverless environment

## Updating Your Deployment

To update your deployment:
1. Push changes to your Git repository
2. Vercel will automatically rebuild and redeploy your application

## Custom Domains

To use a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain and follow the verification steps
