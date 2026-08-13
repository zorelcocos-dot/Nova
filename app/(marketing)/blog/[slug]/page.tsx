import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getPost, posts, type PostBlock } from "@/lib/posts";
import { IconArrowRight } from "@/components/icons";
import s from "../../sub.module.css";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "quote":
      return (
        <blockquote>
          {block.text}
          {block.cite && <footer>{block.cite}</footer>}
        </blockquote>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return <pre className={s.codeBlock}>{block.code}</pre>;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <article
        style={{
          paddingTop: "calc(var(--nav-h) + clamp(56px, 8vw, 96px))",
          paddingBottom: 80,
        }}
      >
        <div className="container">
          <Reveal>
            <header className={s.articleHead}>
              <div className={s.postMetaRow} style={{ justifyContent: "center" }}>
                <span className="chip">{post.category}</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h1 className="h-1" style={{ marginTop: 24 }}>
                {post.title}
              </h1>
              <p className="lead" style={{ marginTop: 20 }}>
                {post.excerpt}
              </p>
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  fontSize: 13.5,
                }}
              >
                <span
                  className="chip chip-bordered"
                  style={{ height: 28, fontSize: 12 }}
                >
                  {post.author.name}
                </span>
                <span className="caption">{post.author.role}</span>
              </div>
            </header>
          </Reveal>

          <div className={s.articleBody} style={{ marginTop: 56 }}>
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            <div className={s.authorCard} style={{ marginTop: 56 }}>
              <span className="chip" style={{ height: 44, width: 44, justifyContent: "center", borderRadius: "50%", fontSize: 13 }}>
                {post.author.initials}
              </span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.014em" }}>
                  {post.author.name}
                </div>
                <div className="caption">
                  {post.author.role} at NOVA — writing from the workbench.
                </div>
              </div>
              <Link href="/signup" className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }}>
                Try NOVA free
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className={`section-s ${s.band}`}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 28,
            }}
          >
            <h2 className="h-3" style={{ fontSize: 19 }}>Keep reading</h2>
            <Link href="/blog" className="link-arrow" style={{ fontSize: 14 }}>
              All articles <IconArrowRight size={14} />
            </Link>
          </div>
          <div className={s.grid2}>
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className={s.postCard}>
                <div className={s.postMetaRow}>
                  <span className="chip">{p.category}</span>
                  <span>{p.readingTime}</span>
                </div>
                <div className={s.postTitle}>{p.title}</div>
                <p className={s.postExcerpt}>{p.excerpt}</p>
                <div className={s.postFoot}>
                  <span className="caption">{p.date} · {p.author.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
