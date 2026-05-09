import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ryanrico.com"),
  title: "Ryan Rico | BDC Sales & Software",
  description:
    "Ryan Rico — BDC Sales at Round Rock Toyota. Working internet leads by day and building dealership software (and Gundams) by night.",
  keywords: [
    "Ryan Rico",
    "Round Rock Toyota",
    "BDC Sales",
    "Internet Sales",
    "Automotive Software",
    "Dealership AI",
    "Gunpla",
  ],
  authors: [{ name: "Ryan Rico" }],
  openGraph: {
    title: "Ryan Rico | BDC Sales & Software",
    description:
      "BDC Sales at Round Rock Toyota, building software tools for dealership operations.",
    type: "website",
    locale: "en_US",
    siteName: "Ryan Rico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Rico | BDC Sales & Software",
    description:
      "BDC Sales at Round Rock Toyota, building software tools for dealership operations.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans bg-white text-neutral-900">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-toyota-red focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
