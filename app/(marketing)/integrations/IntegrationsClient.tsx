"use client";

import { useMemo, useState } from "react";
import { brandIcons } from "@/components/icons";
import { integrations } from "@/lib/data";
import s from "../sub.module.css";
import m from "@/components/mock/mock.module.css";

const extra = [
  { id: "x1", name: "Salesforce", category: "Sales", description: "Bi-directional CRM sync with record-level permission checks." },
  { id: "x2", name: "Zendesk", category: "Support", description: "Full ticket lifecycle: triage, draft, resolve, report." },
  { id: "x3", name: "Intercom", category: "Support", description: "Answers from your docs inside the messenger, with clean handoff." },
  { id: "x4", name: "Figma", category: "Design", description: "Comments to issues, design handoff summaries, spec indexing." },
  { id: "x5", name: "Gmail", category: "Communication", description: "Drafts, triage, and follow-ups that respect your label system." },
  { id: "x6", name: "Calendar", category: "Productivity", description: "Meeting prep briefs and follow-ups that actually arrive." },
];

const categories = ["All", "Engineering", "Communication", "Support", "Sales", "Knowledge", "Productivity"];

export default function IntegrationsClient() {
  const [cat, setCat] = useState("All");

  const all = useMemo(
    () =>
      integrations
        .map((t) => ({ ...t }))
        .concat(extra.map((t) => ({ ...t }))),
    []
  );

  const visible = cat === "All" ? all : all.filter((t) => t.category === cat || (cat === "Productivity" && t.category === "Storage"));

  return (
    <div className="container">
      <div className={s.filterRow} role="tablist" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            className={`${s.filterChip} ${cat === c ? s.filterChipActive : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={s.grid3} style={{ gap: 14 }}>
        {visible.map((tool, i) => {
          const BrandIcon = brandIcons[tool.id];
          return (
            <div
              key={`${cat}-${tool.id}`}
              className={`${m.intTile} ${s.tileIn}`}
              style={{ "--tile-delay": `${Math.min(i, 8) * 35}ms` } as React.CSSProperties}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className={m.intIcon}>
                  {BrandIcon ? <BrandIcon size={18} /> : <span style={{ fontSize: 13, fontWeight: 600 }}>{tool.name[0]}</span>}
                </div>
                <div>
                  <div className={m.intName}>{tool.name}</div>
                  <div className={m.intCat}>{tool.category}</div>
                </div>
                <span className="chip chip-bordered" style={{ marginLeft: "auto", fontSize: 10.5 }}>
                  All plans
                </span>
              </div>
              <p className={m.intDesc}>{tool.description}</p>
            </div>
          );
        })}
      </div>

      <p className="caption" style={{ textAlign: "center", marginTop: 32 }}>
        Plus 60+ more through our partner catalog — and anything else via the API.
      </p>
    </div>
  );
}
