"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconGrid,
  IconAgent,
  IconWorkflow,
  IconChart,
  IconGear,
  IconPlus,
  IconBook,
  IconLogout,
  IconSearch,
  IconArrowRight,
  IconSun,
  IconMoon,
  IconDisplay,
} from "@/components/icons";
import { useTheme } from "@/components/ThemeProvider";
import { useFocusTrap } from "@/components/hooks";
import d from "@/app/dashboard/dash.module.css";

/** Everything an action is allowed to touch. */
export type PaletteContext = {
  router: ReturnType<typeof useRouter>;
  setTheme: (t: "light" | "dark" | "system") => void;
};

export type PaletteAction = {
  id: string;
  label: string;
  group: string;
  hint?: string;
  /** Extra words that should match this action in search. */
  keywords?: string;
  icon: (p: { size?: number }) => React.ReactElement;
  run: (ctx: PaletteContext) => void;
};

export const paletteActions: PaletteAction[] = [
  { id: "overview", label: "Go to Overview", group: "Navigate", hint: "G O", keywords: "home dashboard stats", icon: IconGrid, run: ({ router }) => router.push("/dashboard") },
  { id: "agents", label: "Go to Agents", group: "Navigate", hint: "G A", keywords: "research sales support data", icon: IconAgent, run: ({ router }) => router.push("/dashboard/agents") },
  { id: "automations", label: "Go to Automations", group: "Navigate", hint: "G W", keywords: "workflows rules triggers", icon: IconWorkflow, run: ({ router }) => router.push("/dashboard/automations") },
  { id: "analytics", label: "Go to Analytics", group: "Navigate", hint: "G N", keywords: "charts reports hours saved", icon: IconChart, run: ({ router }) => router.push("/dashboard/analytics") },
  { id: "settings", label: "Go to Settings", group: "Navigate", hint: "G S", keywords: "workspace billing api keys", icon: IconGear, run: ({ router }) => router.push("/dashboard/settings") },
  { id: "new-agent", label: "Deploy a new agent", group: "Create", keywords: "add hire", icon: IconPlus, run: ({ router }) => router.push("/dashboard/agents") },
  { id: "new-automation", label: "Create an automation", group: "Create", keywords: "add workflow rule", icon: IconPlus, run: ({ router }) => router.push("/dashboard/automations") },
  { id: "theme-light", label: "Switch to light theme", group: "Appearance", keywords: "colour mode bright day", icon: IconSun, run: ({ setTheme }) => setTheme("light") },
  { id: "theme-dark", label: "Switch to dark theme", group: "Appearance", keywords: "colour mode night", icon: IconMoon, run: ({ setTheme }) => setTheme("dark") },
  { id: "theme-system", label: "Match system theme", group: "Appearance", keywords: "colour mode auto os", icon: IconDisplay, run: ({ setTheme }) => setTheme("system") },
  { id: "docs", label: "Open documentation", group: "Help", keywords: "guide reference api help", icon: IconBook, run: ({ router }) => router.push("/docs") },
  { id: "logout", label: "Log out", group: "Account", hint: "⇧ ⌘ Q", keywords: "sign out exit", icon: IconLogout, run: ({ router }) => router.push("/login") },
];

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useFocusTrap<HTMLDivElement>(open, onClose);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paletteActions;
    // Match the visible label first, then the hidden keyword aliases,
    // so "night" finds "Switch to dark theme".
    return paletteActions.filter((a) =>
      `${a.label} ${a.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function runAction(a: PaletteAction) {
    onClose();
    a.run({ router, setTheme });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    // Escape is handled by the focus trap.
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && results[active]) runAction(results[active]);
  }

  if (!open) return null;

  let lastGroup = "";

  return (
    <div className={d.palOverlay} onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className={d.pal}
        role="dialog"
        aria-label="Command palette"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className={d.palInputRow}>
          <IconSearch size={16} />
          <input
            ref={inputRef}
            className={d.palInput}
            placeholder="Search actions, pages, and agents…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search commands"
          />
          <span className="kbd">esc</span>
        </div>
        <div className={d.palList}>
          {results.length === 0 && (
            <div style={{ padding: "22px 14px", fontSize: 13.5, color: "var(--ink-3)" }}>
              No results for &ldquo;{query}&rdquo;.
            </div>
          )}
          {results.map((a, i) => {
            const groupHeader = a.group !== lastGroup ? a.group : null;
            lastGroup = a.group;
            return (
              <div key={a.id}>
                {groupHeader && <div className={d.palGroup}>{groupHeader}</div>}
                <button
                  className={`${d.palItem} ${i === active ? d.palItemActive : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => runAction(a)}
                >
                  <a.icon size={15} />
                  {a.label}
                  {a.hint && <span className={d.palHint}>{a.hint}</span>}
                  {!a.hint && i === active && (
                    <span className={d.palHint}>
                      <IconArrowRight size={13} />
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
        <div className={d.palFoot}>
          <span><span className="kbd">↑↓</span> navigate</span>
          <span><span className="kbd">↵</span> select</span>
          <span><span className="kbd">esc</span> close</span>
        </div>
      </div>
    </div>
  );
}
