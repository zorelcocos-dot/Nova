import type { Metadata } from "next";
import AutomationsClient from "./AutomationsClient";

export const metadata: Metadata = { title: "Automations" };

export default function AutomationsPage() {
  return <AutomationsClient />;
}
