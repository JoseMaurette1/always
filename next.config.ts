import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // Optimizes for production
  experimental: {
    // Disable static generation for pages that use Supabase client
  },
  serverExternalPackages: ["@supabase/supabase-js"],
};

export default nextConfig;
