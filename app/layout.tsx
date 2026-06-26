import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Croft",
  description:
    "Croft is an artificial intelligence research and product company building the world's first human model — a new category of intelligence that understands people and belongs to them.",
  metadataBase: new URL("https://croft.ai"),
  icons: { icon: "/croft-mark.png" },
  openGraph: {
    title: "Croft",
    description:
      "A new category of intelligence that understands people and belongs to them.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="measure w-full flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
