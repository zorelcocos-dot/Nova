import type { Metadata } from "next";
import AgentsClient from "./AgentsClient";

export const metadata: Metadata = { title: "Agents" };

export default function AgentsPage() {
  return <AgentsClient />;
}
