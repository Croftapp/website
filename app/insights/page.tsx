"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Insight, InsightType } from "@/lib/insights";

const typeLabels: Record<InsightType, string> = {
  article: "ARTICLE",
  report: "RESEARCH REPORT",
  whitepaper: "RESEARCH REPORT",
};

const topicOptions = [
  "All Topics",
  "Supply Chain",
  "Regulation",
  "Market Intelligence",
];

const industryOptions = [
  "All Industries",
  "Pharmaceutical",
];

const contentTypeOptions = [
  { label: "All Content", value: "all" as const },
  { label: "Articles", value: "article" as InsightType },
  { label: "Research Reports", value: "whitepaper" as InsightType },
];

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [topicFilter, setTopicFilter] = useState("All Topics");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [typeFilter, setTypeFilter] = useState<InsightType | "all">("all");
  const [sort, setSort] = useState<"latest" | "featured">("featured");

  useEffect(() => {
    fetch("/api/insights")
      .then((r) => r.json())
      .then((data) => setInsights(data));
  }, []);

  const filtered = insights
    .filter((i) => typeFilter === "all" || i.type === typeFilter)
    .filter((i) => topicFilter === "All Topics" || i.topic === topicFilter)
    .filter(
      (i) =>
        industryFilter === "All Industries" || i.industry === industryFilter
    )
    .sort((a, b) => {
      if (sort === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      return a.date > b.date ? -1 : 1;
    });

  return (
    <div className="product-page">
      <section className="insights-hero">
        <div className="insights-container">
          <h1>See the risks others miss.</h1>
          <p>
            Research, whitepapers, and analysis on pharmaceutical supply chain
            resilience — designed to help you anticipate disruptions before they
            reach your inventory.
          </p>
        </div>
      </section>

      <section className="insights-section">
        <div className="insights-container">
          <div className="insights-controls">
            <div className="insights-dropdowns">
              <div className="insights-dropdown">
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                >
                  {topicOptions.map((t) => (
                    <option key={t} value={t}>
                      + {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="insights-dropdown">
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  {industryOptions.map((i) => (
                    <option key={i} value={i}>
                      + {i}
                    </option>
                  ))}
                </select>
              </div>
              <div className="insights-dropdown">
                <select
                  value={typeFilter}
                  onChange={(e) =>
                    setTypeFilter(e.target.value as InsightType | "all")
                  }
                >
                  {contentTypeOptions.map((c) => (
                    <option key={c.value} value={c.value}>
                      + {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="insights-sort">
              <span className="insights-sort-label">Sort by</span>
              <button
                className={sort === "featured" ? "active" : ""}
                onClick={() => setSort("featured")}
              >
                Editor&apos;s picks
              </button>
              <button
                className={sort === "latest" ? "active" : ""}
                onClick={() => setSort("latest")}
              >
                Latest
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="insights-empty">Coming soon.</p>
          ) : (
            <div className="insights-grid">
              {filtered.map((insight) => (
                <Link
                  key={insight.slug}
                  href={`/insights/${insight.slug}`}
                  className="insights-card"
                >
                  {/* Default view: text + image */}
                  <div className="insights-card-front">
                    <div className="insights-card-body">
                      <span className={`insights-type-badge ${insight.type}`}>
                        {typeLabels[insight.type]}
                      </span>
                      <h2>{insight.title}</h2>
                    </div>
                    {insight.image && (
                      <div className="insights-card-image">
                        <img src={insight.image} alt={insight.title} />
                      </div>
                    )}
                  </div>
                  {/* Hover view: excerpt + expand */}
                  <div className="insights-card-back">
                    <span className={`insights-type-badge ${insight.type}`}>
                      {typeLabels[insight.type]}
                    </span>
                    <h2>{insight.title}</h2>
                    <p>{insight.excerpt}</p>
                    <span className="insights-expand">Expand &rsaquo;</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
