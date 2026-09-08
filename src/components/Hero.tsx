"use client";

import Image from "next/image";
import { couple, gallery, guest, wedding } from "@/data/wedding";
import { LanguageToggle, useCopy } from "@/lib/lang";
import { Conjunction, CoupleName } from "./CoupleName";
import { Rule } from "./Divider";
import { Reveal } from "./Reveal";

/** The strip carries three frames, taken off the top of the gallery. */
const FRAMES = 3;

/**
 * The opening screen, arranged as a flat-lay in three layers: a strip of
 * photographs leaning in from the left, an OPEN envelope lying across the
 * foot, and the letter itself drawn out of it and resting on top — which is
 * where the invitation is actually printed.
 *
 * The salutation sits above the flat-lay, so the page opens on a picture
 * rather than on a header and a wall of type.
 */
export function Hero() {
  const t = useCopy();
  const frames = gallery.slice(0, FRAMES);

  return (
    <section id="hero" className="section section--full ground--silk">
      <div className="container center stack">
        <Reveal className="hero__top stack-sm">
          <LanguageToggle />
          <p className="eyebrow">{t.hero.dear}</p>
          {/* Personalised per invitation — hardcoded until the backend lands. */}
          <p className="stat">{guest.name}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="hero__scene">
            {/* --- the photo strip, leaning in from the left -------------- */}
            {/* ONE card with three windows cut in it, not three cards: a
                strip of prints is a single piece of paper. */}
            <div className="polaroid">
              <Image
                src="/img/ribbon.webp"
                alt=""
                width={1000}
                height={921}
                sizes="(max-width: 34rem) 22vw, 7rem"
                aria-hidden="true"
                className="polaroid__bow"
              />
              {frames.map((photo, i) => (
                <figure key={i} className="polaroid__well">
                  {photo.src ? (
                    <Image
                      src={photo.src}
                      alt=""
                      width={600}
                      height={600}
                      sizes="(max-width: 34rem) 32vw, 10rem"
                      priority={i === 0}
                    />
                  ) : null}
                </figure>
              ))}
            </div>

            {/* --- the open envelope, lying across the foot --------------- */}
            <div className="hero__envelope">
              <span className="hero__envelope-flap" aria-hidden="true" />
              <span className="hero__envelope-pocket" aria-hidden="true" />
              <span className="hero__envelope-fold" aria-hidden="true" />
            </div>

            {/* --- the letter, drawn out and resting on top --------------- */}
            <div className="hero__letter">
              <span className="hero__letter-face" aria-hidden="true" />
              <div className="hero__letter-content">
                <p className="lead">{t.hero.invitation}</p>
                <span className="hero__names">
                  <CoupleName initial={couple.groom.initial} rest={couple.groom.rest} />
                  <Conjunction />
                  <CoupleName initial={couple.bride.initial} rest={couple.bride.rest} />
                </span>
                <Rule />
                <p className="stat stat--sm">{wedding.dateShort}</p>
                <p className="eyebrow">{wedding.venue.name}</p>
                <p className="eyebrow">{wedding.venue.hall}</p>
              </div>

              {/* Laid on the letter's foot corner, breaking its edge. */}
              <Image
                src="/img/bloom.webp"
                alt=""
                width={520}
                height={471}
                sizes="(max-width: 34rem) 26vw, 8rem"
                priority
                aria-hidden="true"
                className="hero__bloom"
              />
            </div>

            {/* Laid over the join of letter and envelope, so the two read as
                one arrangement rather than as two pictures stacked. */}
            <Image
              src="/img/seal.webp"
              alt=""
              width={760}
              height={776}
              sizes="(max-width: 34rem) 16vw, 5rem"
              priority
              aria-hidden="true"
              className="hero__seal"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
