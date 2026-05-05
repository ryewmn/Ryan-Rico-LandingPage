import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryan Rico | BDC Sales & Software",
  description:
    "Ryan Rico — BDC Sales at Round Rock Toyota. Working internet leads by day and building dealership software by night.",
  keywords: [
    "Ryan Rico",
    "Round Rock Toyota",
    "Vehicle Acquisition",
    "Retail Retention",
    "Lease Retention",
    "BDC Sales",
    "Automotive Software",
    "Dealership AI",
  ],
  authors: [{ name: "Ryan Rico" }],
  openGraph: {
    title: "Ryan Rico | BDC Sales & Software",
    description:
      "BDC Sales at Round Rock Toyota, building software tools for dealership operations.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
