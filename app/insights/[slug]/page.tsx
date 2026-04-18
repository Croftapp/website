import { getAllInsights, getInsightBySlug, getFinnishVersion } from "@/lib/insights";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LanguageToggle from "@/components/LanguageToggle";

const typeLabels = {
  article: "Article",
  report: "Research Report",
  whitepaper: "Research Report",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllInsights().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { title: "Not Found" };
  return {
    title: `${insight.title} — Croft Insights`,
    description: insight.excerpt,
  };
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

export default async function InsightPost({ params }: Props) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const fiVersion = getFinnishVersion(slug);
  const readTime = estimateReadTime(insight.content);

  return (
    <div className="product-page">
      <section className="insights-hero">
        <div className="insights-container">
          <span className={`insights-type-badge ${insight.type}`}>
            {typeLabels[insight.type]}
          </span>
          <h1>{insight.title}</h1>
          <div style={{ marginTop: 20, display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,.4)", textTransform: "uppercase" as const }}>
              {readTime}-minute read
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,.4)", textTransform: "uppercase" as const }}>
              {formatDate(insight.date)}
            </span>
          </div>
        </div>
      </section>

      <section className="insights-section">
        <div className="insights-container">
          <LanguageToggle
            enContent={insight.content}
            fiContent={fiVersion?.content}
          />
        </div>
      </section>
    </div>
  );
}
