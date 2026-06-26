import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR — Croft",
};

export default function Gdpr() {
  return (
    <article className="prose-content legal py-16 sm:py-24">
      <h1>GDPR</h1>
      <p className="text-fg4">Last updated 22 June 2026</p>

      <p>
        Croft is built for Europe from day one, and data protection is part of
        that commitment. This page summarises how we comply with the EU General
        Data Protection Regulation (GDPR) and the rights it gives you. It
        complements our <a href="/privacy">Privacy notice</a>.
      </p>

      <h2>Data controller</h2>
      <p>
        Croft Oy is the controller of personal data processed through this
        website. You can reach our data-protection contact at{" "}
        <a href="mailto:privacy@croft.fi">privacy@croft.fi</a>.
      </p>

      <h2>Lawful basis for processing</h2>
      <p>
        We process the email address you submit to the waitlist on the basis of
        your <strong>consent</strong> (Article 6(1)(a) GDPR) and our{" "}
        <strong>legitimate interests</strong> (Article 6(1)(f) GDPR) in
        operating and securing the Services. You may withdraw consent at any
        time without affecting processing carried out beforehand.
      </p>

      <h2>Your rights</h2>
      <p>Under the GDPR, you have the right to:</p>
      <p>
        <strong>Access</strong> — obtain a copy of the personal data we hold
        about you.
        <br />
        <strong>Rectification</strong> — have inaccurate data corrected.
        <br />
        <strong>Erasure</strong> — have your data deleted (&ldquo;right to be
        forgotten&rdquo;).
        <br />
        <strong>Restriction</strong> — limit how we process your data.
        <br />
        <strong>Portability</strong> — receive your data in a portable format.
        <br />
        <strong>Objection</strong> — object to processing based on legitimate
        interests.
        <br />
        <strong>Withdraw consent</strong> — at any time, where processing is
        based on consent.
      </p>

      <h2>Exercising your rights</h2>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:privacy@croft.fi">privacy@croft.fi</a>. We will respond
        within the timeframes required by the GDPR, normally within one month.
      </p>

      <h2>International transfers</h2>
      <p>
        Where personal data is processed outside the European Economic Area, we
        rely on appropriate safeguards such as the European Commission&rsquo;s
        Standard Contractual Clauses.
      </p>

      <h2>Complaints</h2>
      <p>
        If you believe we have not handled your data properly, you have the
        right to lodge a complaint with your local supervisory authority. In
        Finland this is the Office of the Data Protection Ombudsman
        (Tietosuojavaltuutetun toimisto).
      </p>
    </article>
  );
}
