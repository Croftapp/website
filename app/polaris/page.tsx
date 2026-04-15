import type { Metadata } from "next";
import Link from "next/link";
import ConvergenceSVG from "@/components/ConvergenceSVG";
import ScrollNav from "@/components/ScrollNav";

export const metadata: Metadata = {
  title: "Croft Polaris — Predictive Intelligence for Pharmaceutical Supply Chains",
};

const navItems = [
  { id: "pf-visibility", label: "Visibility" },
  { id: "pf-warning", label: "Early Warning" },
  { id: "pf-benchmark", label: "Benchmarking" },
  { id: "pf-demand", label: "Demand" },
  { id: "pf-action", label: "Action" },
];

export default function PolarisPage() {
  return (
    <>
      {/* Hero */}
      <section className="p-hero p-hero-conv">
        <div className="p-container" style={{ textAlign: "center" }}>
          <span className="pill">Product</span>
          <h1>Croft Polaris</h1>
        </div>
        <div className="conv-wrap">
          <div className="conv-labels">
            <span className="conv-pill">Visibility</span>
            <span className="conv-pill">Early Warning</span>
            <span className="conv-pill">Benchmarking</span>
            <span className="conv-pill">Demand</span>
            <span className="conv-pill">Action</span>
          </div>
          <ConvergenceSVG />
          <p className="conv-tagline">
            Predictive intelligence for pharmaceutical supply chains.
          </p>
        </div>
      </section>

      {/* Features — sticky nav + scroll sections */}
      <section className="pf-section-wrap">
        <div className="pf-layout">
          <ScrollNav items={navItems} />
          <div className="pf-blocks">
            <div className="pf-block" id="pf-visibility">
              <div className="pf-text">
                <span className="p-label">Visibility</span>
                <h2>See your full supply chain</h2>
                <p>See the risks that your current tools miss.</p>
              </div>
              <div className="pf-image">
                <img src="/assets/risk.png" alt="Visibility" />
              </div>
            </div>

            <div className="pf-block" id="pf-warning">
              <div className="pf-text">
                <span className="p-label">Early Warning</span>
                <h2>Get early warnings that matter</h2>
                <p>
                  Not a news feed. Not a generic alert. Polaris tells you
                  specifically which risks affect your products, your suppliers,
                  your molecules — and how severe the impact is.
                </p>
                <p>
                  Designed to give you early warning before disruptions reach
                  your inventory.
                </p>
              </div>
              <div className="pf-image">
                <img src="/assets/Visibility.png" alt="Early Warning" />
              </div>
            </div>

            <div className="pf-block" id="pf-benchmark">
              <div className="pf-text">
                <span className="p-label">Benchmarking</span>
                <h2>Benchmark without sharing</h2>
                <p>
                  See how your supply chain compares to the market. Concentration
                  risks, pricing trends, supplier diversification — all
                  benchmarked against aggregated industry data.
                </p>
                <p>Your data stays yours. Always.</p>
              </div>
              <div className="pf-image">
                <img src="/assets/benchmark.jpg" alt="Benchmarking" />
              </div>
            </div>

            <div className="pf-block" id="pf-demand">
              <div className="pf-text">
                <span className="p-label">Demand Intelligence</span>
                <h2>Anticipate demand</h2>
                <p>
                  Understand where demand is heading — by molecule, by region, by
                  quarter. Plan capacity and procurement decisions with
                  market-level demand intelligence that no single company can
                  generate alone.
                </p>
              </div>
              <div className="pf-image">
                <img src="/assets/simulate.jpg" alt="Demand Intelligence" />
              </div>
            </div>

            <div className="pf-block" id="pf-action">
              <div className="pf-text">
                <span className="p-label">Action</span>
                <h2>Act on what you see</h2>
                <p>
                  When Polaris identifies a risk, it doesn&apos;t stop at the
                  warning. Find validated alternative suppliers. Simulate
                  scenarios. Generate compliance reports for regulators.
                </p>
                <p
                  style={{
                    color: "var(--accent)",
                    fontWeight: 500,
                    marginTop: "8px",
                  }}
                >
                  Everything you need to move from insight to action.
                </p>
              </div>
              <div className="pf-image">
                <img src="/assets/supply.png" alt="Action" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="p-section p-dark p-cta"
        style={{ paddingTop: "48px" }}
      >
        <div className="p-container">
          <h2>See your supply chain clearly.</h2>
          <p>No surprises. No blind spots.</p>
          <Link
            href="/contact"
            className="btn-dark"
            style={{ background: "var(--white)", color: "var(--dark)" }}
          >
            Request a Demo &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
