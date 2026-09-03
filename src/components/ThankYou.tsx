import { couple } from "@/data/wedding";
import { Conjunction, CoupleName } from "./CoupleName";
import { Rule } from "./Divider";
import { Reveal } from "./Reveal";

export function ThankYou() {
  return (
    <section id="thank-you" className="section section--full ground--red">
      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">With all our love</p>
          <h2 className="heading heading--lg">Thank You</h2>
          <Rule />
        </Reveal>

        <Reveal delay={140}>
          <p className="lead body-text--muted">
            Your presence is the greatest gift of all. Thank you for being part
            of our story — and for standing with us as it turns a new page.
          </p>
        </Reveal>

        <Reveal delay={280} className="stack-sm">
          <CoupleName initial={couple.groom.initial} rest={couple.groom.rest} />
          <Conjunction />
          <CoupleName initial={couple.bride.initial} rest={couple.bride.rest} />
        </Reveal>

        <Reveal delay={420}>
          <p className="eyebrow">{couple.hashtag}</p>
        </Reveal>
      </div>
    </section>
  );
}
