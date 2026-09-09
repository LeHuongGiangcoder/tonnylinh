import Image from "next/image";

/**
 * The seam between a dark ground and the cream one below it, hemmed with lace
 * whose scallop hangs into the cream.
 *
 * It needs nothing behind it. `lace.webp` is cropped to its own bounds and is
 * opaque edge to edge from its third row down, so pulling it a couple of
 * pixels above the section's top edge puts solid braid on the join. An earlier
 * version sat it on a band of red damask to guarantee that — which showed as a
 * rectangular patch of the wrong red wherever the section above was the silk
 * rather than the damask.
 *
 * Drop it in as the FIRST child of the `.ground--cream` section and add
 * `section--laced`, which buys the room out of that section's top padding.
 */
export function Lace() {
  return (
    <div className="lace" aria-hidden="true">
      <Image
        src="/img/lace.webp"
        alt=""
        width={1600}
        height={205}
        sizes="100vw"
        className="lace__band"
      />
    </div>
  );
}
