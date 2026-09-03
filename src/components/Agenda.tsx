import { agenda } from "@/data/wedding";
import { Rule } from "./Divider";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

export function Agenda() {
  return (
    <section id="agenda" className="section ground--cream">
      <Ornament name="butterfly" style={{ top: "3.5%", right: "5%", width: "4rem" }} />

      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">The Programme</p>
          <h2 className="heading">Order of the Day</h2>
          <Rule />
        </Reveal>

        <Reveal delay={120}>
          <div className="card">
            <ol className="agenda">
              {agenda.map((item) => (
                <li key={item.time} className="agenda__item">
                  <span className="agenda__time">{item.time}</span>
                  <span className="agenda__title" style={{ textAlign: "start" }}>
                    {item.title}
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
