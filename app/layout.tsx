import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nova.example.com"),
  title: {
    default: "NOVA — Your work, automated by AI",
    template: "%s — NOVA",
  },
  description:
    "NOVA is the AI productivity platform for teams. AI agents, workflow automation, and smart analytics that give your team its time back.",
  keywords: [
    "AI productivity",
    "workflow automation",
    "AI agents",
    "team analytics",
    "NOVA",
  ],
  openGraph: {
    title: "NOVA — Your work, automated by AI",
    description:
      "AI agents and workflow automation that plan, execute, and ship your team's busywork.",
    siteName: "NOVA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA — Your work, automated by AI",
    description:
      "AI agents and workflow automation for modern teams.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/geist-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/geist-latin-600-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
