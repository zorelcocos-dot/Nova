"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  IconBell,
  IconCheck,
  IconAlert,
  IconUsers,
  IconSpark,
  IconX,
} from "@/components/icons";
import { notifications as seed, type NotificationKind } from "@/lib/data";
import d from "@/app/dashboard/dash.module.css";

const kindIcon: Record<NotificationKind, (p: { size?: number }) => React.ReactElement> = {
  approval: IconUsers,
  success: IconCheck,
  alert: IconAlert,
  info: IconSpark,
};

/**
 * The bell in the dashboard topbar. Opens a popover with recent
 * notifications; "Mark all read" clears the unread dot. Closes on
 * outside click, Escape, or route change.
 */
export default function Notifications() {
  const [items, setItems] = useState(seed);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const unread = items.filter((n) => n.unread).length;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function markAllRead() {
    setItems((list) => list.map((n) => ({ ...n, unread: false })));
  }

  function dismiss(id: string) {
    setItems((list) => list.filter((n) => n.id !== id));
  }

  return (
    <div className={d.notifWrap} ref={wrapRef}>
      <button
        className={d.topIconBtn}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <IconBell size={17} />
        {unread > 0 && <span className={d.dotp} />}
      </button>

      {open && (
        <div className={d.notifPop} role="dialog" aria-label="Notifications">
          <div className={d.notifHead}>
            <span className={d.notifHeadTitle}>
              Notifications
              {unread > 0 && <span className={d.notifCount}>{unread}</span>}
            </span>
            {unread > 0 && (
              <button className={d.notifMark} onClick={markAllRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className={d.notifList}>
            {items.length === 0 && (
              <div className={d.notifEmpty}>
                <IconCheck size={16} />
                You&rsquo;re all caught up.
              </div>
            )}
            {items.map((n) => {
              const KindIcon = kindIcon[n.kind];
              return (
                <div
                  key={n.id}
                  className={`${d.notifItem} ${n.unread ? d.notifItemUnread : ""}`}
                >
                  <span className={`${d.notifIcon} ${d[`notif_${n.kind}`] ?? ""}`}>
                    <KindIcon size={14} />
                  </span>
                  <div className={d.notifBody}>
                    <div className={d.notifTitle}>
                      {n.unread && <span className={d.notifDot} aria-hidden />}
                      {n.title}
                    </div>
                    <p className={d.notifText}>{n.body}</p>
                    <span className={d.notifTime}>{n.time}</span>
                  </div>
                  <button
                    className={d.notifDismiss}
                    aria-label={`Dismiss: ${n.title}`}
                    onClick={() => dismiss(n.id)}
                  >
                    <IconX size={13} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className={d.notifFoot}>
            <Link href="/dashboard" className={d.notifFootLink}>
              Full activity lives in Overview
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
