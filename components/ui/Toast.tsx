"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconCheck, IconAlert } from "@/components/icons";
import s from "./toast.module.css";

export type ToastTone = "success" | "info" | "danger";

type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
};

type ToastContextValue = {
  /** Show a transient message. Returns the toast id. */
  toast: (message: string, tone?: ToastTone) => number;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DURATION = 3200;
const MAX_VISIBLE = 3;

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (message: string, tone: ToastTone = "success") => {
      const id = nextId.current++;
      setToasts((list) => [...list, { id, message, tone }].slice(-MAX_VISIBLE));
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), DURATION)
      );
      return id;
    },
    [dismiss]
  );

  // Clear every pending timer if the provider goes away mid-flight.
  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Polite live region: announced without interrupting the user. */}
      <div className={s.viewport} role="status" aria-live="polite">
        {toasts.map((t) => {
          const Icon = t.tone === "danger" ? IconAlert : IconCheck;
          return (
            <button
              key={t.id}
              className={`${s.toast} ${t.tone === "danger" ? s.danger : ""}`}
              onClick={() => dismiss(t.id)}
              aria-label={`Dismiss: ${t.message}`}
            >
              <Icon size={14} />
              <span>{t.message}</span>
            </button>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

/** Access the toast queue. Safe no-op outside a provider. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return { toast: () => 0, dismiss: () => {} };
  }
  return ctx;
}
