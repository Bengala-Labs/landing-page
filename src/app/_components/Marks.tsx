/*
 * Brand glyphs built on the logomark's square grammar.
 * Pattern rows: G = gold, I = ink (currentColor), . = empty.
 */

const fills: Record<string, string> = { R: "currentColor", G: "#FCB641", I: "currentColor" };

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

/* Voice mark: a V drawn in blocks, resolving cleanly into gold. */
export const VOICE_MARK = ["I...I", "I...I", ".I.G.", ".I.G.", "..G.."];

export function VoiceMark({ className = "" }: { className?: string }) {
  return <BlockGlyph pattern={VOICE_MARK} className={className} />;
}

