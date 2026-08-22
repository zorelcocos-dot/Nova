"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "nova-theme";
const PREFS_KEY = "nova-prefs";

/** Display preferences that are independent of the color theme. */
export type Prefs = {
  /** Force still interfaces regardless of the OS setting. */
  reduceMotion: boolean;
  /** Tighten row height in tables and lists. */
  compactDensity: boolean;
};

const DEFAULT_PREFS: Prefs = { reduceMotion: false, compactDensity: false };

/**
 * Inlined in <head> before paint so the page never flashes the wrong theme
 * or the wrong density.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.dataset.theme=d?"dark":"light";r.style.colorScheme=d?"dark":"light";var p=JSON.parse(localStorage.getItem("${PREFS_KEY}")||"{}");if(p.reduceMotion)r.dataset.motion="reduce";if(p.compactDensity)r.dataset.density="compact";}catch(e){}})();`;

type ThemeContextValue = {
  /** What the user chose: light, dark, or follow the OS. */
  theme: Theme;
  /** What is actually painted right now. */
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
  /** Cycles light → dark → system. */
  cycleTheme: () => void;
  prefs: Prefs;
  setPref: <K extends keyof Prefs>(key: K, value: Prefs[K]) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemPrefersDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function apply(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && systemPrefersDark());
  const root = document.documentElement;
  const changing = root.dataset.theme !== undefined && root.dataset.theme !== (dark ? "dark" : "light");
  root.dataset.theme = dark ? "dark" : "light";
  root.style.colorScheme = dark ? "dark" : "light";
  if (changing) crossfade();
  return dark ? ("dark" as const) : ("light" as const);
}

/* Stamp .theme-switching on <html> for ~420ms so the palette flip
   cross-fades (see globals.css). Skipped for reduced-motion users. */
let fadeTimer: ReturnType<typeof setTimeout> | undefined;
function crossfade() {
  if (
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.dataset.motion === "reduce"
  )
    return;
  const root = document.documentElement;
  root.classList.add("theme-switching");
  if (fadeTimer) clearTimeout(fadeTimer);
  fadeTimer = setTimeout(() => root.classList.remove("theme-switching"), 420);
}

function applyPrefs(p: Prefs) {
  const root = document.documentElement;
  if (p.reduceMotion) root.dataset.motion = "reduce";
  else delete root.dataset.motion;
  if (p.compactDensity) root.dataset.density = "compact";
  else delete root.dataset.density;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Start at "system" on both server and client so hydration matches; the
  // inline script has already painted the right colors by this point.
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  // Adopt the stored preference after mount.
  useEffect(() => {
    let stored: Theme = "system";
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "light" || raw === "dark" || raw === "system") stored = raw;
    } catch {
      /* storage unavailable — stay on system */
    }
    setThemeState(stored);
    setResolved(apply(stored));

    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Prefs>;
        const next: Prefs = {
          reduceMotion: parsed.reduceMotion === true,
          compactDensity: parsed.compactDensity === true,
        };
        setPrefs(next);
        applyPrefs(next);
      }
    } catch {
      /* corrupt or unavailable — keep defaults */
    }
  }, []);

  // Follow the OS while the preference is "system".
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setResolved(apply("system"));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    setResolved(apply(next));
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* non-fatal */
    }
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const next: Theme =
        current === "light" ? "dark" : current === "dark" ? "system" : "light";
      setResolved(apply(next));
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* non-fatal */
      }
      return next;
    });
  }, []);

  const setPref = useCallback(
    <K extends keyof Prefs>(key: K, value: Prefs[K]) => {
      setPrefs((current) => {
        const next = { ...current, [key]: value };
        applyPrefs(next);
        try {
          localStorage.setItem(PREFS_KEY, JSON.stringify(next));
        } catch {
          /* non-fatal */
        }
        return next;
      });
    },
    []
  );

  return (
    <ThemeContext.Provider
      value={{ theme, resolved, setTheme, cycleTheme, prefs, setPref }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
