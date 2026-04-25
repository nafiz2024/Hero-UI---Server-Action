"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tasks", label: "Tasks" },
];

const Navbar = () => {
  const pathname = usePathname() || "/";

  return (
    <nav className="site-navbar" aria-label="Main navigation">
      <header className="site-nav-inner">
        <Link className="site-brand" href="/">
          <span className="site-brand-mark">TF</span>
          <span className="site-brand-copy">
            <span className="site-brand-name">TaskFlow</span>
            <span className="site-brand-subtitle">Workspace</span>
          </span>
        </Link>

        <div className="site-nav-actions">
          <ul className="site-nav-links">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    className={isActive ? "site-nav-link-active" : undefined}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link className="site-nav-cta" href="/tasks">
            Open Board
          </Link>
          <ThemeSwitch />
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
