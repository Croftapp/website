import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croft — Insights",
  description: "Research, analysis, and perspectives on pharmaceutical supply chain intelligence.",
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
