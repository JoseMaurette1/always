# Vercel Deployment Guide for Supabase Integration

This guide covers how to solve common issues with deploying Next.js applications that use Supabase on Vercel, particularly the "supabaseUrl is required" and "supabaseKey is required" errors.

## Understanding the Issue

The error occurs during Vercel's build process when trying to prerender pages that use the Supabase client. The issue happens because:

1. During prerendering, the Supabase client tries to initialize even before the environment variables are available
2. The static generation process doesn't have access to runtime environment variables

## Solution Overview

We've implemented a three-part solution:

1. **Environment Variables in Vercel**: Set up proper environment variables in Vercel project settings
2. **Code Modifications**: Make the Supabase client initialization resilient to missing environment variables
3. **Next.js Configuration**: Prevent static prerendering of pages that use Supabase

## Setting Up Environment Variables in Vercel

1. In your Vercel dashboard, navigate to your project
2. Go to "Project Settings" → "Environment Variables"
3. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Code Modifications

### 1. Resilient Supabase Client Initialization

In `lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

// Safely access environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create a supabase client only if the URL and key are available
let supabase: ReturnType<typeof createClient> | null = null;

// Don't create the client during server-side build if variables are missing
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Log the issue for debugging, only on client-side
  if (typeof window !== "undefined") {
    console.warn("Supabase credentials not available, client not initialized.");
  }
}

export { supabase };
```

### 2. Handling Null Supabase Client in API Functions

Update all API functions to check if the Supabase client is available before using it:

```typescript
// Example in lib/api.ts
export const getWorkoutHistory = async (): Promise<WorkoutEntry[]> => {
  try {
    // Check if Supabase client is initialized
    if (!supabase) {
      console.warn(
        "Supabase client not initialized, cannot get workout history"
      );
      return [];
    }

    // Rest of the function...
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
```

## Next.js Configuration

### 1. Prevent Static Generation of Specific Pages

Add the `dynamic` export to any pages that use Supabase:

```typescript
// In src/app/workouts/page.tsx, src/app/History/page.tsx, etc.
export const dynamic = "force-dynamic";
```

### 2. Update Next.js Config

In `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Optimizes for production
  experimental: {
    // Your experimental settings
  },
  serverExternalPackages: ["@supabase/supabase-js"],
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
```

### 3. Configure Vercel Build Settings

In `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "next build --no-lint",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@next_public_supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@next_public_supabase_anon_key"
  }
}
```

## Debugging Deployment Issues

If you still experience issues:

1. **Check Environment Variables**: Verify they're correctly set in Vercel project settings
2. **Check Build Logs**: Look for any errors in Vercel build logs
3. **Local Testing**: Try running `next build` locally with `.env.production` configured
4. **Incremental Deployment**: If changing many files, consider deploying incrementally

## Conclusion

By implementing these changes, your Next.js application with Supabase integration should build successfully on Vercel without the "supabaseUrl is required" or "supabaseKey is required" errors.
