"use client";

import Image from "next/image";
import { wedding } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Reveal } from "./Reveal";

/**
 * The venue, engraved, with the two facts you actually need set beneath it in a
 * pair of panels — when, and where. Each panel is tied with the satin ribbon,
 * so the two read as a pair of parcels rather than as two boxes.
 */
export function TimeVenue() {
  const t = useCopy();

  return (
    <section id="details" className="section ground--red">
      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">{t.details.eyebrow}</p>
          <h2 className="heading">{t.details.heading}</h2>
        </Reveal>

        <Reveal delay={120}>
          <Image
            src="/img/venue.webp"
            alt={`An engraving of ${wedding.venue.name}`}
            width={1100}
            height={619}
            sizes="(max-width: 40rem) 92vw, 34rem"
            className="venue__art"
          />
        </Reveal>

        <Reveal delay={200}>
          <div className="panels">
            <div className="panel">
              <Ribbon />
              <p className="eyebrow">{t.details.day}</p>
              <p className="stat stat--gold">{wedding.dateShort}</p>
              <p className="body-text body-text--muted">{t.details.date}</p>
            </div>

            <div className="panel">
              <Ribbon />
              <p className="eyebrow">{t.details.place}</p>
              <p className="stat stat--gold">{wedding.venue.name}</p>
              <p className="body-text body-text--muted">{wedding.venue.hall}</p>
              <p className="body-text body-text--muted">{t.details.address}</p>
              <a
                className="btn btn--outline"
                href={wedding.venue.mapUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t.details.map}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Tied across the head of a panel, its tails overhanging both edges. */
function Ribbon() {
  return (
    <Image
      src="/img/ribbon.webp"
      alt=""
      width={1000}
      height={921}
      sizes="(max-width: 34rem) 34vw, 10rem"
      aria-hidden="true"
      className="panel__ribbon"
    />
  );
}
