"use client";

import { useState } from "react";
import { IconPlus } from "@/components/icons";
import styles from "./accordion.module.css";

export default function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={item.q} className={`${styles.item} ${open ? styles.open : ""}`}>
            <h3 className={styles.heading}>
              <button
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenIdx(open ? null : i)}
              >
                <span>{item.q}</span>
                <span className={styles.iconWrap} aria-hidden>
                  <IconPlus size={15} />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              className={styles.panel}
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
