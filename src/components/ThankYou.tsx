"use client";

import Image from "next/image";
import { couple } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Reveal } from "./Reveal";

/**
 * The closing note, printed on paper with a rose laid over its head and the
 * silk tassel hanging from its foot — both break the card's edge, so the three
 * read as one arrangement rather than as pictures pasted on a panel.
 */
export function ThankYou() {
  const t = useCopy();

  return (
    <section id="thank-you" className="section section--full ground--silk">
      <Reveal>
        <div className="closing">
          <Image
            src="/img/hero-card.webp"
            alt=""
            width={1200}
            height={1639}
            sizes="(max-width: 34rem) 86vw, 26rem"
            className="closing__paper"
          />

          <Image
            src="/img/rose.webp"
            alt=""
            width={1100}
            height={926}
            sizes="(max-width: 34rem) 58vw, 17rem"
            aria-hidden="true"
            className="closing__rose"
          />

          <div className="closing__content center stack-sm">
            <p className="eyebrow">{t.thanks.eyebrow}</p>
            <h2 className="heading">{t.thanks.heading}</h2>
            <p className="body-text body-text--muted">{t.thanks.body}</p>

            {/* Signed with initials, the way a note is. */}
            <p className="closing__signature">
              {couple.groom.initial}
              <span className="closing__amp"> &amp; </span>
              {couple.bride.initial}
            </p>

            <p className="eyebrow">{couple.hashtag}</p>
          </div>

          <Image
            src="/img/tassel.webp"
            alt=""
            width={291}
            height={900}
            sizes="(max-width: 34rem) 22vw, 6rem"
            aria-hidden="true"
            className="closing__tassel"
          />
        </div>
      </Reveal>
    </section>
  );
}
