"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CommandPalette from "@/components/dash/CommandPalette";
import Notifications from "@/components/dash/Notifications";
import {
  LogoMark,
  IconGrid,
  IconAgent,
  IconWorkflow,
  IconChart,
  IconGear,
  IconSearch,
  IconMenu,
  IconLogout,
} from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";
import { agents } from "@/lib/data";
import d from "@/app/dashboard/dash.module.css";

const nav = [
  { label: "Overview", href: "/dashboard", icon: IconGrid },
  { label: "Agents", href: "/dashboard/agents", icon: IconAgent, count: "4" },
  { label: "Automations", href: "/dashboard/automations", icon: IconWorkflow, count: "12" },
  { label: "Analytics", href: "/dashboard/analytics", icon: IconChart },
  { label: "Settings", href: "/dashboard/settings", icon: IconGear },
];

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/agents": "Agents",
  "/dashboard/automations": "Automations",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
};

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [palOpen, setPalOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setDrawer(false);
  }, [pathname]);

  const title = titles[pathname] ?? "Overview";

  return (
    <div className={d.shell}>
      {/* Sidebar */}
      <aside className={`${d.side} ${drawer ? d.sideOpen : ""}`}>
        <div className={d.sideBrand}>
          <LogoMark size={24} />
          <span className={d.sideWs}>Arcadia</span>
          <span className={d.sideWsTag}>Pro</span>
        </div>

        <button className={d.sideSearch} onClick={() => setPalOpen(true)}>
          <IconSearch size={14} />
          <span>Search or ask…</span>
          <span className="kbd">⌘K</span>
        </button>

        <div className={d.sideSection}>
          <div className={d.sideLabel}>Workspace</div>
          {nav.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${d.sideLink} ${active ? d.sideLinkActive : ""}`}
              >
                <item.icon />
                {item.label}
                {item.count && <span className={d.sideCount}>{item.count}</span>}
              </Link>
            );
          })}
        </div>

        <div className={d.sideSection}>
          <div className={d.sideLabel}>Your agents</div>
          {agents.map((a) => (
            <Link key={a.id} href="/dashboard/agents" className={d.agentMini}>
              <span
                className="dot"
                style={{
                  background:
                    a.status === "Working" ? "var(--ok)" : "var(--ink-3)",
                }}
              />
              <span>{a.role}</span>
              <span className={d.agentMiniMeta}>{a.status}</span>
            </Link>
          ))}
        </div>

        <div className={d.sideFoot}>
          <div className={d.usageCard}>
            <div className={d.usageTop}>
              <span>Tasks this month</span>
              <span style={{ color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>
                12.8k / 20k
              </span>
            </div>
            <div className={d.usageBar}>
              <i />
            </div>
            <div className={d.usageNote}>
              Pro plan · <Link href="/pricing" style={{ color: "var(--accent)" }}>Upgrade to Scale</Link>
            </div>
          </div>
          <div className={d.userRow}>
            <div className={d.userAv}>MC</div>
            <div>
              <div className={d.userName}>Maya Chen</div>
              <div className={d.userRole}>Admin</div>
            </div>
            <Link href="/login" className={d.logoutBtn} aria-label="Log out" title="Log out">
              <IconLogout size={15} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`${d.sideOverlay} ${drawer ? d.sideOverlayOpen : ""}`}
        onClick={() => setDrawer(false)}
        aria-hidden
      />

      {/* Main */}
      <div className={d.body}>
        <header className={d.topbar}>
          {/* Hairline progress on every route change — re-keyed by path */}
          <span key={pathname} className={d.routeProgress} aria-hidden />
          <button
            className={d.menuToggle}
            onClick={() => setDrawer(true)}
            aria-label="Open navigation"
          >
            <IconMenu size={19} />
          </button>
          <nav className={d.crumbs} aria-label="Breadcrumb">
            <span className={d.crumbRoot}>Arcadia</span>
            <span className={d.crumbSep}>/</span>
            <span className={d.crumbPage}>{title}</span>
          </nav>

          <button className={d.topSearch} onClick={() => setPalOpen(true)}>
            <IconSearch size={13.5} />
            <span>Search or ask…</span>
            <span className="kbd">⌘K</span>
          </button>
          <ThemeToggle compact />
          <Notifications />
          <span className={d.topAv} aria-label="Account">
            MC
          </span>
        </header>

        <main className={d.content}>{children}</main>
      </div>

      <CommandPalette open={palOpen} onClose={() => setPalOpen(false)} />
    </div>
  );
}
