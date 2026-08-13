import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark, IconCheck, IconChevronRight } from "@/components/icons";
import AuthForm from "../AuthForm";
import s from "../auth.module.css";

export const metadata: Metadata = {
  title: "Get started",
  description: "Create your NOVA workspace — free, no credit card required.",
};

export default function SignupPage() {
  return (
    <div className={s.page}>
      <div className={s.card}>
        <div className={s.formCol}>
          <Link href="/" className={s.backLink}>
            <IconChevronRight size={13} style={{ transform: "rotate(180deg)" }} />
            Back to nova.build
          </Link>
          <LogoMark size={30} />
          <h1 className={s.heading}>Create your workspace.</h1>
          <p className={s.sub}>
            Free forever for your first 1,000 tasks a month. No credit card
            required.
          </p>
          <AuthForm mode="signup" />
        </div>

        <div className={s.pane}>
          <div>
            <p className={s.paneQuote}>
              Your first agent is usually live in under ten minutes.
            </p>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Connect a tool in read-only mode",
                "Watch your agent draft its first outputs",
                "Approve a few, tune the guardrails",
                "Switch to act-when-confident",
              ].map((step, i) => (
                <div key={step} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "var(--ink)",
                      color: "var(--bg)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11.5,
                      fontWeight: 600,
                      flex: "none",
                    }}
                  >
                    {i < 1 ? <IconCheck size={12} /> : i + 1}
                  </span>
                  <span style={{ fontSize: 14, color: "var(--ink-2)", letterSpacing: "-0.008em" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={s.paneStats}>
            <div className={s.paneStat}>
              <b>9 min</b>
              <span>Median time to first task</span>
            </div>
            <div className={s.paneStat}>
              <b>Free</b>
              <span>Starter plan, forever</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
