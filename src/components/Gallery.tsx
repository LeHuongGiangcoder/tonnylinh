"use client";

import Image from "next/image";
import { useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { gallery, type GalleryLayout } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Lace } from "./Lace";
import { Emblem } from "./Ornament";
import { Reveal } from "./Reveal";

/** How far a drag has to travel, as a share of the album's width, to turn. */
const SWIPE = 0.18;
/** Movement under this many pixels is a tap on a print, not a drag. */
const TAP = 8;

type Corner = "tl" | "tr" | "bl" | "br";

type Slot = {
  kind: "polaroid" | "stamp";
  /** x and w in % of the board's width, y in % of its HEIGHT, r in degrees. */
  x: number;
  y: number;
  w: number;
  r: number;
  /** The corner of the photo the heart sits in — one no later print covers. */
  heart: Corner;
};

type Layout = {
  prints: [Slot, Slot, Slot];
  /** The postmark, franked across the board's emptiest corner. */
  postmark: { x: number; y: number; w: number; r: number };
};

/**
 * Where the three prints of each kind of page lie on the board (4:5).
 *
 * A print's height follows from its width, so the numbers were laid out in
 * board-width units — the board is 125 of them tall:
 *   polaroid, portrait photo   1.57 × w
 *   polaroid, landscape photo  0.82 × w
 *   stamp (portrait only)      1.26 × w
 * Each page zig-zags so the prints overlap at a corner — no photo is more than
 * about a fifth covered, and never across the middle, where the faces are.
 * Later slots lie on top.
 */
const LAYOUTS: Record<GalleryLayout, Layout> = {
  ppp: {
    prints: [
      { kind: "polaroid", x: 3, y: 2.5, w: 50, r: -4, heart: "bl" },
      { kind: "stamp", x: 60, y: 3, w: 35, r: 6, heart: "tr" },
      { kind: "polaroid", x: 45, y: 36, w: 50, r: 3, heart: "br" },
    ],
    postmark: { x: 6, y: 72, w: 30, r: -12 },
  },
  lll: {
    prints: [
      { kind: "polaroid", x: 3, y: 2, w: 64, r: -3, heart: "tl" },
      { kind: "polaroid", x: 33, y: 30, w: 64, r: 3, heart: "tr" },
      { kind: "polaroid", x: 5, y: 57, w: 64, r: -2, heart: "br" },
    ],
    postmark: { x: 73, y: 77, w: 23, r: 10 },
  },
  pll: {
    prints: [
      { kind: "polaroid", x: 2, y: 18, w: 46, r: -4, heart: "bl" },
      { kind: "polaroid", x: 43, y: 2, w: 55, r: 4, heart: "tr" },
      { kind: "polaroid", x: 41, y: 54, w: 56, r: -3, heart: "br" },
    ],
    postmark: { x: 6, y: 79, w: 27, r: -10 },
  },
  ppl: {
    prints: [
      { kind: "polaroid", x: 3, y: 2.5, w: 48, r: -5, heart: "bl" },
      { kind: "stamp", x: 58, y: 4, w: 37, r: 5, heart: "tr" },
      { kind: "polaroid", x: 27, y: 52, w: 64, r: 2, heart: "br" },
    ],
    postmark: { x: 2, y: 71, w: 23, r: -14 },
  },
};

/**
 * The gallery as an album: a wine board with three photographs scattered on
 * it — polaroids and the odd postage stamp — turned a page at a time by
 * swiping or with the arrows. Every page is the same size whatever lies on
 * it, so turning never moves the page under the guest's thumb. Tapping a
 * print leaves a heart on it. See the GALLERY block in globals.css.
 */
