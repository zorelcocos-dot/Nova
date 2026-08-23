import type { Metadata, Viewport } from "next";
import ThemeProvider, { themeScript } from "@/components/ThemeProvider";
import ToastProvider from "@/components/ui/Toast";
import Preloader from "@/components/motion/Preloader";
import Cursor from "@/components/motion/Cursor";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Spotlight from "@/components/motion/Spotlight";
import "./globals.css";

/**
 * Painted before first paint, right after the theme script (which already
 * knows the reduce-motion preference):
 *  - tags the document JS-capable (gates the hero entrance sequence),
 *  - pre-emptively completes the preloader for repeat visits / reduced
 *    motion so the curtain never flashes,
 *  - hard fallback: if the app bundle never reports ready within ~4s,
 *    release the page anyway.
 */
const motionScript = `(function(){try{var d=document.documentElement;d.classList.add("js");if(sessionStorage.getItem("nova-preload")==="1"||d.dataset.motion==="reduce"||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.preload="done";d.dataset.ready="1";}setTimeout(function(){if(!d.dataset.preload&&!d.dataset.ready){d.dataset.preload="done";d.dataset.ready="1";}},4200);}catch(e){}})();`;

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Paint the stored theme before first paint — no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Motion-layer boot: JS tag, preloader skip flags, release fallback. */}
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
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
      <body>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
        {/* Motion layer — brand curtain once per session, custom cursor,
            smooth scroll, cursor spotlight */}
        <Preloader />
        <Cursor />
        <SmoothScroll />
        <Spotlight />
      </body>
    </html>
  );
}
