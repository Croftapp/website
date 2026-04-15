import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Croft Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Content is from local MDX files committed to the repo (trusted source).
  // For user-generated content, use a sanitiser like DOMPurify.
  return (
    <div className="product-page">
      <section className="about-hero">
        <div className="about-wide" style={{ maxWidth: 720, margin: "0 auto" }}>
          <time
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,.35)",
              display: "block",
              marginBottom: 16,
              textAlign: "center" as const,
            }}
          >
            {post.date} · {post.author}
          </time>
          <h1 className="about-title">{post.title}</h1>
        </div>
      </section>

      <section className="about-section">
        <div
          className="about-wide"
          style={{ maxWidth: 720, margin: "0 auto" }}
        >
          <div
            className="blog-content"
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "rgba(255,255,255,.6)",
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </div>
  );
}
