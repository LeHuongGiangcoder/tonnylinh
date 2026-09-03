import Image from "next/image";

/**
 * A seam takes up no vertical space: the two sections meet directly and the
 * ornament is centred on the line between them.
 */

/** Lace — masked to gold so it reads on the red side and the cream side. */
export function LaceSeam() {
  return (
    <div className="seam seam--lace" aria-hidden="true">
      <div className="seam__art" />
    </div>
  );
}

/** The red silk ribbon, laid across the join to hide it. */
export function RibbonSeam({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`seam seam--ribbon ${flip ? "seam--ribbon-flip" : ""}`.trim()}
      aria-hidden="true"
    >
      <div className="seam__art">
        <Image src="/img/ribbon.webp" alt="" width={1200} height={393} />
      </div>
    </div>
  );
}

/** A hairline gold rule with a centred diamond. */
export function Rule({ className = "" }: { className?: string }) {
  return (
    <div className={`rule ${className}`.trim()} aria-hidden="true">
      <span className="rule__mark" />
    </div>
  );
}
