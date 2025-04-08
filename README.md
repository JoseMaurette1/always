This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase Integration

This application uses Supabase for database and authentication. To deploy it properly, you need to set up the following environment variables in your Vercel project:

1. `NEXT_PUBLIC_SUPABASE_URL` - The URL of your Supabase project
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - The anonymous key for your Supabase project

You can find these values in your Supabase project dashboard under Project Settings > API.

### Local Development

For local development, create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

The application requires the following tables in your Supabase database:

1. `workouts` table with columns:

   - `id` (uuid, primary key)
   - `created_at` (timestamp with timezone)
   - `user_id` (text)
   - `name` (text)
   - `workout_type` (text)
   - `metadata` (jsonb, optional)

2. `exercises` table with columns:
   - `id` (uuid, primary key)
   - `created_at` (timestamp with timezone)
   - `workout_id` (uuid, foreign key to workouts.id)
   - `name` (text)
   - `sets` (jsonb)
   - `rest_timer_duration` (integer, optional)
