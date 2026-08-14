"use client";

import m from "./mock.module.css";
import { useInView, usePrefersReducedMotion } from "@/components/hooks";
import {
  IconInbox,
  IconSpark,
  IconChat,
  IconUsers,
  IconCheck,
} from "@/components/icons";

/**
 * Animated workflow visualization.
 *
 * When the canvas scrolls into view, the run plays once per loop:
 * a node activates, a small light travels the connection, the next
 * node activates — through the branch and into the final step.
 * Everything is CSS keyframes (opacity / stroke / border only),
 * gated by IntersectionObserver and prefers-reduced-motion.
 */
export default function WorkflowCanvas() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const playing = inView && !reduced;

  return (
    <div
      ref={ref}
      className={`${m.canvas} ${playing ? m.canvasPlay : ""}`}
    >
      <div className={m.canvasFlow}>
        {/* Connections live inside the node coordinate space so they
            stay pinned to the cards at any container width. */}
        <svg className={m.edge} viewBox="0 0 1000 320" preserveAspectRatio="none" aria-hidden>
          {/* base connections */}
          <g className={m.edgeBase}>
            <path d="M185,160 C220,160 240,160 272,160" vectorEffect="non-scaling-stroke" />
            <path d="M456,160 C500,160 500,74 542,74" vectorEffect="non-scaling-stroke" />
            <path d="M456,160 C500,160 500,246 542,246" vectorEffect="non-scaling-stroke" />
            <path d="M726,74 C770,74 768,160 814,160" vectorEffect="non-scaling-stroke" />
            <path d="M726,246 C770,246 768,160 814,160" vectorEffect="non-scaling-stroke" />
          </g>
          {/* traveling signals — one per connection, staggered by CSS */}
          <g className={m.edgeSignal}>
            <path pathLength={100} d="M185,160 C220,160 240,160 272,160" vectorEffect="non-scaling-stroke" className={m.sig1} />
            <path pathLength={100} d="M456,160 C500,160 500,74 542,74" vectorEffect="non-scaling-stroke" className={m.sig2} />
            <path pathLength={100} d="M456,160 C500,160 500,246 542,246" vectorEffect="non-scaling-stroke" className={m.sig2} />
            <path pathLength={100} d="M726,74 C770,74 768,160 814,160" vectorEffect="non-scaling-stroke" className={m.sig3} />
            <path pathLength={100} d="M726,246 C770,246 768,160 814,160" vectorEffect="non-scaling-stroke" className={m.sig3} />
          </g>
        </svg>

        <div className={`${m.node} ${m.n1}`}>
          <div className={m.nodeKind}><IconInbox size={11} /> Trigger</div>
          <div className={m.nodeTitle}>New ticket created</div>
          <div className={m.nodeSub}>Any channel</div>
        </div>
        <div className={m.vconn} />

        <div className={`${m.node} ${m.n2}`}>
          <div className={m.nodeKind}><IconSpark size={11} /> Classify</div>
          <div className={m.nodeTitle}>Sentiment + priority</div>
          <div className={m.nodeSub}>NOVA AI 2.0</div>
        </div>
        <div className={m.vconn} />

        <div className={`${m.node} ${m.n3}`}>
          <div className={m.nodeKind}><IconChat size={11} /> Then</div>
          <div className={m.nodeTitle}>Draft reply</div>
          <div className={m.nodeSub}>Support Agent</div>
        </div>
        <div className={m.vconn} />

        <div className={`${m.node} ${m.n4}`}>
          <div className={m.nodeKind}><IconUsers size={11} /> Else</div>
          <div className={m.nodeTitle}>Escalate to Maya</div>
          <div className={m.nodeSub}>With context + recommendation</div>
        </div>
        <div className={m.vconn} />

        <div className={`${m.node} ${m.n5}`}>
          <div className={m.nodeKind}><IconCheck size={11} /> Always</div>
          <div className={m.nodeTitle}>Log + notify</div>
          <div className={m.nodeSub}>Linear ticket · #support</div>
        </div>
      </div>
    </div>
  );
}