export function Gallery() {
  const t = useCopy();
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState<number | null>(null);
  const [hearts, setHearts] = useState<Set<string>>(() => new Set());
  const windowRef = useRef<HTMLDivElement>(null);
  const start = useRef<number | null>(null);
  const dragged = useRef(false);

  const count = gallery.length;
  const go = (to: number) => setIndex(Math.min(Math.max(to, 0), count - 1));

  function toggle(src: string) {
    // A drag that ended over a print is not a tap on it.
    if (dragged.current) return;
    setHearts((prev) => {
      const next = new Set(prev);
      if (next.has(src)) next.delete(src);
      else next.add(src);
      return next;
    });
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = e.clientX;
    dragged.current = false;
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (start.current === null) return;
    let dx = e.clientX - start.current;
    // The pointer is only captured once it is clearly a drag, so a tap still
    // lands on the print under it.
    if (!dragged.current) {
      if (Math.abs(dx) < TAP) return;
      dragged.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    // Resist at either end of the album.
    if ((index === 0 && dx > 0) || (index === count - 1 && dx < 0)) dx /= 3;
    setDrag(dx);
  }

  function onPointerUp() {
    start.current = null;
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
                {gallery.map((page, p) => (
                  <div
                    key={p}
                    className="reel__slide"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${p + 1} / ${count}`}
                    aria-hidden={p !== index}
                    inert={p !== index}
                  >
                    <div className="album">
                      <Postmark {...LAYOUTS[page.layout].postmark} />
                      {page.shots.map((src, s) => {
                        const slot = LAYOUTS[page.layout].prints[s];
                        const number = p * 3 + s + 1;
                        return (
                          <Print
                            key={src}
                            src={src}
                            slot={slot}
                            portrait={page.layout[s] === "p"}
                            number={number}
                            label={`${t.gallery.heart} ${number}`}
                            hearted={hearts.has(src)}
                            onToggle={() => toggle(src)}
                            // The pages either side are fetched ahead of the swipe.
                            eager={Math.abs(p - index) <= 1}
                          />
                        );
                      })}
                    </div>
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

            <p className="album__hint">
              <span aria-hidden="true">♥</span> {t.gallery.tapHint}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** One print on the board: a polaroid with its number on the lip, or a
 *  postage stamp. Tapping it leaves a heart. */
function Print({
  src,
  slot,
  portrait,
  number,
  label,
  hearted,
  onToggle,
  eager,
}: {
  src: string;
  slot: Slot;
  portrait: boolean;
  number: number;
  label: string;
  hearted: boolean;
  onToggle: () => void;
  eager: boolean;
}) {
  const style = {
    left: `${slot.x}%`,
    top: `${slot.y}%`,
    width: `${slot.w}%`,
    rotate: `${slot.r}deg`,
    "--w": slot.w,
  } as CSSProperties;

  return (
    <button
      type="button"
      className="print"
      data-kind={slot.kind}
      data-shape={portrait ? "portrait" : "landscape"}
      data-hearted={hearted}
      style={style}
      onClick={onToggle}
      aria-pressed={hearted}
      aria-label={label}
    >
      <span className="print__photo">
        <Image
          src={src}
          alt=""
          width={portrait ? 933 : 1400}
          height={portrait ? 1400 : 933}
          sizes={`(max-width: 34rem) ${Math.round(slot.w)}vw, ${Math.round(slot.w * 0.3)}rem`}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
        />
        <span className="print__heart" data-corner={slot.heart} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 20.3 4.6 13.2a4.6 4.6 0 0 1 0-6.6 4.7 4.7 0 0 1 6.6 0l.8.8.8-.8a4.7 4.7 0 0 1 6.6 0 4.6 4.6 0 0 1 0 6.6Z" />
          </svg>
        </span>
      </span>

      {slot.kind === "polaroid" ? (
        <span className="print__lip" aria-hidden="true">
          No. {String(number).padStart(2, "0")}
        </span>
      ) : null}
    </button>
  );
}

/** A round postmark — the couple's names on the ring, the date across a
 *  cancel of wavy lines — franked onto the board, not onto a photo. */
function Postmark({ x, y, w, r }: Layout["postmark"]) {
  const ring = useId();
  return (
    <svg
      className="postmark"
      viewBox="0 0 200 120"
      aria-hidden="true"
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, rotate: `${r}deg` }}
    >
      <defs>
        <path id={ring} d="M 60 60 m -46 0 a 46 46 0 1 1 92 0 a 46 46 0 1 1 -92 0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="36" fill="none" strokeWidth="1.5" />
      <text className="postmark__ring">
        <textPath href={`#${ring}`} startOffset="2%">
          TONY &amp; LINH · WEDDING · TONY &amp; LINH ·
        </textPath>
      </text>
      <text x="60" y="56" textAnchor="middle" className="postmark__date">
        06·12
      </text>
      <text x="60" y="74" textAnchor="middle" className="postmark__date">
        2026
      </text>
      {[40, 52, 64, 76].map((cy) => (
        <path
          key={cy}
          d={`M 120 ${cy} q 10 -6 20 0 t 20 0 t 20 0 t 18 0`}
          fill="none"
          strokeWidth="2.5"
        />
      ))}
    </svg>
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
