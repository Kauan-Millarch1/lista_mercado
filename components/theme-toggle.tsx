"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return (
      <button
        type="button"
        className="rounded-md border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        aria-hidden
      >
        Theme
      </button>
    );
  }

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const label = resolvedTheme === "dark" ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      className="rounded-md border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
      onClick={() => setTheme(nextTheme)}
    >
      {label}
    </button>
  );
}
