"use client";

import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/tasks", label: "Task Board" },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <span className="site-footer-mark">TF</span>
          <div>
            <p>TaskFlow Workspace</p>
            <small>Plan faster, track cleaner, ship with confidence.</small>
          </div>
        </div>

        <div className="site-footer-links" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="site-footer-meta">
          <span>Project dashboard for focused teams</span>
          <small>Built for clearer workflow and better momentum.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
