import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join us — Croft",
  description:
    "We're building AI that pushes technical boundaries while remaining unambiguously on the side of the person using it. We're looking for collaborators to help shape this vision.",
};

export default function JoinUs() {
  return (
    <article className="prose-content py-16 sm:py-24">
      <h1>Join us</h1>

      <p>
        We&rsquo;re building AI that pushes technical boundaries while remaining
        unambiguously on the side of the person using it. Our team combines
        rigorous engineering with creative exploration, and we&rsquo;re looking
        for collaborators to help shape this vision.
      </p>
      <p>
        Our work spans AI systems, automation and robotics, and security,
        architecture, and governance — the disciplines required to build an
        intelligence people can trust. If that&rsquo;s the kind of problem you
        want to spend your time on, we&rsquo;d like to hear from you.
      </p>
    </article>
  );
}
