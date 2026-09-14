"use client";

import Image from "next/image";
import { agenda, weddingWeek } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Reveal } from "./Reveal";

/**
 * Where each stop sits on the silk, as the centre of the stop in percent of
 * the ribbon's own box. Each is in the hollow of one turn, on the side the
 * ribbon has swung away from — measured off agenda-silk-full.webp's alpha:
 *
 *   ~8%  the ribbon runs 68–86% across   → stop on the left
 *   ~23% it turns at the left edge       → right
 *   ~40% it turns at 72–88%              → left
 *   ~58% it turns at the left edge       → right
 *   ~73% it turns at 56–77%              → left
 *   ~86% it turns at 20–46%              → right
 *
 * Re-cut the silk and these have to be measured again.
 */
const STOPS: { x: number; y: number }[] = [
  { x: 30, y: 8 },
  { x: 64, y: 23 },
  { x: 32, y: 40 },
  { x: 62, y: 58 },
  { x: 28, y: 73 },
  { x: 72, y: 85.5 },
];

export function Agenda() {
  const t = useCopy();

  return (
    <section id="agenda" className="section ground--cream">
      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">{t.agenda.eyebrow}</p>
          <h2 className="heading">{t.agenda.heading}</h2>
          <Rule />
        </Reveal>

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
            <Image
              src="/img/agenda-silk-full.webp"
              alt=""
              width={900}
              height={2014}
              sizes="(max-width: 34rem) 92vw, 28rem"
              aria-hidden="true"
              className="thread__silk"
            />

            <ol className="thread__stops">
              {agenda.map((item, i) => (
                <li
                  key={item.id}
                  className="thread__stop"
                  style={{ left: `${STOPS[i].x}%`, top: `${STOPS[i].y}%` }}
                >
                  {/* Painted, not drawn: the file is a mask, which is the only
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
