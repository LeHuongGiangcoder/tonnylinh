"use client";

import Image from "next/image";
import { useState } from "react";
import { agenda, weddingWeek } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Lace } from "./Lace";
import { Reveal } from "./Reveal";

type EventId = (typeof agenda)[number]["id"];

/**
 * The day as a spread of polaroids: two to a row, one per stop, each with its
 * time pinned to the print and its name written on the lip. Tapping a photo
 * leaves a heart on it.
 */
export function Agenda() {
  const t = useCopy();
  const [hearts, setHearts] = useState<Set<EventId>>(() => new Set());

  function toggle(id: EventId) {
    setHearts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section id="agenda" className="section ground--cream section--laced">
      <Lace />

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
          <div className="programme">
            <p className="programme__span">
              {agenda[0].time} – {agenda[agenda.length - 1].time}
            </p>

            <ol className="programme__grid">
              {agenda.map((item) => {
                const title = t.agenda.events[item.id];
                const hearted = hearts.has(item.id);
                return (
                  <li key={item.id} className="polaroid" data-hearted={hearted}>
                    <button
                      type="button"
                      className="polaroid__print"
                      onClick={() => toggle(item.id)}
                      aria-pressed={hearted}
                      aria-label={`${t.agenda.heart} ${title}`}
                    >
                      <Image
                        src={item.photo}
                        alt=""
                        width={720}
                        height={900}
                        sizes="(max-width: 34rem) 42vw, 13rem"
                        className="polaroid__photo"
                      />
                      <span className="polaroid__time">{item.time}</span>
                      <span className="polaroid__heart" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                          <path d="M12 20.3 4.6 13.2a4.6 4.6 0 0 1 0-6.6 4.7 4.7 0 0 1 6.6 0l.8.8.8-.8a4.7 4.7 0 0 1 6.6 0 4.6 4.6 0 0 1 0 6.6Z" />
                        </svg>
                      </span>
                    </button>

                    <p className="polaroid__title">
                      <span
                        className="polaroid__icon"
                        style={{
                          maskImage: `url(/img/icon/${item.icon}.webp)`,
                          WebkitMaskImage: `url(/img/icon/${item.icon}.webp)`,
                        }}
                        aria-hidden="true"
                      />
                      {title}
                    </p>
                  </li>
                );
              })}
            </ol>

            <p className="programme__hint">
              <span aria-hidden="true">♥</span> {t.agenda.tapHint}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
