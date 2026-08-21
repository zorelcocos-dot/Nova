import Link from "next/link";
import { LogoMark } from "@/components/icons";
import styles from "./footer.module.css";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "API reference", href: "/docs#api" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Security", href: "/features#security" },
      { label: "Log in", href: "/login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand} aria-label="NOVA home">
            <LogoMark size={20} />
            <span className={styles.wordmark}>NOVA</span>
          </Link>
          <p className={styles.tagline}>
            The AI productivity platform for teams that would rather build the
            future than manage their inbox.
          </p>
          <div className={styles.status}>
            <span className="dot dot-pulse" />
            All systems operational
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className={styles.col}>
            <h2 className={styles.colTitle}>{col.title}</h2>
            <ul className={styles.colLinks}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.colLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© 2026 NOVA Labs, Inc. All rights reserved.</span>
        <div className={styles.bottomLinks}>
          <Link href="/privacy" className={styles.bottomLink}>
            Privacy
          </Link>
          <Link href="/terms" className={styles.bottomLink}>
            Terms
          </Link>
          <span className={styles.craft}>Designed in California</span>
        </div>
      </div>
    </footer>
  );
}
