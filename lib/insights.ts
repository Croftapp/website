import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/insights");
const fiContentDir = path.join(process.cwd(), "content/insights/fi");

export type InsightType = "article" | "report" | "whitepaper";

export interface Insight {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  type: InsightType;
  topic: string;
  industry?: string;
  image?: string;
  featured?: boolean;
  lang?: string;
  content: string;
}

export function getAllInsights(): Insight[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        author: data.author ?? "Croft Team",
        type: (data.type as InsightType) ?? "article",
        topic: data.topic ?? "",
        industry: data.industry,
        image: data.image,
        featured: data.featured ?? false,
        content,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getInsightBySlug(slug: string): Insight | undefined {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    author: data.author ?? "Croft Team",
    type: (data.type as InsightType) ?? "article",
    topic: data.topic ?? "",
    industry: data.industry,
    image: data.image,
    featured: data.featured ?? false,
    lang: data.lang,
    content,
  };
}

export function getFinnishVersion(enSlug: string): Insight | undefined {
  if (!fs.existsSync(fiContentDir)) return undefined;
  const files = fs.readdirSync(fiContentDir).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(fiContentDir, file), "utf-8");
    const { data, content } = matter(raw);
    const fiSlug = file.replace(/\.mdx$/, "");
    if (data.lang === "fi") {
      return {
        slug: fiSlug,
        title: data.title ?? "",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        author: data.author ?? "Croft Team",
        type: (data.type as InsightType) ?? "article",
        topic: data.topic ?? "",
        image: data.image,
        featured: data.featured ?? false,
        lang: "fi",
        content,
      };
    }
  }
  return undefined;
}
