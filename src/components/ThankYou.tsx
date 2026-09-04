import Image from "next/image";
import { couple } from "@/data/wedding";
import { Reveal } from "./Reveal";

/**
 * The closing note, printed on paper with a single rose laid over its head —
 * the flower breaks the card's edge so the two read as one arrangement.
 */
export function ThankYou() {
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
            <p className="eyebrow">With all our love</p>
            <h2 className="heading">Thank You</h2>
            <p className="body-text body-text--muted">
              Your presence is the greatest gift of all. Thank you for being
              part of our story — and for standing with us as it turns a new
              page.
            </p>

            {/* Signed with initials, the way a note is. */}
            <p className="closing__signature">
              {couple.groom.initial}
              <span className="closing__amp"> &amp; </span>
              {couple.bride.initial}
            </p>

            <p className="eyebrow">{couple.hashtag}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
