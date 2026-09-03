import { couple, guest, wedding } from "@/data/wedding";
import { Conjunction, CoupleName } from "./CoupleName";
import { Rule } from "./Divider";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="hero" className="section section--full ground--red">
      <div className="container center stack">
        {/* Personalised per invitation — hardcoded until the backend lands. */}
        <Reveal>
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
            Together with our families, we joyfully invite you to share in our
            celebration of love
          </p>
        </Reveal>

        <Reveal delay={320} className="stack-sm">
          <CoupleName initial={couple.groom.initial} rest={couple.groom.rest} />
          <Conjunction />
          <CoupleName initial={couple.bride.initial} rest={couple.bride.rest} />
        </Reveal>

        <Reveal delay={480} className="stack-sm">
          <Rule />
          <p className="stat">{wedding.dateShort}</p>
          <p className="eyebrow">{wedding.venue.name}</p>
        </Reveal>
      </div>
    </section>
  );
}
