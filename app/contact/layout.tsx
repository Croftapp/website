import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croft — Request a Demo",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
