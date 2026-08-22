import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const base = "https://nova.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/features",
    "/integrations",
    "/pricing",
    "/about",
    "/blog",
    "/changelog",
    "/docs",
    "/contact",
    "/login",
    "/signup",
    "/terms",
    "/privacy",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date("2026-08-22"),
  }));

  const postPages = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date("2026-08-11"),
  }));

  return [...staticPages, ...postPages];
}
