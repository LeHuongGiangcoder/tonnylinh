import Image from "next/image";

/**
 * The seam between a dark ground and the cream one below it: a swag of the red
 * silk, hung from a short band of the ground above so the two meet with no gap.
 *
 * The asset is cut from the one row of the original photograph where the silk
 * covers the frame edge to edge — everywhere else the sweep is diagonal and
 * leaves a corner bare — so its top edge is straight and opaque and its hem is
 * the natural wave of the cloth.
 *
 * Drop it in as the FIRST child of a `.ground--cream` section and add
 * `section--draped`; the section's own top padding pays for it.
 */
export function Drape({ from }: { from: "silk" | "red" }) {
  return (
    <div className={`drape drape--${from}`} aria-hidden="true">
      <span className="drape__band" />
      <Image
        src="/img/drape.webp"
        alt=""
        width={800}
        height={190}
        sizes="100vw"
        className="drape__swag"
      />
    </div>
  );
}
