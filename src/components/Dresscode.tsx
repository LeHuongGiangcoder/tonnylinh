"use client";

import Image from "next/image";
import { palette } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Reveal } from "./Reveal";

/**
 * The palette is held up on a card, printed on it rather than laid beside it,
 * and the four chips overlap the way a fan of paper samples does.
 */
export function Dresscode() {
  const t = useCopy();

  return (
    <section id="dresscode" className="section ground--red">
      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">{t.dresscode.eyebrow}</p>
          <h2 className="heading">{t.dresscode.heading}</h2>
          <p className="body-text body-text--muted">{t.dresscode.description}</p>
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
              <p className="held__title">{t.dresscode.note}</p>
              <ul className="swatches">
                {palette.map((swatch) => (
                  <li key={swatch.id} className="swatch">
                    <span
                      className="swatch__chip"
                      style={{ background: swatch.hex }}
                      aria-hidden="true"
                    />
                    <span className="swatch__name">{t.dresscode.colours[swatch.id]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
