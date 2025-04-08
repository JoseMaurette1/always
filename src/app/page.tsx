"use client";
import LoginPage from "./components/LoginPage";

// Force dynamic rendering to prevent prerendering errors with Supabase
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <LoginPage />
    </>
  );
}
