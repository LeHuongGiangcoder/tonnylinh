"use client";

import Image from "next/image";
import { couple, guest, heroPhoto, wedding } from "@/data/wedding";
import { LanguageToggle, useCopy } from "@/lib/lang";
import { Reveal } from "./Reveal";

/**
 * The opening screen: the couple's portrait hung in a gilt frame on the silk,
 * and the title card beneath it — THE WEDDING OF, the names in script, the
 * date — the way a painting in a hall carries its plate. The guest's own name
 * follows, so the invitation is addressed before the page moves on.
 */
export function Hero() {
  const t = useCopy();

  return (
    <section id="hero" className="section section--full ground--silk">
      <div className="container center">
        <Reveal className="hero__top">
          <LanguageToggle />
        </Reveal>

        <Reveal delay={120}>
          {/* The photograph sits BEHIND the frame and is cut to its opening,
              so the carved edge laps the print the way a real mount does. */}
          <figure className="gilt">
            <div className="gilt__photo">
              <Image
                src={heroPhoto.src}
                alt={`${couple.groom.initial}${couple.groom.rest} & ${couple.bride.initial}${couple.bride.rest}`}
                width={heroPhoto.width}
                height={heroPhoto.height}
                sizes="(max-width: 34rem) 52vw, 16rem"
                priority
              />
            </div>
            <Image
              src="/img/gilt-frame.webp"
              alt=""
              width={1000}
              height={1411}
              sizes="(max-width: 34rem) 84vw, 26rem"
              priority
              aria-hidden="true"
              className="gilt__frame"
            />
          </figure>
        </Reveal>

        <Reveal delay={220} className="hero__plate">
          <p className="hero__of">{t.hero.weddingOf}</p>
          <h1 className="hero__names">
            {couple.groom.initial}
            {couple.groom.rest}
            <span className="hero__amp"> &amp; </span>
            {couple.bride.initial}
            {couple.bride.rest}
          </h1>
          <p className="hero__date">{wedding.dateShort}</p>
        </Reveal>

        <Reveal delay={320} className="hero__address">
          <p className="eyebrow">{t.hero.dear}</p>
          {/* Personalised per invitation — hardcoded until the backend lands. */}
          <p className="stat">{guest.name}</p>
          <p className="note body-text--muted">{t.hero.invitation}</p>
        </Reveal>
      </div>
    </section>
  );
}
