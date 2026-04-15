"use client";

import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

export default function CareersPage() {
  const [fileName, setFileName] = useState("No file chosen");
  const [submitted, setSubmitted] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const name =
      e.target.files && e.target.files[0]
        ? e.target.files[0].name
        : "No file chosen";
    setFileName(name);
  }

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
      <section className="about-hero">
        <div className="about-container about-narrow">
          <h1>Join us at the start.</h1>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container about-narrow">
          <p className="about-statement">
            We&apos;re a pre-seed team in Helsinki building predictive
            intelligence for pharmaceutical supply chains. Early team, big
            problem, real customers.
          </p>
          <div className="careers-values">
            <div className="careers-value">
              <h3>Ship early</h3>
              <p>
                We put things in front of our customers fast. Iterate from real
                feedback, not assumptions.
              </p>
            </div>
            <div className="careers-value">
              <h3>Own the problem</h3>
              <p>
                Small team means everyone shapes the product. You won&apos;t be
                implementing someone else&apos;s spec.
              </p>
            </div>
            <div className="careers-value">
              <h3>Build what matters</h3>
              <p>
                Pharmaceutical supply chains affect millions of people. The work
                here has real impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container about-narrow">
          <h2
            className="about-heading"
            style={{ textAlign: "left", marginBottom: 16 }}
          >
            Get in touch
          </h2>
          <p className="about-body" style={{ marginBottom: 36 }}>
            We don&apos;t have open roles listed yet. If you&apos;re interested
            in what we&apos;re building, send us a message and your CV.
            We&apos;ll be in touch.
          </p>

          {submitted ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>Thank you.</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)" }}>We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="careers-form">
            <input type="hidden" name="_subject" value="Careers Enquiry from Croft Website" />
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="url" name="linkedin" placeholder="LinkedIn profile (optional)" />
            <textarea
              name="message"
              placeholder="Tell us about yourself and what interests you about Croft"
              rows={5}
            ></textarea>
            <label className="careers-file-label">
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <span className="careers-file-btn">Attach CV</span>
              <span className="careers-file-name">{fileName}</span>
            </label>
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
              Send &rarr;
            </button>
          </form>
          )}
        </div>
      </section>
    </div>
  );
}
