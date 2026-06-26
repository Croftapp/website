import { ReactNode } from "react";

type SectionProps = {
  heading: string;
  children: ReactNode;
};

export default function Section({ heading, children }: SectionProps) {
  return (
    <section className="prose-content">
      <h2>{heading}</h2>
      {children}
    </section>
  );
}
