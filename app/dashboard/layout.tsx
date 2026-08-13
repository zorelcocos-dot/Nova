import type { Metadata } from "next";
import Shell from "@/components/dash/Shell";

export const metadata: Metadata = {
  title: "Workspace",
  robots: { index: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
