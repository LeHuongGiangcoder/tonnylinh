import Image from "next/image";
import { couple, guest, wedding } from "@/data/wedding";
import { Conjunction, CoupleName } from "./CoupleName";
import { Rule } from "./Divider";
import { Reveal } from "./Reveal";

/**
 * The opening screen: the invitation printed on a die-cut cream card, with a
 * satin bow tied across the card's foot. The card is a real layer behind the
 * type — the copy sits on it, not beside it.
 */
export function Hero() {
  return (
    <section id="hero" className="section section--full ground--silk">
      <div className="hero__card">
        <Image
          src="/img/hero-card.webp"
          alt=""
          width={1200}
          height={1639}
          sizes="(max-width: 34rem) 92vw, 30rem"
          priority
          className="hero__paper"
        />

        <div className="hero__content center stack">
          {/* Personalised per invitation — hardcoded until the backend lands. */}
          <Reveal className="hero__salutation">
            <p className="eyebrow">Dear</p>
            <p className="stat" style={{ marginBlockStart: "var(--space-2xs)" }}>
              {guest.name}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Rule />
          </Reveal>

          <Reveal delay={200}>
            <p className="lead body-text--muted">
              Together with our families, we joyfully invite you to share in our wedding
            </p>
          </Reveal>

          <Reveal delay={320} className="hero__names">
            <CoupleName initial={couple.groom.initial} rest={couple.groom.rest} />
            <Conjunction />
            <CoupleName initial={couple.bride.initial} rest={couple.bride.rest} />
          </Reveal>

          <Reveal delay={480} className="stack-sm">
            <Rule />
            <p className="stat stat--gold">{wedding.dateShort}</p>
            <p className="eyebrow">{wedding.venue.name}</p>
          </Reveal>
        </div>

        {/* Tied across the card's foot, overhanging both edges. */}
        <Image
          src="/img/ribbon.webp"
          alt=""
          width={1000}
          height={921}
          sizes="(max-width: 34rem) 52vw, 17rem"
          priority
          className="hero__ribbon"
        />
      </div>
    </section>
  );
}
