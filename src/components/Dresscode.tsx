import { dresscode } from "@/data/wedding";
import { Rule } from "./Divider";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

export function Dresscode() {
  return (
    <section id="dresscode" className="section ground--red">
      <Ornament name="flower" style={{ top: "3%", left: "5%", width: "3.5rem" }} />

      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">What to Wear</p>
          <h2 className="heading">{dresscode.title}</h2>
          <Rule />
        </Reveal>

        <Reveal delay={120} className="stack-sm">
          <p className="stat">{dresscode.note}</p>
          <p className="body-text body-text--muted">{dresscode.description}</p>
        </Reveal>

        <Reveal delay={200}>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "var(--space-xs)",
              flexWrap: "wrap",
              listStyle: "none",
              padding: 0,
            }}
          >
            {dresscode.palette.map((swatch) => (
              <li
                key={swatch.name}
                style={{ display: "grid", gap: "var(--space-3xs)", justifyItems: "center" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "block",
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "var(--radius-pill)",
                    background: swatch.hex,
                    border: "var(--hairline)",
                  }}
                />
                <span className="eyebrow" style={{ fontSize: "0.625rem" }}>
                  {swatch.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
