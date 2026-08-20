"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import {
  IconPlus,
  IconSearch,
  IconWorkflow,
} from "@/components/icons";
import { automations as seed, type Automation } from "@/lib/data";
import d from "../dash.module.css";
import m from "@/components/mock/mock.module.css";

type Filter = "all" | "active" | "paused";

export default function AutomationsClient() {
  const [items, setItems] = useState<Automation[]>(seed);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const { toast: notice } = useToast();

  const counts = useMemo(
    () => ({
      all: items.length,
      active: items.filter((i) => i.active).length,
      paused: items.filter((i) => !i.active).length,
    }),
    [items]
  );

  const visible = items.filter(
    (i) =>
      (filter === "all" || (filter === "active") === i.active) &&
      i.name.toLowerCase().includes(query.toLowerCase())
  );

  function toggle(id: string) {
    setItems((list) => {
      const next = list.map((i) =>
        i.id === id ? { ...i, active: !i.active } : i
      );
      const t = next.find((i) => i.id === id);
      if (t) notice(t.active ? `“${t.name}” is live.` : `“${t.name}” paused.`);
      return next;
    });
  }

  function createDraft() {
    const n = items.filter((i) => i.id.startsWith("draft")).length + 1;
    setItems((list) => [
      {
        id: `draft-${n}`,
        name: `Untitled workflow ${n}`,
        trigger: "Not configured yet",
        runs: "—",
        success: "—",
        lastRun: "Never",
        active: false,
      },
      ...list,
    ]);
    notice("Draft created. Open the canvas to finish it.");
  }

  return (
    <>
      <div className={d.pageHead}>
        <div>
          <h1 className={d.pageTitle}>Automations</h1>
          <p className={d.pageSub}>
            Trigger → conditions → actions, with a log for every run.
          </p>
        </div>
        <div className={d.headActions}>
          <button className="btn btn-primary btn-sm" onClick={createDraft}>
            <IconPlus size={14} /> New automation
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <div className={d.segRow} role="tablist" aria-label="Filter automations">
          {(["all", "active", "paused"] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`${d.seg} ${filter === f ? d.segOn : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "active" ? "Active" : "Paused"} · {counts[f]}
            </button>
          ))}
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 34,
            width: 240,
            padding: "0 12px",
            background: "var(--surface)",
            border: "1px solid var(--line-2)",
            borderRadius: 9,
            color: "var(--ink-3)",
          }}
        >
          <IconSearch size={13.5} />
          <input
            aria-label="Search automations"
            placeholder="Search automations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 13,
              width: "100%",
            }}
          />
        </div>
      </div>

      <div className={m.card}>
        {visible.length === 0 ? (
          <div style={{ padding: "56px 20px", textAlign: "center" }}>
            <div style={{ color: "var(--ink-3)", display: "inline-flex", marginBottom: 12 }}>
              <IconWorkflow size={28} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>No automations match</div>
            <p className="body-s" style={{ marginTop: 6 }}>
              Try a different search, or create a new one.
            </p>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: 16 }} onClick={createDraft}>
              <IconPlus size={13} /> New automation
            </button>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 34, paddingLeft: 18 }}></th>
                  <th>Name</th>
                  <th>Trigger</th>
                  <th>Runs · 7d</th>
                  <th>Success</th>
                  <th>Last run</th>
                  <th style={{ textAlign: "right", paddingRight: 18 }}>Enabled</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((a) => (
                  <tr key={a.id}>
                    <td style={{ paddingLeft: 18 }}>
                      <span className={`dot ${a.active ? "dot-ok" : ""}`} />
                    </td>
                    <td style={{ fontWeight: 500 }}>{a.name}</td>
                    <td style={{ color: "var(--ink-2)" }}>{a.trigger}</td>
                    <td style={{ fontVariantNumeric: "tabular-nums" }}>{a.runs}</td>
                    <td style={{ fontVariantNumeric: "tabular-nums" }}>{a.success}</td>
                    <td style={{ color: "var(--ink-3)" }}>{a.lastRun}</td>
                    <td style={{ textAlign: "right", paddingRight: 18 }}>
                      <button
                        role="switch"
                        aria-checked={a.active}
                        aria-label={`Enable ${a.name}`}
                        className={`${d.sw} ${a.active ? d.swOn : ""}`}
                        onClick={() => toggle(a.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </>
  );
}
