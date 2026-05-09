import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { ScrollProgress } from "@/components/scroll-progress";
import { SITE } from "@/lib/site-config";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | BDC Sales & Software`,
  description: `${SITE.name} — ${SITE.role} at ${SITE.employer}. Working internet leads by day and building dealership software (and Gundams) by night.`,
  keywords: [
    SITE.name,
    SITE.employer,
    "BDC Sales",
    "Internet Sales",
    "Automotive Software",
    "Dealership AI",
    "Gunpla",
  ],
  authors: [{ name: SITE.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} | BDC Sales & Software`,
    description: `${SITE.role} at ${SITE.employer}, building software tools for dealership operations.`,
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | BDC Sales & Software`,
    description: `${SITE.role} at ${SITE.employer}, building software tools for dealership operations.`,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  telephone: SITE.phoneTel,
  jobTitle: SITE.role,
  worksFor: { "@type": "Organization", name: SITE.employer },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: "US",
  },
  sameAs: [SITE.linkedin, SITE.github, SITE.instagram],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
