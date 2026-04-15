"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const res = await fetch("https://formspree.io/f/xpqkwvgj", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) setSubmitted(true);
  }

  return (
    <div className="product-page">
      <section className="demo-section">
        <div className="demo-layout">
          <div className="demo-info">
            <h1>See Croft Polaris in action.</h1>
            <p className="demo-desc">
              Predictive intelligence for pharmaceutical supply chains. Tell us
              about your business and we&apos;ll show you what Polaris can do.
            </p>
            <ul className="demo-points">
              <li>Map your full supply chain beyond tier 1</li>
              <li>Get early warnings before disruptions hit</li>
              <li>Benchmark against aggregated industry data</li>
              <li>Find validated alternative suppliers instantly</li>
            </ul>
          </div>
          <div className="demo-form-card">
            {submitted ? (
              <div style={{ padding: 40, textAlign: "center" }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>Thank you.</h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)" }}>We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="demo-form">
                <input type="hidden" name="_subject" value="Demo Request from Croft Website" />
                <div className="demo-row">
                  <input type="text" name="name" placeholder="Name" required />
                  <input type="text" name="company" placeholder="Company" required />
                </div>
                <input type="text" name="role" placeholder="Role" />
                <input type="email" name="email" placeholder="Work email" required />
                <input type="url" name="linkedin" placeholder="LinkedIn profile (optional)" />
                <button
                  type="submit"
                  className="btn-dark"
                  style={{
                    background: "var(--white)",
                    color: "var(--dark)",
                    width: "100%",
                    textAlign: "center",
                    marginTop: 8,
                  }}
                >
                  Request a Demo &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
