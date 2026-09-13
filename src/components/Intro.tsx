"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { couple, film } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";

type State = "sealed" | "opening" | "open" | "caption" | "film" | "dismissed";

/** How long the line before the film is held on screen. */
const CAPTION_MS = 3600;
/** Start lifting the curtain this long before the film's last frame, so the
 *  hero is fading in while the film is still moving rather than after a stop. */
const FADE_LEAD_S = 1.4;

/**
 * The opening beat. Pressing the wax seal breaks it, the flap hinges back
 * through 180°, and the invitation rides up out of the pocket.
 *
 * The envelope is DRAWN, not photographed — cotton-rag grain over a cream
 * ground, clipped to the die-cuts in <PaperDefs />. It stacks in PLAIN
 * Z-INDEX, not in 3D depth:
 *
 *   0  .env__back    the back panel, and the envelope's shadow
 *   1  .env__card    the invitation, in a well that clips its foot
 *   1  .env__photo   the couple's photograph, over the card's corner
 *   2  .env__pocket  the front, with the V mouth the card is read through
 *   3  .env__fold    the bottom flap, folded up over the pocket
 *   5  .env__flap    the flap — drops to 0 halfway through the fold
 *   6  .env__seal    the wax
 *
 * An earlier version put the whole envelope in one `preserve-3d` scene and let
 * the browser sort the layers by their z offsets. It does not: with the flap
 * laid back at -11px and the card at -3px it still painted the flap over the
 * card. Only the FLAP needs three dimensions, so only the flap gets them, and
 * the one moment its order changes is handled by switching its z-index at the
 * half-way point of the fold — where it is edge-on and the swap cannot be seen.
 *
 * Once the card is up the envelope gives way to the film: a line of caption
 * over the dark, then the video, and as it ends the whole intro fades off the
 * hero. Pressing the seal is the gesture that lets the film play WITH sound.
 */
export function Intro() {
  const t = useCopy();
  const [state, setState] = useState<State>("sealed");
  const video = useRef<HTMLVideoElement>(null);
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
    const toCaption = setTimeout(() => setState("caption"), 3400);
    return () => clearTimeout(toCaption);
  }, [state]);

  useEffect(() => {
    if (state !== "caption") return;
    const toFilm = setTimeout(() => setState("film"), CAPTION_MS);
    return () => clearTimeout(toFilm);
  }, [state]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;

    if (state === "film") {
      // Sound is allowed after the seal was pressed; if a browser still
      // refuses, play muted rather than not at all.
      el.play().catch(() => {
        el.muted = true;
        el.play().catch(() => setState("dismissed"));
      });
    } else if (state === "dismissed") {
      // Let it run on under the fade, and stop once it is out of sight.
      const stop = setTimeout(() => el.pause(), 1800);
      return () => clearTimeout(stop);
    }
  }, [state]);

  const toHero = useCallback(() => {
    setState((s) => (s === "film" || s === "caption" ? "dismissed" : s));
  }, []);

  function onTimeUpdate() {
    const el = video.current;
    if (el && el.duration && el.duration - el.currentTime <= FADE_LEAD_S) toHero();
  }

  const filmUp = state === "caption" || state === "film" || state === "dismissed";

  return (
    <div
      className="intro ground--silk"
      data-state={state}
      aria-hidden={state === "dismissed"}
      inert={state === "dismissed"}
      // Once it is open, a tap anywhere goes straight on to the film.
      onClick={state === "open" ? () => setState("caption") : undefined}
    >
      <div className="intro__stage">
        <div className="env__tilt" data-open={opened}>
          <div className="env" data-open={opened}>
            {/* The back panel — and the shadow the whole envelope casts. */}
            <div className="env__back" />

            {/* The invitation, sitting in the pocket and riding up out of it.
                The well clips its foot at the envelope's bottom edge. */}
            <div className="env__well">
              {/* The couple's photograph, drawn out just after the card and
                  lying over its corner. */}
              <div className="env__photo">
                <Image
                  src="/img/couple/intro.webp"
                  alt=""
                  width={1000}
                  height={778}
                  sizes="(max-width: 34rem) 33vw, 10rem"
                  priority
                />
              </div>

              <div className="env__card">
                <div className="env__card-face" />
                <div className="env__card-content">
                  <p className="eyebrow">{t.intro.opened}</p>
                  <Rule />
                  {/* One line: Tony & Linh. */}
                  <p className="env__names">
                    {couple.groom.initial}
                    {couple.groom.rest}
                    <span className="env__amp"> &amp; </span>
                    {couple.bride.initial}
                    {couple.bride.rest}
                  </p>
                </div>
              </div>
            </div>

            {/* The front, clipped to the V mouth, and the bottom flap folded up
                over it. */}
            <div className="env__pocket" />
            <div className="env__fold" />

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

          {/* Two bouquets laid across opposite corners — inside the tilt, so
              they settle with the envelope as it opens, but outside .env, so
              they never fold with the flap. */}
          <Image
            src="/img/bouquet-top.webp"
            alt=""
            width={619}
            height={900}
            sizes="(max-width: 34rem) 40vw, 11rem"
            priority
            aria-hidden="true"
            className="env__bouquet env__bouquet--top"
          />
          <Image
            src="/img/bouquet-foot.webp"
            alt=""
            width={540}
            height={900}
            sizes="(max-width: 34rem) 36vw, 10rem"
            priority
            aria-hidden="true"
            className="env__bouquet env__bouquet--foot"
          />
        </div>

        <p className="intro__hint">{t.intro.hint}</p>
      </div>

      <div className="intro__film" data-up={filmUp}>
        <video
          ref={video}
          className="intro__video"
          src={film.src}
          poster={film.poster}
          // Starts loading as soon as the seal breaks, so it is ready by the
          // time the caption has been read.
          preload={opened ? "auto" : "none"}
          playsInline
          onTimeUpdate={onTimeUpdate}
          onEnded={toHero}
        />

        <p className="intro__caption">{t.intro.film}</p>

        <button type="button" className="intro__skip" onClick={toHero}>
          {t.intro.skip}
        </button>
      </div>
    </div>
  );
}
