/**
 * The die-cuts every paper edge on the site is clipped to.
 *
 * They are SVG rather than `clip-path: polygon()` because a real envelope has
 * no straight edges: the flap's sides bow outward and its point is rounded,
 * and the pocket's mouth sags in the middle the way a folded sheet does. A
 * polygon can only ever give a stiff, ruled V.
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
        {/* The flap: a V whose sides bow outward and whose point is rounded
            off, the way a die-cut wedding flap is. */}
        <clipPath id="env-flap" clipPathUnits="objectBoundingBox">
          <path
            d="M 0 0 L 1 0 L 1 0.11
               C 0.93 0.40, 0.72 0.66, 0.55 0.88
               C 0.525 0.925, 0.475 0.925, 0.45 0.88
               C 0.28 0.66, 0.07 0.40, 0 0.11 Z"
          />
        </clipPath>

        {/* The pocket's mouth: everything BELOW a V that dips to a soft point
            at the centre. The card behind is read through the gap above it, so
            its lower corners stay tucked in and only its middle comes down to
            the point — which is what makes it look inserted rather than
            propped in front. The shoulders sit high, level with where the
            flap's own edge meets the sides: any lower and a wedge of bare back
            panel shows through at each top corner. */}
        <clipPath id="env-mouth" clipPathUnits="objectBoundingBox">
          <path
            d="M 0 0.08
               C 0.16 0.28, 0.34 0.46, 0.455 0.60
               C 0.483 0.625, 0.517 0.625, 0.545 0.60
               C 0.666 0.46, 0.84 0.28, 1 0.08
               L 1 1 L 0 1 Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
