"use client";

import { useTheme, type Theme } from "@/components/ThemeProvider";
import { IconSun, IconMoon, IconDisplay } from "@/components/icons";
import s from "./theme-toggle.module.css";

const options: { value: Theme; label: string; Icon: (p: { size?: number }) => React.ReactElement }[] = [
  { value: "light", label: "Light", Icon: IconSun },
  { value: "dark", label: "Dark", Icon: IconMoon },
  { value: "system", label: "System", Icon: IconDisplay },
];

/**
 * Segmented theme control. `compact` renders a single icon button that
 * cycles light → dark → system (used in the navbar, where space is tight).
 */
export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, resolved, setTheme, cycleTheme } = useTheme();

  if (compact) {
    const label =
      theme === "system"
        ? `Theme: system (${resolved})`
        : `Theme: ${theme}`;
    const Icon =
      theme === "light" ? IconSun : theme === "dark" ? IconMoon : IconDisplay;
    return (
      <button
        className={s.iconBtn}
        onClick={cycleTheme}
        aria-label={`${label}. Change theme`}
        title={label}
      >
        <Icon size={16} />
      </button>
    );
  }

  return (
    <div className={s.group} role="radiogroup" aria-label="Color theme">
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          role="radio"
          aria-checked={theme === value}
          className={`${s.seg} ${theme === value ? s.segOn : ""}`}
          onClick={() => setTheme(value)}
          title={label}
        >
          <Icon size={14} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
