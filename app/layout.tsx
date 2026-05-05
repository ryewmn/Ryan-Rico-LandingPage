import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryan Rico | Automotive Operations & Software",
  description:
    "Ryan Rico builds customer follow-up systems, vehicle acquisition processes, and software tools that help dealerships turn opportunities into appointments.",
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
    title: "Ryan Rico | Automotive Operations & Software",
    description:
      "Automotive Retention Specialist building software tools for dealership operations.",
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
