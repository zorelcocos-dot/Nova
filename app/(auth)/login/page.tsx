import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark, IconChevronRight } from "@/components/icons";
import AuthForm from "../AuthForm";
import s from "../auth.module.css";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your NOVA workspace.",
};

export default function LoginPage() {
  return (
    <div className={s.page}>
      <div className={s.card}>
        <div className={s.formCol}>
          <Link href="/" className={s.backLink}>
            <IconChevronRight size={13} style={{ transform: "rotate(180deg)" }} />
            Back to nova.build
          </Link>
          <LogoMark size={30} />
          <h1 className={s.heading}>Welcome back.</h1>
          <p className={s.sub}>
            Log in to the Arcadia workspace. This template signs you straight
            into the demo dashboard.
          </p>
          <AuthForm mode="login" />
        </div>

        <div className={s.pane}>
          <div>
            <p className={s.paneQuote}>
              &ldquo;It feels like we hired ten people who never sleep and
              never complain.&rdquo;
            </p>
            <div className={s.paneWho}>
              <span className="chip chip-bordered" style={{ height: 30, padding: "0 12px" }}>EM</span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>Elena Marsh</div>
                <div className="caption">VP of Operations, Vantage</div>
              </div>
            </div>
          </div>
          <div className={s.paneStats}>
            <div className={s.paneStat}>
              <b>341</b>
              <span>Hours saved · 30d</span>
            </div>
            <div className={s.paneStat}>
              <b>96.2%</b>
              <span>Approval rate</span>
            </div>
            <div className={s.paneStat}>
              <b>3,621</b>
              <span>Tasks automated · 30d</span>
            </div>
            <div className={s.paneStat}>
              <b>1.4s</b>
              <span>Median trigger latency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
