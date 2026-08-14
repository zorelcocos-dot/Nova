"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCopy,
  IconKey,
  IconShield,
  IconCard,
} from "@/components/icons";
import d from "../dash.module.css";

const tabs = ["Workspace", "Notifications", "Security", "API keys", "Billing"] as const;
type Tab = (typeof tabs)[number];

function Toggle({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`${d.sw} ${on ? d.swOn : ""}`}
      onClick={onClick}
    />
  );
}

export default function SettingsClient() {
  const [tab, setTab] = useState<Tab>("Workspace");
  const [toast, setToast] = useState<string | null>(null);
  const [notif, setNotif] = useState<Record<string, boolean>>({
    digest: true,
    approvals: true,
    failures: true,
    product: false,
  });
  const [keys, setKeys] = useState<string[]>([
    "nvk_live_9f3K••••••••••••8d2A",
    "nvk_test_4mQ1••••••••••••77fF",
  ]);
  const [copied, setCopied] = useState<string | null>(null);

  function notice(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function copy(key: string) {
    navigator.clipboard?.writeText(key).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 1600);
    notice("Key copied to clipboard.");
  }

  return (
    <>
      <div className={d.pageHead}>
        <div>
          <h1 className={d.pageTitle}>Settings</h1>
          <p className={d.pageSub}>Workspace configuration for Arcadia.</p>
        </div>
      </div>

      <div className={d.settingsLayout}>
        <nav className={d.settingsNav} aria-label="Settings">
          {tabs.map((t) => (
            <button
              key={t}
              className={`${d.settingsNavBtn} ${tab === t ? d.settingsNavOn : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>

        <div key={tab} className={d.tabIn}>
          {tab === "Workspace" && (
            <>
              <div className={d.settingsPanel}>
                <div>
                  <div className={d.setTitle}>Workspace profile</div>
                  <div className={d.setDesc}>
                    Visible to members and used in agent signatures.
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="ws-name">Workspace name</label>
                  <input className="input" id="ws-name" defaultValue="Arcadia" />
                </div>
                <div>
                  <label className="label" htmlFor="ws-slug">Workspace URL</label>
                  <input className="input" id="ws-slug" defaultValue="nova.build/arcadia" />
                </div>
                <div>
                  <label className="label" htmlFor="ws-desc">Description</label>
                  <textarea
                    className="textarea"
                    id="ws-desc"
                    style={{ minHeight: 92 }}
                    defaultValue="Product studio building sustainable home tech. Support hours 9–18 CET."
                  />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => notice("Workspace saved.")}>
                    Save changes
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => notice("Changes discarded.")}>
                    Discard
                  </button>
                </div>
              </div>

              <div className={d.settingsPanel} style={{ borderColor: "rgba(196, 43, 43, 0.25)" }}>
                <div>
                  <div className={d.setTitle}>Danger zone</div>
                  <div className={d.setDesc}>
                    Deleting the workspace removes every agent, workflow, and
                    audit trail. This cannot be undone.
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-sm"
                    style={{ border: "1px solid rgba(196,43,43,.4)", color: "#c42b2b" }}
                    onClick={() => notice("Workspace deletion requires email confirmation.")}
                  >
                    Delete workspace…
                  </button>
                </div>
              </div>
            </>
          )}

          {tab === "Notifications" && (
            <div className={d.settingsPanel}>
              <div>
                <div className={d.setTitle}>Notifications</div>
                <div className={d.setDesc}>
                  Choose what lands in your inbox — agents handle the rest.
                </div>
              </div>
              {[
                { id: "digest", t: "Weekly analytics digest", ds: "One email, Monday 8am. Hours saved, top workflows, anomalies." },
                { id: "approvals", t: "Approval requests", ds: "Immediate, batched hourly at most. This is the important one." },
                { id: "failures", t: "Automation failures", ds: "Alert when a workflow errors or a run exceeds its SLA." },
                { id: "product", t: "Product updates", ds: "Occasional, well-written, never about webinars." },
              ].map((row) => (
                <div key={row.id} className={d.setRow}>
                  <div>
                    <div className={d.setTitle}>{row.t}</div>
                    <div className={d.setDesc}>{row.ds}</div>
                  </div>
                  <Toggle
                    on={notif[row.id]}
                    onClick={() => {
                      setNotif((n) => ({ ...n, [row.id]: !n[row.id] }));
                      notice(`${row.t} ${notif[row.id] ? "off" : "on"}.`);
                    }}
                    label={row.t}
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "Security" && (
            <div className={d.settingsPanel}>
              <div>
                <div className={d.setTitle}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <IconShield size={15} /> Security
                  </span>
                </div>
                <div className={d.setDesc}>
                  Account-level protections. Workspace SSO/SAML lives on the
                  Scale plan.
                </div>
              </div>
              <div className={d.setRow}>
                <div>
                  <div className={d.setTitle}>Two-factor authentication</div>
                  <div className={d.setDesc}>TOTP app or hardware key. Required for admins.</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => notice("2FA setup is stubbed in this demo.")}>
                  Enable
                </button>
              </div>
              <div className={d.setRow}>
                <div>
                  <div className={d.setTitle}>Active sessions</div>
                  <div className={d.setDesc}>MacBook Pro · San Francisco — this device</div>
                </div>
                <span className="chip">Current</span>
              </div>
              <div className={d.setRow}>
                <div>
                  <div className={d.setTitle} style={{ fontWeight: 450, color: "var(--ink-2)" }}>
                    iPhone 15 · San Francisco
                  </div>
                  <div className={d.setDesc}>Last active 3 hours ago</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => notice("Session revoked.")}>
                  Revoke
                </button>
              </div>
            </div>
          )}

          {tab === "API keys" && (
            <div className={d.settingsPanel}>
              <div>
                <div className={d.setTitle}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <IconKey size={15} /> API keys
                  </span>
                </div>
                <div className={d.setDesc}>
                  Workspace-scoped keys. Rotate quarterly; treat like
                  passwords.
                </div>
              </div>
              {keys.map((k) => (
                <div key={k} className={d.setRow}>
                  <span className="mono" style={{ fontSize: 13 }}>{k}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => copy(k)}>
                      {copied === k ? <IconCheck size={13} /> : <IconCopy size={13} />}
                      {copied === k ? "Copied" : "Copy"}
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setKeys((ks) => ks.filter((x) => x !== k));
                        notice("Key revoked.");
                      }}
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setKeys((ks) => [...ks, `nvk_live_${Math.random().toString(36).slice(2, 6)}••••••••••••demo`]);
                    notice("New key created — shown once, store it safely.");
                  }}
                >
                  Create key
                </button>
              </div>
            </div>
          )}

          {tab === "Billing" && (
            <>
              <div className={d.settingsPanel}>
                <div>
                  <div className={d.setTitle}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <IconCard size={15} /> Plan & usage
                    </span>
                  </div>
                  <div className={d.setDesc}>Pro — 4 seats, billed yearly.</div>
                </div>
                <div className={d.setRow}>
                  <div>
                    <div className={d.setTitle}>Pro · $23 per seat / month</div>
                    <div className={d.setDesc}>Next invoice September 1 — $1,104.00</div>
                  </div>
                  <span className="chip chip-accent">Save 20% applied</span>
                </div>
                <div className={d.setRow}>
                  <div>
                    <div className={d.setTitle}>Tasks this month</div>
                    <div className={d.setDesc}>12,847 of 20,000 used — resets in 20 days</div>
                  </div>
                  <span className="chip">64%</span>
                </div>
              </div>

              <div className={d.settingsPanel}>
                <div className={d.setTitle}>Invoices</div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Aug 1, 2026", "$1,104.00", "Upcoming"],
                      ["Aug 1, 2025", "$1,104.00", "Paid"],
                      ["Aug 1, 2024", "$948.00", "Paid"],
                    ].map(([date, amt, st]) => (
                      <tr key={date}>
                        <td>{date}</td>
                        <td style={{ fontVariantNumeric: "tabular-nums" }}>{amt}</td>
                        <td>
                          <span className={`chip ${st === "Paid" ? "" : "chip-bordered"}`} style={{ fontSize: 11 }}>
                            {st === "Paid" && <IconCheck size={11} />}
                            {st}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => notice("Receipt PDF downloading…")}>
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {toast && (
        <div className={d.toast} role="status">
          <IconCheck size={14} />
          {toast}
        </div>
      )}
    </>
  );
}
