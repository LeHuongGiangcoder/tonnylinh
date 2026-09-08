"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { couple, wedding } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Conjunction, CoupleName } from "./CoupleName";
import { Rule } from "./Divider";

type State = "sealed" | "opening" | "open" | "dismissed";

/**
 * The opening beat. Pressing the wax seal breaks it, the flap hinges back
 * through 180°, and the invitation rides up out of the pocket.
 *
 * The envelope is DRAWN, not photographed — cotton-rag grain over a cream
 * ground, clipped to the die-cuts in <PaperDefs />. The layers are stacked
 * back to front in the scene's own depth, which is what makes the card read as
 * being INSIDE it:
 *
 *   -6px  .env__back    the back panel, and the envelope's shadow
 *   -3px  .env__card    the invitation, in the pocket
 *   +2px  .env__pocket  the front, with the V mouth the card is read through
 *   +5px  .env__flap    the flap; folds to -11px, behind the risen card
 *   +9px  .env__seal    the wax
 */
export function Intro() {
  const t = useCopy();
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
    const toOpen = setTimeout(() => setState("open"), 2800);
    return () => clearTimeout(toOpen);
  }, [state]);

  useEffect(() => {
    if (state !== "open") return;
    const toHero = setTimeout(() => setState("dismissed"), 3400);
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
        <div className="env" data-open={opened}>
          {/* The back panel — and the shadow the whole envelope casts. */}
          <div className="env__back" />

          {/* The invitation, sitting in the pocket and riding up out of it.
              The well clips its foot at the envelope's bottom edge. */}
          <div className="env__well">
            <div className="env__card">
              <div className="env__card-face" />
              <div className="env__card-content">
                <p className="eyebrow">{t.intro.opened}</p>
                <Rule />
                <span className="env__names">
                  <CoupleName initial={couple.groom.initial} rest={couple.groom.rest} />
                  <Conjunction />
                  <CoupleName initial={couple.bride.initial} rest={couple.bride.rest} />
                </span>
                <p className="stat stat--sm">{wedding.dateShort}</p>
              </div>
            </div>
          </div>

          {/* The front, clipped to the V mouth. */}
          <div className="env__pocket" />

          {/* One hinged plane carrying both faces of the flap. Nothing that
              flattens an element — no filter, no clip-path — may sit on the
              hinge or on a face: a flattened face stops being culled by
              backface-visibility and both sides show at once. Every clip and
              filter therefore lives on a pseudo-element. */}
          <div className="env__flap">
            <div className="env__flap-face env__flap-face--front" />
            <div className="env__flap-face env__flap-face--back" />
          </div>

          <button
            type="button"
            className="env__seal"
            onClick={open}
            aria-label="Break the seal and open the invitation"
            tabIndex={state === "sealed" ? 0 : -1}
          >
            <Image src="/img/seal.webp" alt="" width={760} height={776} priority />
          </button>
        </div>

        <p className="intro__hint">{t.intro.hint}</p>
      </div>
    </div>
  );
}
