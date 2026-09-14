"use client";

import Image from "next/image";
import { wedding } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Reveal } from "./Reveal";

/**
 * When and where, written on the place card of a laid table: a silver charger
 * between fork and knife, the card on it sealed with wax, and a bouquet of
 * burgundy callas laid across the setting. The way to the venue follows under
 * the table — the card only has room for the facts. See the TIME & VENUE block
 * in globals.css.
 */
export function TimeVenue() {
  const t = useCopy();

  return (
    <section id="details" className="section ground--red">
      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">{t.details.eyebrow}</p>
          <h2 className="heading heading--lines">{t.details.heading}</h2>
          <Rule />
        </Reveal>

        <Reveal delay={120}>
          <div className="setting">
            <Image
              src="/img/venue-setting.webp"
              alt=""
              width={1400}
              height={1136}
              sizes="(max-width: 34rem) 100vw, 30rem"
              aria-hidden="true"
              className="setting__table"
            />

            <div className="setting__card">
              <p className="eyebrow">{t.details.day}</p>
              <p className="stat">{wedding.dateShort}</p>
              <p className="body-text">{t.details.date}</p>

              <span className="setting__rule" aria-hidden="true" />

              <p className="eyebrow">{t.details.place}</p>
              <p className="stat">{wedding.venue.name}</p>
              <p className="body-text">
                {wedding.venue.hall} · {t.details.address}
              </p>
            </div>

            <Image
              src="/img/seal.webp"
              alt=""
              width={760}
              height={776}
              sizes="(max-width: 34rem) 16vw, 5rem"
              aria-hidden="true"
              className="setting__seal"
            />

            <Image
              src="/img/venue-calla-bouquet.webp"
              alt=""
              width={800}
              height={819}
              sizes="(max-width: 34rem) 44vw, 14rem"
              aria-hidden="true"
              className="setting__calla"
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <a
            className="btn btn--outline"
            href={wedding.venue.mapUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t.details.map}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
