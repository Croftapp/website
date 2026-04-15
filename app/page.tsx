import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Croft — Predictive Intelligence for Supply Chain Leaders",
};

export default function HomePage() {
  return (
    <section className="hero">
      <div className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-banner-inner">
          <p className="hero-eyebrow">Clarity from above.</p>
        </div>
      </div>
      <div className="hero-white">
        <div className="hero-white-inner">
          <p className="hero-roles">Croft Polaris</p>
          <h1>
            Predictive intelligence for
            <br />
            supply chain leaders.
          </h1>
          <p className="hero-desc">
            Croft Polaris maps your pharmaceutical supply chain, detects risks in
            real time, and warns you months before disruptions hit your
            inventory.
          </p>
          <Link href="/contact" className="btn-dark">
            Request a Demo &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
