import Image from "next/image";
import type { CSSProperties } from "react";

const ORNAMENTS = {
  flower: { src: "/img/flower.webp", w: 640, h: 692 },
  butterfly: { src: "/img/butterfly.webp", w: 640, h: 466 },
  crest: { src: "/img/crest.webp", w: 560, h: 635 },
} as const;

/**
 * A corner gold ornament. Decorative only — sits behind content via
 * `.ornament` (z-index: -1) and never intercepts taps.
 */
export function Ornament({
  name,
  style,
}: {
  name: keyof typeof ORNAMENTS;
  style: CSSProperties;
}) {
  const o = ORNAMENTS[name];
  return (
    <Image
      src={o.src}
      alt=""
      width={o.w}
      height={o.h}
      aria-hidden="true"
      className="ornament"
      style={style}
    />
  );
}
