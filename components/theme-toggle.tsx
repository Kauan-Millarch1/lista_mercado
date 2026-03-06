"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return (
      <button
        type="button"
        className="ghost-button px-3 py-1.5 text-xs uppercase tracking-wide"
        aria-hidden
      >
        Theme
      </button>
    );
  }

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const label = resolvedTheme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      className="ghost-button px-3 py-1.5 text-xs uppercase tracking-wide"
      onClick={() => setTheme(nextTheme)}
    >
      Theme: {label}
    </button>
  );
}
