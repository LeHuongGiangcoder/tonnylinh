/**
 * The couple's names: an Edwardian Script initial followed by the rest of the
 * name in Mencken — both in the same colour, so the name reads as one word.
 */
export function CoupleName({
  initial,
  rest,
  className = "",
}: {
  initial: string;
  rest: string;
  className?: string;
}) {
  return (
    <span className={`couple-name ${className}`.trim()}>
      {initial}{rest}
    </span>
  );
}

/** The joint between the two names. */
export function Conjunction() {
  return <span className="couple-name__conj">and</span>;
}
