import Image from "next/image";
import { wedding } from "@/data/wedding";
import { Reveal } from "./Reveal";

/**
 * The venue, drawn, with the two facts you actually need set beneath it in a
 * pair of panels: when, and where.
 */
export function TimeVenue() {
  return (
    <section id="details" className="section ground--red">
      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">Save the Date</p>
          <h2 className="heading">Time &amp; Venue</h2>
        </Reveal>

        <Reveal delay={120}>
          <Image
            src="/img/venue-sketch.webp"
            alt={`An architectural drawing of ${wedding.venue.name}`}
            width={1100}
            height={749}
            sizes="(max-width: 40rem) 92vw, 34rem"
            className="venue__sketch"
          />
        </Reveal>

        <Reveal delay={200}>
          <div className="panels">
            <div className="panel">
              <p className="eyebrow">The Day</p>
              <p className="stat stat--gold">{wedding.dateShort}</p>
              <p className="body-text body-text--muted">{wedding.dateLong}</p>
            </div>

            <div className="panel">
              <p className="eyebrow">The Place</p>
              <p className="stat stat--gold">{wedding.venue.name}</p>
              <p className="body-text body-text--muted">{wedding.venue.hall}</p>
              <p className="body-text body-text--muted">{wedding.venue.address}</p>
              <a
                className="btn btn--outline"
                href={wedding.venue.mapUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                View on map
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
