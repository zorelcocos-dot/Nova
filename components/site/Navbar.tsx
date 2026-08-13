"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark, IconMenu, IconX } from "@/components/icons";
import styles from "./navbar.module.css";

const links = [
  { label: "Product", href: "/features" },
  { label: "Solutions", href: "/features#solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/docs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on route change + lock body scroll while open */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`${styles.nav} glass ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label="NOVA home">
            <LogoMark size={21} />
            <span className={styles.wordmark}>NOVA</span>
          </Link>

          <nav className={styles.links} aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`${styles.link} ${
                  pathname === l.href ? styles.active : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link href="/login" className={styles.login}>
              Log in
            </Link>
            <Link href="/signup" className={`btn btn-sm btn-primary ${styles.cta}`}>
              Get started
            </Link>
          </div>

          <button
            className={styles.menuBtn}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <IconX size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}
        aria-hidden={!open}
      >
        <nav className={styles.mobileLinks} aria-label="Mobile">
          {links.map((l, i) => (
            <Link
              key={l.label}
              href={l.href}
              className={styles.mobileLink}
              style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileActions}>
          <Link href="/login" className="btn btn-secondary btn-block">
            Log in
          </Link>
          <Link href="/signup" className="btn btn-primary btn-block">
            Get started
          </Link>
        </div>
      </div>
    </>
  );
}
