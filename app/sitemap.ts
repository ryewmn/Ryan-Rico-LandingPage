import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ryanrico.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/#about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#current-work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#skills`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
