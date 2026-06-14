import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} | BDC Sales & Software`,
    short_name: SITE.name,
    description: `${SITE.role} at ${SITE.employer}, building software tools for dealership operations.`,
    start_url: "/",
    display: "standalone",
    background_color: "#070a0f",
    theme_color: "#eb0a1e",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    categories: ["business", "portfolio"],
  };
}
