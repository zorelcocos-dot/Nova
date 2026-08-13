import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { changelog } from "@/lib/data";
import { IconArrowRight } from "@/components/icons";
import s from "../sub.module.css";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every improvement to NOVA, documented. New features, refinements, and fixes — shipped with notes you can actually read.",
};

const kindClass: Record<string, string> = {
  New: s.kindNew,
  Improved: s.kindImproved,
  Fixed: s.kindFixed,
};

export default function ChangelogPage() {
  return (
    <>
      <section className={s.pageHero}>
        <div className="container" style={{ maxWidth: 1024 }}>
          <Reveal>
            <p className="eyebrow">Changelog</p>
            <h1 className="h-1">What&rsquo;s new in NOVA.</h1>
            <p className="lead">
              We ship weekly and write about it in plain language. Subscribe
              in your dashboard or follow along here.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 1024, paddingBottom: 96 }}>
        {changelog.map((entry) => (
          <Reveal key={entry.version}>
            <div className={s.clEntry}>
              <div className={s.clMeta}>
                <div className={s.clVersion}>v{entry.version}</div>
                <div className={s.clDate}>{entry.date}</div>
              </div>
              <div>
                <h2 className={s.clTitle}>{entry.title}</h2>
                <div className={s.clList}>
                  {entry.items.map((item) => (
                    <div key={item.text} className={s.clItem}>
                      <span className={`${s.clKind} ${kindClass[item.kind]}`}>
                        {item.kind}
                      </span>
                      <p className={s.clText}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div
            style={{
              borderTop: "1px solid var(--line)",
              paddingTop: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <p className="body-s" style={{ maxWidth: 460 }}>
              Reading from a screenreader or RSS reader? Every entry is also
              published as plain text with full URLs, and older releases live
              in the archive.
            </p>
            <Link href="/blog" className="link-arrow">
              Longer stories on the journal <IconArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
