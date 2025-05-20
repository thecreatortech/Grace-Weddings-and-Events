# FinGenie - Vercel Deployment Guide

This guide will help you deploy your FinGenie application to Vercel without any issues.

## Prerequisites

1. A Vercel account
2. A GitHub, GitLab, or Bitbucket account
3. Your Supabase database credentials

## Step 1: Environment Variables

Before deploying, make sure you have the following environment variables ready:

```
DATABASE_URL=your_supabase_postgres_connection_string
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=a_random_string_for_nextauth
NEXTAUTH_URL=your_vercel_deployment_url
```

## Step 2: Deployment Steps

1. **Push your code to GitHub**:
   - Create a new repository on GitHub
   - Push the FinGenie code to this repository

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "Add New..." > "Project"
   - Select your GitHub repository with the FinGenie code

3. **Configure Project Settings**:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
   - Install Command: npm install

4. **Add Environment Variables**:
   - Add all the environment variables listed above
   - For NEXTAUTH_URL, you can update it after the first deployment with your actual Vercel URL

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build and deployment to complete

## Troubleshooting

If you encounter any issues:

1. **Build Errors**:
   - Check the build logs for specific errors
   - Ensure all environment variables are correctly set

2. **Database Connection Issues**:
   - Verify your Supabase connection string is correct
   - Make sure your Supabase database is accessible from Vercel

3. **Authentication Problems**:
   - Ensure NEXTAUTH_SECRET and NEXTAUTH_URL are properly set
   - Update NEXTAUTH_URL after the first deployment with your actual Vercel URL

## Important Notes

- This version of FinGenie uses serverless-compatible libraries (bcryptjs instead of bcrypt)
- All dependencies are compatible with Vercel's serverless environment
- The PDF generation is implemented in a serverless-friendly way

## Custom Domains

To use a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain and follow the verification steps

## Updating Your Deployment

To update your deployment:
1. Push changes to your Git repository
2. Vercel will automatically rebuild and redeploy your application
