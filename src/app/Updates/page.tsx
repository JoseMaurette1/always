import { getUpdates } from "../lib/updates";
import Updates from "../components/Updates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Updates | Always",
  description: "Latest updates and changes to Always",
};

export default async function UpdatesPage() {
  const updates = await getUpdates();
  return <Updates updates={updates} />;
}
