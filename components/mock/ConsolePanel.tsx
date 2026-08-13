import m from "./mock.module.css";

const lines: { time: string; tag: string; cls: string; msg: React.ReactNode }[] = [
  { time: "09:41:02.114", tag: "OK", cls: m.logTagOk, msg: <>Run <b>#4821</b> started — trigger: ticket created (#5841)</> },
  { time: "09:41:02.406", tag: "Agent", cls: m.logTagAgent, msg: <>Classified intent: <b>billing</b> · sentiment 0.32 · priority <b>high</b></> },
  { time: "09:41:03.020", tag: "Info", cls: m.logTagInfo, msg: "Loaded account context — Halcyon, Scale plan, tenure 14mo" },
  { time: "09:41:03.841", tag: "Agent", cls: m.logTagAgent, msg: "Drafted reply citing changelog 2.3.0 + refund policy §4.2" },
  { time: "09:41:04.102", tag: "Info", cls: m.logTagInfo, msg: "Confidence 0.94 ≥ threshold 0.90 — auto-act permitted" },
  { time: "09:41:04.655", tag: "OK", cls: m.logTagOk, msg: "Reply sent · CSAT tracking attached" },
  { time: "09:41:04.712", tag: "OK", cls: m.logTagOk, msg: <>Logged to Linear <b>SUP-2291</b> · posted summary to #support</> },
  { time: "09:41:04.730", tag: "OK", cls: m.logTagOk, msg: <>Completed in <b>2.6s</b> — audit event sealed</> },
];

export default function ConsolePanel() {
  return (
    <div className={m.console}>
      <div className={m.consoleHead}>
        <div className={m.lights}>
          <span />
          <span />
          <span />
        </div>
        <div className={m.consoleTitle}>Run log — Triage inbound tickets</div>
        <span
          className="chip"
          style={{
            marginLeft: "auto",
            background: "rgba(95,201,142,0.14)",
            color: "#5fc98e",
          }}
        >
          <span className="dot" style={{ background: "#5fc98e" }} />
          Live
        </span>
      </div>
      <div className={m.consoleBody}>
        {lines.map((l) => (
          <div key={l.time} className={m.logRow}>
            <span className={m.logTime}>{l.time}</span>
            <span className={`${m.logTag} ${l.cls}`}>{l.tag}</span>
            <span className={m.logMsg}>{l.msg}</span>
          </div>
        ))}
        <div className={m.logRow}>
          <span className={m.logTime}>09:41:04.731</span>
          <span className={m.logTag} />
          <span className={m.logMsg}>
            <span className={m.caret} />
          </span>
        </div>
      </div>
    </div>
  );
}
