"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const isDark = mounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-switch"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={isDark}
      onClick={() => setTheme(nextTheme)}
    >
      <span className="theme-switch-track" aria-hidden="true">
        <span className="theme-switch-icon theme-switch-sun" />
        <span className="theme-switch-icon theme-switch-moon" />
        <span className="theme-switch-thumb" />
      </span>
      <span className="theme-switch-text">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeSwitch;
