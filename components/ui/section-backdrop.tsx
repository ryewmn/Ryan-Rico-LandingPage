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

  // Hard side gradient — solid black on the text side, fully transparent
  // on the photo side, so the vehicle is clearly visible at the focus.
  const sideGradient =
    focus === "left"
      ? "bg-[linear-gradient(to_right,rgba(7,10,15,1)_0%,rgba(7,10,15,0.95)_30%,rgba(7,10,15,0.35)_65%,rgba(7,10,15,0)_100%)]"
      : focus === "right"
      ? "bg-[linear-gradient(to_left,rgba(7,10,15,1)_0%,rgba(7,10,15,0.95)_30%,rgba(7,10,15,0.35)_65%,rgba(7,10,15,0)_100%)]"
      : "bg-[linear-gradient(to_top,rgba(7,10,15,1),rgba(7,10,15,0.55)_50%,rgba(7,10,15,0.85))]";

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
        className={cn("object-cover", object)}
      />
      {/* Solid → transparent gradient pushing darkness to the text side */}
      <div className={cn("absolute inset-0", sideGradient)} />
      {/* Top + bottom fade so the section seams into its neighbors */}
      <div
        className={cn(
          "absolute inset-0",
          intensity === "deep"
            ? "bg-[linear-gradient(to_bottom,rgba(7,10,15,0.75)_0%,rgba(7,10,15,0.35)_30%,rgba(7,10,15,0.35)_70%,rgba(7,10,15,0.85)_100%)]"
            : "bg-[linear-gradient(to_bottom,rgba(7,10,15,0.7)_0%,rgba(7,10,15,0.2)_30%,rgba(7,10,15,0.2)_70%,rgba(7,10,15,0.8)_100%)]"
        )}
      />
    </div>
  );
}
