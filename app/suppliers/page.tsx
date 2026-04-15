import type { Metadata } from "next";
import Link from "next/link";
import ScrollNav from "@/components/ScrollNav";

export const metadata: Metadata = {
  title: "Croft — For Suppliers",
};

const navItems = [
  { id: "sf-validation", label: "Validation" },
  { id: "sf-visibility", label: "Visibility" },
  { id: "sf-market", label: "Market Access" },
  { id: "sf-early", label: "Early Access" },
];

export default function SuppliersPage() {
  return (
    <>
      {/* Hero */}
      <section className="p-hero">
        <div className="p-container">
          <span className="pill">For Suppliers</span>
          <h1>Reach EU pharmaceutical buyers.</h1>
          <p>
            Get your capabilities validated and visible to companies actively
            looking for reliable suppliers.
          </p>
        </div>
      </section>

      {/* Features — sticky nav + scroll sections */}
      <section className="pf-section-wrap">
        <div className="pf-layout">
          <ScrollNav items={navItems} />
          <div className="pf-blocks">
            <div className="pf-block" id="sf-validation">
              <div className="pf-text">
                <span className="p-label">Validation</span>
                <h2>Get independently validated</h2>
                <p>
                  We assess your compliance, capacity, and capabilities against
                  EU standards. You get a profile that buyers trust — without the
                  cost and complexity of doing it alone.
                </p>
              </div>
              <div className="pf-image">
                <img src="/assets/building.jpg" alt="Validation" />
              </div>
            </div>

            <div className="pf-block" id="sf-visibility">
              <div className="pf-text">
                <span className="p-label">Visibility</span>
                <h2>Become visible to the right buyers</h2>
                <p>
                  When pharmaceutical companies look for alternative suppliers
                  through Polaris, validated suppliers appear first. No cold
                  outreach needed — buyers come to you.
                </p>
              </div>
              <div className="pf-image">
                <img src="/assets/supplier.jpg" alt="Visibility" />
              </div>
            </div>

            <div className="pf-block" id="sf-market">
              <div className="pf-text">
                <span className="p-label">Market Access</span>
                <h2>Accelerate EU market access</h2>
                <p>
                  For manufacturers outside the EU: entering the European market
                  typically takes years and costs hundreds of thousands. We help
                  you get there faster and at a fraction of the cost.
                </p>
              </div>
              <div className="pf-image">
                <img src="/assets/europe.jpg" alt="Market Access" />
              </div>
            </div>

            <div className="pf-block" id="sf-early">
              <div className="pf-text">
                <span className="p-label">Why Join</span>
                <h2>Early participants get priority</h2>
                <p>
                  We&apos;re building the network now. Suppliers who join early
                  get priority visibility, direct input into the validation
                  framework, and first access to buyer demand signals.
                </p>
                <p>
                  The network grows more valuable with every participant — and
                  early movers benefit most.
                </p>
              </div>
              <div className="pf-image">
                <img src="/assets/network.jpg" alt="Early Access" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-section p-dark p-cta">
        <div className="p-container">
          <h2>Interested in joining?</h2>
          <p>We&apos;re building the network. Get in touch.</p>
          <Link
            href="/contact"
            className="btn-dark"
            style={{ background: "var(--white)", color: "var(--dark)" }}
          >
            Get in Touch &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
