import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Croft — Supply Chain Intelligence',
  description:
    'Predictive intelligence for pharmaceutical supply chains',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`product-page ${inter.variable}`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
