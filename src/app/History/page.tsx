// This is a server component (no "use client" directive)
import HistoryClientPage from "./client-page";

// Force dynamic rendering to prevent prerendering errors with Supabase
export const dynamic = "force-dynamic";

export default function HistoryPage() {
  return <HistoryClientPage />;
}
