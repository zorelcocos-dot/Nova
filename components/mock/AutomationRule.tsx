import m from "./mock.module.css";
import {
  IconInbox,
  IconFilter,
  IconSpark,
  BrandSlack,
  BrandLinear,
} from "@/components/icons";

const steps = [
  {
    icon: IconInbox,
    kind: "When",
    text: "New support ticket is created",
    sub: "Email · chat · API",
    apps: [] as { name: string; icon: (p: { size?: number }) => React.ReactElement }[],
  },
  {
    icon: IconFilter,
    kind: "If",
    text: "Priority is High or sentiment below 0.4",
    sub: "Otherwise, continue to the standard queue",
    apps: [] as { name: string; icon: (p: { size?: number }) => React.ReactElement }[],
  },
  {
    icon: IconSpark,
    kind: "Then",
    text: "Draft a reply with the Support Agent",
    sub: "Assign to Maya after approval · post the summary to #support",
    apps: [
      { name: "Slack", icon: BrandSlack },
      { name: "Linear", icon: BrandLinear },
    ],
  },
];

export default function AutomationRule() {
  return (
    <div className={m.rule}>
      <div className={m.ruleHead}>
        <div className={m.ruleName}>Triage inbound tickets</div>
        <span className="chip">
          <span className="dot dot-ok" /> Active
        </span>
      </div>

      <div className={m.ruleSteps}>
        {steps.map((s, i) => (
          <div key={s.kind} className={m.step}>
            <div className={m.stepRail}>
              <div className={m.stepDot}>
                <s.icon size={11} />
              </div>
              {i < steps.length - 1 && <div className={m.stepLine} />}
            </div>
            <div className={m.stepBody}>
              <div className={m.stepKind}>{s.kind}</div>
              <div className={m.stepText}>{s.text}</div>
              <div className={m.stepSub}>{s.sub}</div>
              {s.apps.length > 0 && (
                <div className={m.stepApps}>
                  {s.apps.map((a) => (
                    <span key={a.name} className={m.appBadge}>
                      <a.icon size={12} />
                      {a.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={m.ruleFoot}>
        <div className={m.ruleStat}>
          <b>1,284</b>
          <span>Runs · 7 days</span>
        </div>
        <div className={m.ruleStat}>
          <b>99.1%</b>
          <span>Success</span>
        </div>
        <div className={m.ruleStat}>
          <b>44s</b>
          <span>Avg. duration</span>
        </div>
      </div>
    </div>
  );
}
