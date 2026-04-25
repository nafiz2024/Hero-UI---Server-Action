"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
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
        <Image
          className="theme-switch-icon"
          src="/icons/sun.svg"
          alt=""
          width={16}
          height={16}
        />
        <Image
          className="theme-switch-icon"
          src="/icons/moon.svg"
          alt=""
          width={16}
          height={16}
        />
        <span className="theme-switch-thumb" />
      </span>
      <span className="theme-switch-text">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeSwitch;
