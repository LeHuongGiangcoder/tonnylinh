import Image from "next/image";

const EMBLEMS = {
  flower: { src: "/img/flower.webp", w: 640, h: 692 },
  butterfly: { src: "/img/butterfly.webp", w: 640, h: 466 },
  crest: { src: "/img/crest.webp", w: 560, h: 635 },
} as const;

/** A small gold emblem, centred above a section's label. Decorative only. */
export function Emblem({ name }: { name: keyof typeof EMBLEMS }) {
  const e = EMBLEMS[name];
  return (
    <Image
      src={e.src}
      alt=""
      width={e.w}
      height={e.h}
      aria-hidden="true"
      className="emblem"
    />
  );
}
