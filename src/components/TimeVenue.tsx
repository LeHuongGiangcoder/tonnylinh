import { wedding } from "@/data/wedding";
import { Rule } from "./Divider";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

export function TimeVenue() {
  return (
    <section id="details" className="section ground--red">
      <Ornament name="crest" style={{ top: "2.5%", right: "5%", width: "3.5rem" }} />

      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">Save the Date</p>
          <h2 className="heading">Time &amp; Venue</h2>
          <Rule />
        </Reveal>

        <Reveal delay={120}>
          <div className="card stack-sm">
            <p className="eyebrow">The Day</p>
            <p className="stat">{wedding.dateShort}</p>
            <p className="body-text body-text--muted">{wedding.dateLong}</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="card stack-sm">
            <p className="eyebrow">The Place</p>
            <p className="stat">{wedding.venue.name}</p>
            <p className="body-text body-text--muted">{wedding.venue.hall}</p>
            <p className="body-text body-text--muted">{wedding.venue.address}</p>
            <a
              className="btn btn--outline"
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noreferrer noopener"
              style={{ marginBlockStart: "var(--space-sm)" }}
            >
              View on map
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
