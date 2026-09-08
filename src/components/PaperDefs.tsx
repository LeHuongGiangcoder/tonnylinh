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
        {/* The flap. Its sides run straight DOWN from the top corners before
            the diagonal starts — 14% of the flap's box, which is the 10% of
            the envelope where the mouth's own shoulders sit, so the closed
            flap covers the opening right into the corners. The control points
            then sit almost exactly on the straight line between corner and
            point — the curve pulls barely a hundredth off it — so the edge
            reads as a crease with a little life in it rather than as an arc.
            The point itself is rounded off over the last 5%. */}
        <clipPath id="env-flap" clipPathUnits="objectBoundingBox">
          <path
            d="M 0 0 L 1 0 L 1 0.14
               C 0.87 0.37, 0.67 0.66, 0.53 0.93
               C 0.515 0.975, 0.485 0.975, 0.47 0.93
               C 0.33 0.66, 0.13 0.37, 0 0.14 Z"
          />
        </clipPath>

        {/* The pocket's mouth: everything BELOW a V that dips to a soft point
            at the centre. The card behind is read through the gap above it, so
            its lower corners stay tucked in and only its middle comes down to
            the point — which is what makes it look inserted rather than
            propped in front. The shoulders sit at 10%, exactly where the
            closed flap's own sides stop running straight down — any lower and
            a wedge of bare back panel shows at each top corner; any higher and
            the card is read through a narrow triangle instead of through the
            width of the envelope. */}
        <clipPath id="env-mouth" clipPathUnits="objectBoundingBox">
          <path
            d="M 0 0.10
               C 0.16 0.30, 0.34 0.46, 0.455 0.545
               C 0.483 0.572, 0.517 0.572, 0.545 0.545
               C 0.666 0.46, 0.84 0.30, 1 0.10
               L 1 1 L 0 1 Z"
          />
        </clipPath>

        {/* The bottom flap, folded up over the pocket. Its apex sits BELOW the
            mouth's point, so it never pokes into the opening — it is only ever
            a seam across the lower half, which is the detail that stops the
            front reading as one blank sheet of paper. */}
        <clipPath id="env-fold" clipPathUnits="objectBoundingBox">
          <path
            d="M 0 0.95
               C 0.16 0.88, 0.35 0.79, 0.46 0.735
               C 0.484 0.723, 0.516 0.723, 0.54 0.735
               C 0.65 0.79, 0.84 0.88, 1 0.95
               L 1 1 L 0 1 Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
