import Image from "next/image";
import { dresscode } from "@/data/wedding";
import { Reveal } from "./Reveal";

/**
 * The palette is held up on a card, printed on it rather than laid beside it,
 * and the swatches overlap the way a fan of paper chips does.
 */
export function Dresscode() {
  return (
    <section id="dresscode" className="section section--spill ground--red">
      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">What to Wear</p>
          <h2 className="heading">{dresscode.title}</h2>
          <p className="body-text body-text--muted">{dresscode.description}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="held">
            <Image
              src="/img/dress-hand.webp"
              alt=""
              width={900}
              height={1557}
              sizes="(max-width: 34rem) 86vw, 28rem"
              className="held__hand"
            />

            <div className="held__card">
              <p className="held__title">{dresscode.note}</p>
              <ul className="swatches">
                {dresscode.palette.map((swatch) => (
                  <li key={swatch.name} className="swatch">
                    <span
                      className="swatch__chip"
                      style={{ background: swatch.hex }}
                      aria-hidden="true"
                    />
                    <span className="swatch__name">{swatch.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Falls past the section's foot, so the seam with the next ground runs
          under cloth rather than showing as a ruled line. */}
      <Image
        src="/img/drape.webp"
        alt=""
        width={1600}
        height={523}
        sizes="100vw"
        aria-hidden="true"
        className="section__drape"
      />
    </section>
  );
}
