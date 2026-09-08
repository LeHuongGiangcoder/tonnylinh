import Image from "next/image";

/**
 * The seam between a red ground and the cream one below it: a band of the red
 * carried a little way down into the cream section, hemmed with lace whose
 * scallop hangs into it. Drop it in as the FIRST child of a `.ground--cream`
 * section that follows a red one; the section's own top padding already leaves
 * room, so it needs no wrapper.
 */
export function Lace() {
  return (
    <div className="lace" aria-hidden="true">
      <Image
        src="/img/lace.webp"
        alt=""
        width={1600}
        height={535}
        sizes="100vw"
        className="lace__band"
      />
    </div>
  );
}
