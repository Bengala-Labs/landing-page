/*
 * Brand glyphs built on the logomark's square grammar.
 * Pattern rows: R = red, G = gold, I = ink (currentColor), . = empty.
 */

const fills: Record<string, string> = { R: "#EF3333", G: "#FCB641", I: "currentColor" };

export function BlockGlyph({ pattern, className = "" }: { pattern: string[]; className?: string }) {
  const n = Math.max(pattern.length, ...pattern.map((r) => r.length));
  return (
    <svg viewBox={`0 0 ${n * 10} ${n * 10}`} className={className} aria-hidden="true">
      {pattern.flatMap((row, y) =>
        row.split("").map((ch, x) =>
          ch === "." ? null : (
            <rect key={`${x}-${y}`} x={x * 10 + 0.5} y={y * 10 + 0.5} width={9} height={9} fill={fills[ch]} />
          )
        )
      )}
    </svg>
  );
}

/* Klearly mark: a K drawn in blocks, its arms resolving from noise (red) to clarity (gold). */
export const KLEARLY_MARK = ["I...R", "I..R.", "III..", "I..G.", "I...G"];

export function KlearlyMark({ className = "" }: { className?: string }) {
  return <BlockGlyph pattern={KLEARLY_MARK} className={className} />;
}
