import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/posts";
import s from "../sub.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on AI agents, workflow automation, and the craft of calm software — from the team building NOVA.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className={`${s.pageHero} ${s.pageHeroCenter}`}>
        <div className="container">
          <div className={s.pageHeroInner}>
                        <p className="eyebrow">The NOVA Journal</p>
            <h1 className="h-1">Notes from the workbench.</h1>
            <p className="lead">
              On agents, automation, and building software that lowers the
              room&rsquo;s blood pressure.
            </p>
          
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 96 }}>
        <Reveal>
          <Link href={`/blog/${featured.slug}`} className={s.featuredPost}>
            <div className={s.featuredCopy}>
              <div className={s.postMetaRow}>
                <span className="chip">{featured.category}</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readingTime}</span>
              </div>
              <h2 className="h-2">{featured.title}</h2>
              <p className="lead" style={{ fontSize: "1.05rem" }}>{featured.excerpt}</p>
              <div className={s.postMetaRow} style={{ marginTop: "auto" }}>
                <span className="chip chip-bordered">{featured.author.name}</span>
                <span>{featured.author.role}</span>
              </div>
            </div>
            <div className={s.featuredCover} aria-hidden>
              <span className="chip coverTag" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
                NOVA AI 2.0
              </span>
              <span className={s.coverMark}>2.0</span>
            </div>
          </Link>
        </Reveal>

        <div className={s.grid3} style={{ marginTop: 14 }}>
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 70}>
              <Link href={`/blog/${post.slug}`} className={s.postCard}>
                <div className={s.postMetaRow}>
                  <span className="chip">{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>
                <div className={s.postTitle}>{post.title}</div>
                <p className={s.postExcerpt}>{post.excerpt}</p>
                <div className={s.postFoot}>
                  <span className="caption">{post.date} · {post.author.name}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
