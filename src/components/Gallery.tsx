"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { gallery, type GalleryFrame } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Lace } from "./Lace";
import { Emblem } from "./Ornament";
import { Reveal } from "./Reveal";

/** How far a drag has to travel, as a share of the strip's width, to turn. */
const SWIPE = 0.18;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The gallery as a reel of film: one frame of three photographs at a time,
 * turned by swiping or with the arrows, and counted underneath. Every frame is
 * the same size whatever its shape, so turning never moves the page under the
 * guest's thumb — see the GALLERY block in globals.css.
 */
export function Gallery() {
  const t = useCopy();
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState<number | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const start = useRef(0);

  const count = gallery.length;
  const go = (to: number) => setIndex(Math.min(Math.max(to, 0), count - 1));

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = e.clientX;
    setDrag(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (drag === null) return;
    let dx = e.clientX - start.current;
    // Resist at either end of the reel.
    if ((index === 0 && dx > 0) || (index === count - 1 && dx < 0)) dx /= 3;
    setDrag(dx);
  }

  function onPointerUp() {
    if (drag === null) return;
    const width = windowRef.current?.offsetWidth ?? 1;
    if (drag < -width * SWIPE) go(index + 1);
    else if (drag > width * SWIPE) go(index - 1);
    setDrag(null);
  }

  return (
    <section id="gallery" className="section ground--cream section--laced">
      <Lace />

      <div className="container center stack">
        <Reveal className="stack-sm">
          <Emblem name="flower" />
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h2 className="heading">{t.gallery.heading}</h2>
          <Rule />
        </Reveal>

        <Reveal delay={120}>
          <div
            className="reel"
            role="region"
            aria-roledescription="carousel"
            aria-label={t.gallery.heading}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") go(index - 1);
              if (e.key === "ArrowRight") go(index + 1);
            }}
          >
            <div
              ref={windowRef}
              className="reel__window"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div
                className="reel__track"
                data-dragging={drag !== null}
                style={{ transform: `translateX(calc(${-index * 100}% + ${drag ?? 0}px))` }}
              >
                {gallery.map((frame, f) => (
                  <div
                    key={f}
                    className="reel__slide"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${f + 1} / ${count}`}
                    aria-hidden={f !== index}
                  >
                    <Film
                      frame={frame}
                      first={f * 3 + 1}
                      title={t.gallery.strip}
                      // The frames either side are fetched ahead of the swipe.
                      eager={Math.abs(f - index) <= 1}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="reel__nav">
              <button
                type="button"
                className="reel__arrow"
                onClick={() => go(index - 1)}
                disabled={index === 0}
                aria-label={t.gallery.prev}
              >
                <Chevron flip />
              </button>
              <p className="reel__count" aria-live="polite">
                {index + 1} <span>/</span> {count}
              </p>
              <button
                type="button"
                className="reel__arrow"
                onClick={() => go(index + 1)}
                disabled={index === count - 1}
                aria-label={t.gallery.next}
              >
                <Chevron />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** One length of film: the edge printing, and the three exposures on it. A
 *  landscape frame stacks its stills with an edge printed between each, as a
 *  strip of cine film does; a portrait frame hangs one tall print beside two
 *  stacked ones, which is what lets it fill the same length of film. */
function Film({
  frame,
  first,
  title,
  eager,
}: {
  frame: GalleryFrame;
  first: number;
  title: string;
  eager: boolean;
}) {
  const numbers = frame.shots.map((_, i) => first + i);
  const edge = (key: string) => <Edge key={key} numbers={numbers} title={title} />;

  const shot = (i: number) => {
    const { src, caption } = frame.shots[i];
    const portrait = frame.shape === "portrait";
    return (
      <figure key={src} className="film__shot">
        <Image
          src={src}
          alt=""
          width={portrait ? 933 : 1400}
          height={portrait ? 1400 : 933}
          sizes={portrait ? "(max-width: 34rem) 54vw, 16rem" : "(max-width: 34rem) 96vw, 30rem"}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
        />
        {caption ? <figcaption className="film__caption">{caption}</figcaption> : null}
      </figure>
    );
  };

  return (
    <div className="film" data-shape={frame.shape}>
      {edge("top")}
      <div className="film__frames">
        {frame.shape === "portrait"
          ? frame.shots.map((_, i) => shot(i))
          : frame.shots.flatMap((_, i) =>
              i === 0 ? [shot(i)] : [edge(`between-${i}`), shot(i)],
            )}
      </div>
      {edge("foot")}
    </div>
  );
}

/** ▸ 01   WEDDING PHOTOS   ▸ 02   WEDDING PHOTOS   ▸ 03 */
function Edge({ numbers, title }: { numbers: number[]; title: string }) {
  return (
    <div className="film__edge" aria-hidden="true">
      {numbers.map((n, i) => (
        <span key={n} style={{ display: "contents" }}>
          {i > 0 ? <span>{title}</span> : null}
          <span className="film__num">{pad(n)}</span>
        </span>
      ))}
    </div>
  );
}

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}
