"use client";

import Image from "next/image";
import { gallery } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Lace } from "./Lace";
import { Emblem } from "./Ornament";
import { Reveal } from "./Reveal";

/** Two lanes, dealt alternately. */
const LANES = [0, 1];

/**
 * Two lanes rather than a grid. Each picture keeps its own proportion and hangs
 * a degree or two off square, and — the point of it — the lanes are OFFSET, so
 * no two neighbours ever share a top edge and the wall reads as pinned up
 * rather than tabulated. The frame stays the site's gold hairline.
 *
 * The lanes are built here rather than left to CSS columns: column layout
 * balances the two heights, which is exactly the row alignment being avoided.
 */
export function Gallery() {
  const t = useCopy();

  return (
    <section id="gallery" className="section ground--cream section--laced">
      <Lace />

      <div className="container center stack">
        <Reveal className="stack-sm">
          <Emblem name="flower" />
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h2 className="heading">{t.gallery.heading}</h2>
          <Rule />
        </Reveal>

        <Reveal delay={120}>
          <div className="gallery">
            {LANES.map((lane) => (
              <div className="gallery__lane" key={lane}>
                {gallery
                  .filter((_, i) => i % LANES.length === lane)
                  .map((photo, i) => (
                    <figure
                      key={i}
                      className="gallery__item"
                      style={{
                        aspectRatio: photo.ratio,
                        rotate: photo.tilt ? `${photo.tilt}deg` : undefined,
                      }}
                    >
                      {photo.src ? (
                        <Image
                          src={photo.src}
                          alt=""
                          width={800}
                          height={1066}
                          sizes="(max-width: 480px) 50vw, 240px"
                        />
                      ) : (
                        <div className="gallery__placeholder">{t.gallery.placeholder}</div>
                      )}
                    </figure>
                  ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="note body-text--muted">{t.gallery.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
