import Image from "next/image";

/**
 * A swag of the red silk, hung off the FOOT of a dark section and falling
 * across the boundary into the cream one below — so the seam runs under cloth,
 * and so does whatever that section cuts off at its own edge.
 *
 * The asset keeps the cloth's own top and bottom edges and is cut only at the
 * sides — to the middle half of the original photograph, which is the widest
 * window that still has a row covering edge to edge. Everywhere else the sweep
 * is diagonal and leaves a corner bare. That row, at 64–71% of the height, is
 * the only one that can hide a join, which is what fixes where the swag sits.
 *
 * Put it last in the section, and give that section `section--spill` and the
 * one below it `section--under-spill`.
 *
 * The file is `silk-swag.webp`, not `drape.webp`: next/image caches optimized
 * output by URL, so re-cutting an asset in place leaves it serving the old
 * shape for ever. Re-cut means rename.
 */
export function Drape() {
  return (
    <div className="drape" aria-hidden="true">
      <Image
        src="/img/silk-swag.webp"
        alt=""
        width={800}
        height={523}
        sizes="100vw"
        className="drape__swag"
      />
    </div>
  );
}
