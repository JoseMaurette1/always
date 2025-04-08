# Deployment Guide

This guide will help you deploy the Workout Tracker app on Vercel with Supabase integration.

## Prerequisites

1. A Supabase account and project
2. A Vercel account
3. Git repository with your project code

## Setting Up Supabase

1. Create a new Supabase project
2. Go to the SQL Editor and run the following SQL to create the required tables:

```sql
-- Create tables for workouts and exercises
CREATE TABLE public.workouts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    name text NOT NULL,
    user_id text NOT NULL,
    workout_type text NOT NULL,
    metadata jsonb
);

CREATE TABLE public.exercises (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    name text NOT NULL,
    workout_id uuid REFERENCES public.workouts(id) ON DELETE CASCADE,
    sets jsonb NOT NULL,
    rest_timer_duration integer
);

-- Set up RLS policies for secure data access
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Create policies for workouts table
CREATE POLICY "Users can view their own workouts" ON workouts
    FOR SELECT USING (auth.uid()::text = user_id OR user_id LIKE 'temp-%');

CREATE POLICY "Users can insert their own workouts" ON workouts
    FOR INSERT WITH CHECK (auth.uid()::text = user_id OR user_id LIKE 'temp-%');

CREATE POLICY "Users can update their own workouts" ON workouts
    FOR UPDATE USING (auth.uid()::text = user_id OR user_id LIKE 'temp-%');

CREATE POLICY "Users can delete their own workouts" ON workouts
    FOR DELETE USING (auth.uid()::text = user_id OR user_id LIKE 'temp-%');

-- Create policies for exercises table
CREATE POLICY "Users can view their exercises" ON exercises
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM workouts
        WHERE workouts.id = exercises.workout_id AND
              (workouts.user_id = auth.uid()::text OR workouts.user_id LIKE 'temp-%')
    ));

CREATE POLICY "Users can insert exercises" ON exercises
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM workouts
        WHERE workouts.id = exercises.workout_id AND
              (workouts.user_id = auth.uid()::text OR workouts.user_id LIKE 'temp-%')
    ));

CREATE POLICY "Users can update their exercises" ON exercises
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM workouts
        WHERE workouts.id = exercises.workout_id AND
              (workouts.user_id = auth.uid()::text OR workouts.user_id LIKE 'temp-%')
    ));

CREATE POLICY "Users can delete their exercises" ON exercises
    FOR DELETE USING (EXISTS (
        SELECT 1 FROM workouts
        WHERE workouts.id = exercises.workout_id AND
              (workouts.user_id = auth.uid()::text OR workouts.user_id LIKE 'temp-%')
    ));
```

3. Navigate to Authentication and enable Anonymous sign-in (if needed)
4. Get your Supabase URL and Anon Key from Project Settings > API

## Deploying to Vercel

1. Create a new project on Vercel and link it to your Git repository
2. Add the following environment variables:

   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

3. Deploy your project

## Troubleshooting

### Error: "supabaseUrl is required"

If you see this error during build or deployment, it means that your environment variables are not properly set in Vercel. Double-check that:

1. You've added the correct environment variables in your Vercel project settings
2. The variable names are exactly `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. The values are correct and not empty

### Database Connection Issues

If your app deploys but can't connect to your database:

1. Ensure your Supabase project is active and not paused
2. Verify that your Supabase URL and anonymous key are correct
3. Check if the Supabase project has Row Level Security (RLS) enabled for the tables, and that your policies allow the necessary operations

### Need further help?

If you're still encountering issues, please check:

1. The Supabase logs for any errors
2. The Vercel build logs for any compilation issues
3. The browser console for JavaScript errors
