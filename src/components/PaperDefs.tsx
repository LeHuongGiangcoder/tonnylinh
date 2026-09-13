/**
 * The die-cuts every paper edge on the site is clipped to.
 *
 * They are SVG rather than `clip-path: polygon()` because paper edges are not
 * quite straight — but only just. A real envelope flap is a pair of near-
 * straight diagonals meeting at a sharp point; bow them and it stops reading as
 * folded paper and starts reading as a swag of cloth.
 *
 * Coordinates are `objectBoundingBox` — 0…1 fractions of whatever element
 * references them — so one definition fits the intro's envelope and the hero's
 * at once, at any size. Rendered once, from the page root.
 */
export function PaperDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* The envelope is cut the classic way: four flaps whose creases all
            run from the exact corners towards the centre, so every corner is
            the same mitre. Only the tips are softened, over the last few
            percent — the creases themselves are straight.

            Heights, in fractions of the ENVELOPE:
              0.50  where the side flaps meet — the bottom of the mouth
              0.58  the bottom flap's tip, just under the mouth so it never
                    pokes into the opening
              0.64  the top flap's tip, lapping over both of them */}

        {/* The top flap. Its box is 66% of the envelope's height, so the tip at
            97% of the box lands at 0.64. */}
        <clipPath id="env-flap" clipPathUnits="objectBoundingBox">
          <path
            d="M 0 0 L 1 0
               L 0.535 0.93
               Q 0.5 0.99, 0.465 0.93 Z"
          />
        </clipPath>

        {/* The two side flaps, as one shape: everything below the V the mouth
            makes from the top corners to the centre. The card is read through
            the triangle above it. */}
        <clipPath id="env-mouth" clipPathUnits="objectBoundingBox">
          <path
            d="M 0 0
               L 0.47 0.475
               Q 0.5 0.505, 0.53 0.475
               L 1 0 L 1 1 L 0 1 Z"
          />
        </clipPath>

        {/* The right side flap alone, for its own shade: light comes from the
            upper left, so this face is turned away from it. */}
        <clipPath id="env-side-right" clipPathUnits="objectBoundingBox">
          <path d="M 1 0 L 0.5 0.5 L 0.5 1 L 1 1 Z" />
        </clipPath>

        {/* The bottom flap, folded up over the sides from the bottom corners. */}
        <clipPath id="env-fold" clipPathUnits="objectBoundingBox">
          <path
            d="M 0 1
               L 0.465 0.6
               Q 0.5 0.57, 0.535 0.6
               L 1 1 Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
