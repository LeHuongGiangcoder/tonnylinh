import Image from "next/image";
import { gallery } from "@/data/wedding";
import { Rule } from "./Divider";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

export function Gallery() {
  return (
    <section id="gallery" className="section ground--cream">
      <Ornament name="flower" style={{ top: "3%", left: "5%", width: "3.5rem" }} />

      <div className="container center stack">
        <Reveal className="stack-sm">
          <p className="eyebrow">Our Moments</p>
          <h2 className="heading">Us, in pictures</h2>
          <Rule />
        </Reveal>

        <Reveal delay={120}>
          <div className="gallery">
            {gallery.map((photo, i) => (
              <figure
                key={i}
                className={`gallery__item ${photo.wide ? "gallery__item--wide" : ""}`.trim()}
              >
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={800}
                    height={1066}
                    sizes="(max-width: 480px) 50vw, 240px"
                  />
                ) : (
                  <div className="gallery__placeholder">Photo</div>
                )}
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="note body-text--muted">
            Our photographs are on their way — this space is waiting for them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
