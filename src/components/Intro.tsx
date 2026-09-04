"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type State = "sealed" | "opening" | "open" | "dismissed";

/**
 * The opening beat. Pressing the wax seal breaks it, the flap hinges back
 * through 180° as a real plane in a perspective scene, and the card rides up
 * out of the pocket — then the overlay hands the page over to the hero.
 *
 * The envelope is drawn rather than photographed: one silhouette, used as a
 * clip path for both faces of the flap and again for the shadow it casts, so
 * every edge lines up by construction.
 */
export function Intro() {
  const [state, setState] = useState<State>("sealed");
  // Stays true through "dismissed" as well, or the envelope would snap shut
  // behind the fade on its way out.
  const opened = state !== "sealed";

  // Hold the page still until the guest has been let in.
  useEffect(() => {
    document.body.dataset.locked = state === "dismissed" ? "false" : "true";
    return () => {
      document.body.dataset.locked = "false";
    };
  }, [state]);

  const open = useCallback(() => {
    setState((s) => (s === "sealed" ? "opening" : s));
  }, []);

  useEffect(() => {
    if (state !== "opening") return;
    const toOpen = setTimeout(() => setState("open"), 2900);
    return () => clearTimeout(toOpen);
  }, [state]);

  useEffect(() => {
    if (state !== "open") return;
    const toHero = setTimeout(() => setState("dismissed"), 2600);
    return () => clearTimeout(toHero);
  }, [state]);

  return (
    <div
      className="intro ground--silk"
      data-state={state}
      aria-hidden={state === "dismissed"}
      inert={state === "dismissed"}
      // Once it is open, a tap anywhere goes straight through to the hero.
      onClick={state === "open" ? () => setState("dismissed") : undefined}
    >
      <div className="intro__stage">
        <div className="envelope" data-open={opened}>
          {/* The card, riding up behind the pocket. */}
          <div className="envelope__well">
            <div className="letter">
              <Image
                src="/img/letter-card.webp"
                alt=""
                width={1000}
                height={1120}
                sizes="(max-width: 30rem) 86vw, 25rem"
                priority
                className="letter__paper"
              />
              <div className="letter__content">
                <p className="heading heading--lg">You are invited</p>
              </div>
            </div>
          </div>

          {/* The pocket, with the shadow the flap casts on it. The shadow
              lives INSIDE the pocket so it paints on the pocket's own plane —
              a mask flattens an element out of the scene's depth sorting, so
              it cannot be a sibling here. */}
          <div className="envelope__body">
            <Image
              src="/img/env-body.webp"
              alt=""
              width={1500}
              height={900}
              sizes="(max-width: 30rem) 86vw, 25rem"
              priority
              className="envelope__plate"
            />
            <div className="envelope__shade" />
          </div>

          {/* One hinged plane carrying both faces of the flap. Each face is a
              bare element in the 3D context: the plate inside it carries both
              the die-cut (as alpha) and the brightness. A filter or a mask on
              the face itself would flatten it, and a flattened face stops being
              culled by backface-visibility — which is what left a flap lying on
              the pocket and another one over the card. */}
          <div className="envelope__flap">
            <div className="envelope__flap-face envelope__flap-face--front">
              <Image
                src="/img/flap-front.webp"
                alt=""
                width={1500}
                height={791}
                sizes="(max-width: 30rem) 86vw, 25rem"
                priority
                className="envelope__plate"
              />
            </div>

            <div className="envelope__flap-face envelope__flap-face--back">
              <Image
                src="/img/flap-inner.webp"
                alt=""
                width={1500}
                height={678}
                sizes="(max-width: 30rem) 86vw, 25rem"
                priority
                className="envelope__plate"
              />
            </div>
          </div>

          <button
            type="button"
            className="envelope__seal"
            onClick={open}
            aria-label="Break the seal and open the invitation"
            tabIndex={state === "sealed" ? 0 : -1}
          >
            <Image src="/img/seal.webp" alt="" width={760} height={776} priority />
          </button>
        </div>

        <p className="intro__hint">Press the seal</p>
      </div>
    </div>
  );
}
