"use client";

import Image from "next/image";
import { agenda, weddingWeek } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Lace } from "./Lace";
import { Reveal } from "./Reveal";

/** How far the ribbon swings out at each stop, in the SVG's own units. One
 *  value per stop, and deliberately UNEVEN — a tight first turn, a wide second,
 *  and so on. Swings within a few units of each other read as a machine-made
 *  zig-zag however smooth the spline through them is. */
const SWING = [17, 31, 22, 35, 20, 29];
/** One stop is 100 units tall in the SVG, and one row in the list. */
const STOP = 100;

/** Where the ribbon crosses each row — the point the pearl is threaded on.
 *  The block sits on one side, so the ribbon swings to the OTHER, and the
 *  pearl lands in the empty half of the row. */
const stopX = (i: number) =>
  50 + (i % 2 === 0 ? SWING[i % SWING.length] : -SWING[i % SWING.length]);
const stopY = (i: number) => i * STOP + STOP / 2;

/**
 * The ribbon, as one continuous curve rather than a chain of separate arcs.
 * The stops are read as a Catmull-Rom spline and converted to cubics, so the
 * tangent carries THROUGH every pearl instead of being reset at it — which is
 * the whole difference between a stitched zig-zag and a ribbon someone laid
 * down in a single motion. A lead-in from the calendar and a tail below the
 * last stop are extra spline points, not bolted-on segments, so they bend with
 * the rest of it.
 */
function ribbonPath(count: number) {
  // Tied to the wedding day in the strip above, so the ribbon leaves from that
  // column rather than from the middle of the section.
  const knot = ((weddingWeek.dates.indexOf(weddingWeek.theDay) + 0.5) / 7) * 100;

  const pts: [number, number][] = [
    [knot, -34],
    [knot, 0],
    ...agenda.slice(0, count).map((_, i) => [stopX(i), stopY(i)] as [number, number]),
    [50, count * STOP - 24],
    [52, count * STOP - 2],
  ];

  // Phantom ends, so the first and last real segments get a tangent too.
  const at = (i: number) => pts[Math.min(Math.max(i, 0), pts.length - 1)];
  const r = (n: number) => Math.round(n * 100) / 100;

  let d = `M ${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    d +=
      ` C ${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)}` +
      ` ${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(p2[1] - (p3[1] - p1[1]) / 6)}` +
      ` ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}

export function Agenda() {
  const t = useCopy();
  const path = ribbonPath(agenda.length);
  const total = agenda.length * STOP;

  return (
    <section id="agenda" className="section ground--cream section--laced">
      <Lace />

      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">{t.agenda.eyebrow}</p>
          <h2 className="heading">{t.agenda.heading}</h2>
          <Rule />
        </Reveal>

        {/* The week the day falls in, with the day itself tied to the ribbon. */}
        <Reveal delay={120}>
          <div className="weekstrip">
            <p className="weekstrip__month">{t.agenda.month}</p>
            <ol className="weekstrip__days">
              {weddingWeek.dates.map((date, i) => (
                <li
                  key={date}
                  className="weekstrip__day"
                  data-today={date === weddingWeek.theDay}
                >
                  <span className="weekstrip__name">{t.agenda.days[i]}</span>
                  <span className="weekstrip__date">{date}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="thread">
            <svg
              className="thread__line"
              viewBox={`0 0 100 ${total}`}
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d={path} />
            </svg>

            {/* The pearls ride the ribbon, so they are laid out against the
                SVG's own units — not against the rows, which are only as tall
                as their content happens to make them. */}
            <div className="thread__pearls" aria-hidden="true">
              {agenda.map((item, i) => (
                <Image
                  key={item.id}
                  src="/img/pearl.webp"
                  alt=""
                  width={320}
                  height={320}
                  sizes="32px"
                  className="thread__pearl"
                  style={{ left: `${stopX(i)}%`, top: `${(stopY(i) / total) * 100}%` }}
                />
              ))}
            </div>

            <ol className="thread__stops">
              {agenda.map((item, i) => (
                <li
                  key={item.id}
                  className="thread__stop"
                  data-side={i % 2 === 0 ? "left" : "right"}
                >
                  {/* The drawing sits across the ribbon from its label. It is
                      painted, not drawn: the file is a mask, which is the only
                      way to hold every mark to the same crimson. */}
                  <span
                    className="thread__icon"
                    style={{
                      maskImage: `url(/img/icon/${item.icon}.webp)`,
                      WebkitMaskImage: `url(/img/icon/${item.icon}.webp)`,
                    }}
                    aria-hidden="true"
                  />
                  <span className="thread__label">
                    <span className="thread__time">{item.time}</span>
                    <span className="thread__title">{t.agenda.events[item.id]}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
