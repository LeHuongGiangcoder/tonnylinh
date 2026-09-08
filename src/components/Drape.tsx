import Image from "next/image";

/**
 * A swag of the red silk, hung off the FOOT of a dark section and falling
 * across the boundary into the cream one below — so the seam runs under cloth,
 * and so does whatever that section cuts off at its own edge.
 *
 * The asset is cut from the one row of the original photograph where the cloth
 * covers the frame edge to edge; everywhere else the sweep is diagonal and
 * leaves a corner bare. That gives it a straight, opaque head, and only that
 * head can be trusted to hide a join — the wavy hem below it is for the
 * transition, not for the seal, which is what fixes where the swag has to sit.
 *
 * Put it last in the section, and give that section `section--spill` and the
 * one below it `section--under-spill`.
 */
export function Drape() {
  return (
    <div className="drape" aria-hidden="true">
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
