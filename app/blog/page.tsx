import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croft — Blog",
  description: "Insights on pharmaceutical supply chain intelligence.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="product-page">
      <section className="about-hero">
        <div className="about-wide" style={{ textAlign: "center" as const }}>
          <h1 className="about-title">Blog</h1>
        </div>
      </section>

      <section className="about-section">
        <div className="about-wide">
          {posts.length === 0 ? (
            <p className="about-statement">Coming soon.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article
                    style={{
                      padding: 32,
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.08)",
                      borderRadius: 14,
                      transition: "border-color .3s",
                    }}
                  >
                    <time
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,.35)",
                      }}
                    >
                      {post.date}
                    </time>
                    <h2
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "var(--white)",
                        marginTop: 8,
                        marginBottom: 12,
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        fontSize: 15,
                        color: "rgba(255,255,255,.5)",
                        lineHeight: 1.7,
                      }}
                    >
                      {post.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
