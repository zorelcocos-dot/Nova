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
} from "@/components/icons";
import d from "@/app/dashboard/dash.module.css";

export type PaletteAction = {
  id: string;
  label: string;
  group: string;
  hint?: string;
  icon: (p: { size?: number }) => React.ReactElement;
  run: (router: ReturnType<typeof useRouter>) => void;
};

export const paletteActions: PaletteAction[] = [
  { id: "overview", label: "Go to Overview", group: "Navigate", hint: "G O", icon: IconGrid, run: (r) => r.push("/dashboard") },
  { id: "agents", label: "Go to Agents", group: "Navigate", hint: "G A", icon: IconAgent, run: (r) => r.push("/dashboard/agents") },
  { id: "automations", label: "Go to Automations", group: "Navigate", hint: "G W", icon: IconWorkflow, run: (r) => r.push("/dashboard/automations") },
  { id: "analytics", label: "Go to Analytics", group: "Navigate", hint: "G N", icon: IconChart, run: (r) => r.push("/dashboard/analytics") },
  { id: "settings", label: "Go to Settings", group: "Navigate", hint: "G S", icon: IconGear, run: (r) => r.push("/dashboard/settings") },
  { id: "new-agent", label: "Deploy a new agent", group: "Create", icon: IconPlus, run: (r) => r.push("/dashboard/agents") },
  { id: "new-automation", label: "Create an automation", group: "Create", icon: IconPlus, run: (r) => r.push("/dashboard/automations") },
  { id: "docs", label: "Open documentation", group: "Help", icon: IconBook, run: (r) => r.push("/docs") },
  { id: "logout", label: "Log out", group: "Account", hint: "⇧ ⌘ Q", icon: IconLogout, run: (r) => r.push("/login") },
];

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? paletteActions.filter((a) => a.label.toLowerCase().includes(q))
      : paletteActions;
    return list;
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
    a.run(router);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
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
