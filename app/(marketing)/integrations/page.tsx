import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import IntegrationsClient from "./IntegrationsClient";
import s from "../sub.module.css";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "NOVA connects with Slack, Notion, Google Drive, GitHub, Linear, HubSpot, Discord, Jira, and 70+ more — with scoped, revocable permissions.",
};

export default function IntegrationsPage() {
  return (
    <>
      <section className={`${s.pageHero} ${s.pageHeroCenter}`}>
        <div className="container">
          <div className={s.pageHeroInner}>
                        <p className="eyebrow">Integrations</p>
            <h1 className="h-1">Connected where work happens.</h1>
            <p className="lead">
              NOVA reads from and writes to the tools your team already
              trusts — with permissions inherited from the source and
              revocable at any moment.
            </p>
          
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 88 }}>
        <IntegrationsClient />
      </section>

      {/* API */}
      <section style={{ paddingBottom: 96 }}>
        <div className="container">
          <Reveal>
            <div className={s.apiPanel}>
              <div>
                <p className="eyebrow" style={{ color: "var(--inv-ink-2)" }}>For builders</p>
                <h2 className="h-2" style={{ marginTop: 14 }}>
                  One API for the work itself.
                </h2>
                <p style={{ color: "var(--inv-ink-2)", fontSize: 15, lineHeight: 1.65, marginTop: 14 }}>
                  Create tasks, trigger workflows, and pull analytics from a
                  single, boringly-consistent REST API. Every event your
                  agents see is available to you — same envelopes, same
                  guarantees.
                </p>
                <div style={{ marginTop: 26, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link href="/docs#api" className="btn btn-primary">Read the API reference</Link>
                  <Link href="/docs#quickstart" className="btn btn-secondary">Quickstart</Link>
                </div>
              </div>
              <div className={s.apiCode}>
                <span className="cm"># Create a task for the Research Agent</span>{"\n"}
                <b>curl</b> -X POST https://api.nova.build/v1/tasks \{"\n"}
                {"  "}-H <b>&quot;Authorization: Bearer $NOVA_KEY&quot;</b> \{"\n"}
                {"  "}-H &quot;Content-Type: application/json&quot; \{"\n"}
                {"  "}-d <b>&apos;{"{"}</b>{"\n"}
                {"    "}&quot;agent&quot;: &quot;research&quot;,{"\n"}
                {"    "}&quot;input&quot;: &quot;Brief me on Castello&rsquo;s pricing change&quot;,{"\n"}
                {"    "}&quot;deliver_to&quot;: &quot;#growth&quot;{"\n"}
                {"  "}<b>{"}"}&apos;</b>{"\n"}
                {"\n"}
                <span className="cm">{"# → 201 Created · task finishes in ~4 minutes"}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
