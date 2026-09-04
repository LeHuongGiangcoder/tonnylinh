import { agenda, weddingWeek } from "@/data/wedding";
import { Reveal } from "./Reveal";

/** How far the thread swings out at each stop, in the SVG's own units. One
 *  value per stop: a hand-stitched line does not repeat the same arc. */
const SWING = [26, 21, 27, 20, 25, 22];
/** One stop is 100 units tall in the SVG, and one row in the list. */
const STOP = 100;

/** The thread: a lead-in from the calendar, then a stitch through every stop.
 *  Each stop's block sits on one side, so the thread swings to the OTHER side
 *  at that row and never runs through the drawing or the type. */
function threadPath(count: number) {
  const x = (i: number) => 50 + (i % 2 === 0 ? SWING[i % SWING.length] : -SWING[i % SWING.length]);
  const y = (i: number) => i * STOP + STOP / 2;

  // The thread is tied to the wedding day in the strip above, so it leaves
  // from that column rather than from the middle of the section.
  const knot = ((weddingWeek.dates.indexOf(weddingWeek.theDay) + 0.5) / 7) * 100;
  let d = `M ${knot} 0 C ${knot} 24 ${x(0)} 18 ${x(0)} ${y(0)}`;
  for (let i = 1; i < count; i += 1) {
    d += ` C ${x(i - 1)} ${y(i - 1) + 46} ${x(i)} ${y(i) - 46} ${x(i)} ${y(i)}`;
  }
  // A last stitch that runs out and ties off below the final stop.
  const last = count - 1;
  d += ` C ${x(last)} ${y(last) + 44} 50 ${y(last) + 40} 50 ${count * STOP - 6}`;
  return d;
}

export function Agenda() {
  const path = threadPath(agenda.length);

  return (
    <section id="agenda" className="section ground--cream">
      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">The Programme</p>
          <h2 className="heading">Order of the Day</h2>
        </Reveal>

        {/* The week the day falls in, with the day itself tied to the thread. */}
        <Reveal delay={120}>
          <div className="weekstrip">
            <p className="weekstrip__month">{weddingWeek.month}</p>
            <ol className="weekstrip__days">
              {weddingWeek.dates.map((date, i) => (
                <li
                  key={date}
                  className="weekstrip__day"
                  data-today={date === weddingWeek.theDay}
                >
                  <span className="weekstrip__name">{weddingWeek.days[i]}</span>
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
              viewBox={`0 0 100 ${agenda.length * STOP}`}
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d={path} />
            </svg>

            <ol className="thread__stops">
              {agenda.map((item, i) => (
                <li
                  key={item.time}
                  className="thread__stop"
                  data-side={i % 2 === 0 ? "left" : "right"}
                >
                  {/* The drawing sits across the thread from its label, so the
                      pair balances the empty half of the row. It is painted,
                      not drawn: the file is a mask, which is the only way to
                      hold every mark to the same crimson. */}
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
                    <span className="thread__title">{item.title}</span>
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
