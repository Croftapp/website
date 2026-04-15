import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Croft — About",
};

export default function AboutPage() {
  return (
    <div className="product-page">
      <section className="about-hero">
        <div className="about-wide">
          <h1 className="about-title">
            Building the predictive intelligence layer for pharmaceutical supply
            chain leaders.
          </h1>
          <div className="about-banner">
            <img src="/assets/about-hero.png" alt="Croft" />
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-wide">
          <p className="about-statement">
            Supply chain disruptions should never come as a surprise. We ensure
            pharmaceutical companies stay prepared.
          </p>
          <p className="about-statement" style={{ marginTop: 16 }}>
            Based in Helsinki, Finland. That&apos;s why we exist.
          </p>
        </div>
      </section>

      <section className="about-section" id="team">
        <div className="about-wide">
          <h2 className="about-section-heading">The Team</h2>
          <div className="about-team-row">
            <div className="about-card">
              <div className="about-avatar">RF</div>
              <div className="about-card-info">
                <div className="about-name">Reza Faezi</div>
                <div className="about-role">Founder</div>
              </div>
            </div>
            <div className="about-card">
              <div className="about-avatar">AP</div>
              <div className="about-card-info">
                <div className="about-name">Aleksi Pesonen</div>
                <div className="about-role">Co-Founder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-cta">
        <div className="about-wide">
          <h2 className="about-heading">Interested in working with us?</h2>
          <p
            className="about-body"
            style={{ maxWidth: 480, margin: "0 auto 28px" }}
          >
            We&apos;re building the team.
          </p>
          <Link
            href="/careers"
            className="btn-dark"
            style={{ background: "var(--white)", color: "var(--dark)" }}
          >
            View Careers &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
