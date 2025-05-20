# FinGenie - Deployment Instructions

## Prerequisites
- Node.js 18+ and npm
- Supabase account
- Vercel account (for deployment)
- Resend account (for email functionality)
- Twilio account (for WhatsApp functionality)

## Local Development Setup

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.local` to your project root
   - Fill in your Supabase credentials and other API keys

4. **Initialize Prisma**
   ```bash
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Vercel Deployment

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project to Vercel**
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "Add New" > "Project"
   - Select your repository
   - Configure the project:
     - Framework Preset: Next.js
     - Build Command: npm run build
     - Output Directory: .next

3. **Add environment variables**
   - Add all variables from your `.env.local` file to Vercel project settings
   - Make sure to add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXTAUTH_URL` (set to your Vercel deployment URL)
     - `NEXTAUTH_SECRET`
     - `RESEND_API_KEY`
     - `TWILIO_ACCOUNT_SID`
     - `TWILIO_AUTH_TOKEN`
     - `TWILIO_WHATSAPP_NUMBER`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

## Supabase Setup

1. **Create a new Supabase project**
   - Go to [Supabase](https://supabase.com) and sign in
   - Create a new project

2. **Set up database schema**
   - Use the Prisma schema to create your tables in Supabase
   - Enable Row Level Security (RLS) for all tables
   - Create appropriate policies for data access

3. **Enable authentication**
   - Configure email authentication
   - Set up OAuth providers if needed

4. **Get API credentials**
   - Go to Project Settings > API
   - Copy the URL and anon key to your environment variables

## Troubleshooting

If you encounter build errors on Vercel:

1. **Check path aliases**
   - Ensure tsconfig.json is properly configured
   - Verify all imports use correct paths

2. **Verify environment variables**
   - Make sure all required environment variables are set in Vercel

3. **Check build logs**
   - Review Vercel build logs for specific errors
   - Fix any dependency or import issues

4. **Local build test**
   - Run `npm run build` locally to verify it builds successfully
   - Fix any errors before deploying again

## Support

If you need further assistance, please contact support or refer to the documentation for each service:

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Twilio Documentation](https://www.twilio.com/docs)
