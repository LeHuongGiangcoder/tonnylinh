"use client";

import Image from "next/image";
import { wedding } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Reveal } from "./Reveal";

/**
 * When and where, written on one sheet of deckle-edged note paper and sealed
 * with wax at its head — see the TIME & VENUE block in globals.css.
 */
export function TimeVenue() {
  const t = useCopy();

  return (
    <section id="details" className="section ground--red">
      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">{t.details.eyebrow}</p>
          <h2 className="heading">{t.details.heading}</h2>
          <Rule />
        </Reveal>

        <Reveal delay={120}>
          <div className="letter">
            <Image
              src="/img/note-paper.webp"
              alt=""
              width={900}
              height={1356}
              sizes="(max-width: 34rem) 80vw, 25rem"
              aria-hidden="true"
              className="letter__sheet"
            />

            <Image
              src="/img/seal.webp"
              alt=""
              width={760}
              height={776}
              sizes="(max-width: 34rem) 20vw, 6rem"
              aria-hidden="true"
              className="letter__seal"
            />

            <div className="letter__writing">
              <p className="eyebrow">{t.details.day}</p>
              <p className="stat">{wedding.dateShort}</p>
              <p className="body-text">{t.details.date}</p>

              <Rule />

              <p className="eyebrow">{t.details.place}</p>
              <p className="stat">{wedding.venue.name}</p>
              <p className="body-text">
                {wedding.venue.hall}
                <br />
                {t.details.address}
              </p>
              <a
                className="btn btn--wine"
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
