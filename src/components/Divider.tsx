/** A hairline gold rule with a centred diamond. */
export function Rule({ className = "" }: { className?: string }) {
  return (
    <div className={`rule ${className}`.trim()} aria-hidden="true">
      <span className="rule__mark" />
    </div>
  );
}
