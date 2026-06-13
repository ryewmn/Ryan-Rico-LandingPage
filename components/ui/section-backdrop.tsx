import Image from "next/image";
import { cn } from "@/lib/utils";

type Align = "left" | "right" | "center";

/**
 * Cinematic background image with the dark overlays the hero uses.
 * Drop it as the first child of a `relative` section so the content
 * layers on top:
 *
 *   <section className="relative ...">
 *     <SectionBackdrop src="/hero/landcruiser.jpg" focus="right" />
 *     <div className="relative">...</div>
 *   </section>
 *
 * `focus` shifts the photo focal point so the opposite side stays
 * mostly black (where the text lives).
 */
export function SectionBackdrop({
  src,
  alt,
  focus = "right",
  intensity = "default",
  className,
}: {
  src: string;
  alt?: string;
  focus?: Align;
  intensity?: "default" | "deep";
  className?: string;
}) {
  const object =
    focus === "left"
      ? "object-[28%_center]"
      : focus === "right"
      ? "object-[72%_center]"
      : "object-center";

  // Where to bias the dark overlay (away from the photo focal point)
  const darkSide =
    focus === "left"
      ? "bg-gradient-to-l from-neutral-950 via-neutral-950/85 to-neutral-950/30"
      : focus === "right"
      ? "bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/30"
      : "bg-gradient-to-b from-neutral-950 via-neutral-950/70 to-neutral-950/85";

  return (
    <div
      aria-hidden={alt ? undefined : "true"}
      className={cn("absolute inset-0 -z-10 overflow-hidden grain", className)}
    >
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="100vw"
        className={cn("object-cover", object, "opacity-60")}
      />
      <div className={cn("absolute inset-0", darkSide)} />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t",
          intensity === "deep"
            ? "from-neutral-950 via-neutral-950/40 to-neutral-950/70"
            : "from-neutral-950 via-neutral-950/30 to-neutral-950/60"
        )}
      />
      {/* Edge vignette to seam into the next section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_50%,transparent_25%,rgba(7,10,15,0.55)_100%)]" />
    </div>
  );
}
