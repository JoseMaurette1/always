// This is a server component (no "use client" directive)
import WorkoutsClientPage from "./client-page";

// Force dynamic rendering to prevent prerendering errors with Supabase
export const dynamic = "force-dynamic";

export default function WorkoutsPage() {
  return <WorkoutsClientPage />;
}
