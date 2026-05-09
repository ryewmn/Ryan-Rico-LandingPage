"use client";

import { useEffect, useRef, useState } from "react";
import { Instagram, Play } from "lucide-react";

/**
 * Renders a poster-style placeholder until either:
 *   1. the slide enters the viewport (with 200px headroom), OR
 *   2. the user taps it to load on demand.
 *
 * Avoids loading 6+ Instagram iframes on initial paint, which was
 * destroying mobile load.
 */
export function LazyInstagramEmbed({
  shortcode,
  index,
}: {
  shortcode: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={ref} className="relative h-full w-full bg-white">
      {/* Always-visible poster — sits behind the iframe so loading feels seamless */}
      <a
        href={`https://www.instagram.com/p/${shortcode}/`}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-br from-white via-neutral-50 to-toyota-red/[0.04]"
        aria-label="Open Instagram post"
      >
        <div className="flex items-center justify-between">
          <Instagram size={18} className="text-neutral-500" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
            {String(index + 1).padStart(2, "0")} / 06
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/80 backdrop-blur ring-1 ring-neutral-200 shadow-md">
            <Play size={18} className="text-toyota-red translate-x-0.5" fill="currentColor" />
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-toyota-red">
            @builds.by.ryry
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Tap to load post
          </p>
        </div>
      </a>

      {/* Iframe layered on top once requested. fades in. */}
      {shouldLoad ? (
        <iframe
          src={`https://www.instagram.com/p/${shortcode}/embed/captioned/`}
          title={`Instagram build ${shortcode}`}
          loading="lazy"
          allow="encrypted-media"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </div>
  );
}
