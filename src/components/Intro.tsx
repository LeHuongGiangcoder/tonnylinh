"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type State = "sealed" | "opening" | "open" | "dismissed";

/**
 * The opening beat. Pressing the wax seal breaks it, the flap hinges open,
 * and the letter rides up out of the envelope reading "You are invited" —
 * then the overlay hands the page over to the hero.
 */
export function Intro() {
  const [state, setState] = useState<State>("sealed");
  const opened = state === "opening" || state === "open";

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

  // Flap + letter run for ~1.6s, the line is held, then the hero takes over.
  useEffect(() => {
    if (state !== "opening") return;
    const toOpen = setTimeout(() => setState("open"), 1600);
    return () => clearTimeout(toOpen);
  }, [state]);

  useEffect(() => {
    if (state !== "open") return;
    const toHero = setTimeout(() => setState("dismissed"), 2400);
    return () => clearTimeout(toHero);
  }, [state]);

  return (
    <div
      className="intro ground--red"
      data-state={state}
      aria-hidden={state === "dismissed"}
      inert={state === "dismissed"}
      // Once it is open, a tap anywhere goes straight through to the hero.
      onClick={state === "open" ? () => setState("dismissed") : undefined}
    >
      <div className="intro__stage">
        <div className="envelope" data-open={opened}>
          <div className="envelope__back" />

          {/* The letter, clipped to the envelope's mouth until it rises. */}
          <div className="envelope__well">
            <div className="letter">
              <Image
                src="/img/letter.webp"
                alt=""
                width={1000}
                height={1366}
                priority
                className="letter__paper"
              />
              <div className="letter__content">
                <p className="heading" style={{ color: "var(--color-wine)" }}>
                  You are invited
                </p>
              </div>
            </div>
          </div>

          {/* Front pocket and hinged flap — the same photograph, clipped. */}
          <Image
            src="/img/envelope.webp"
            alt=""
            width={1000}
            height={747}
            priority
            className="envelope__layer envelope__pocket"
          />
          <div className="envelope__flap">
            <Image
              src="/img/envelope.webp"
              alt=""
              width={1000}
              height={747}
              priority
              className="envelope__layer"
            />
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
