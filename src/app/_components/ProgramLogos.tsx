import Image from "next/image";
import type { CSSProperties } from "react";

/*
 * "Startup parte de" strip: startup programs Bengala belongs to.
 * Logos keep their brand colors. The dark tone uses variants whose black
 * and grey lettering is turned white so it stays legible on ink.
 */

const programs = [
  {
    name: "Google for Startups",
    src: "/logos/google-for-startups.png",
    srcDark: "/logos/google-for-startups-on-dark.png",
    width: 316,
    height: 42,
    size: "h-[17px] md:h-[19px]",
  },
  {
    name: "NVIDIA Inception Program",
    src: "/logos/nvidia-inception-program.png",
    srcDark: "/logos/nvidia-inception-program-on-dark.png",
    width: 747,
    height: 264,
    size: "h-[30px] md:h-[34px]",
  },
];

export default function ProgramLogos({
  tone = "light",
  align = "center",
  className = "",
  style,
}: {
  tone?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
  style?: CSSProperties;
}) {
  const light = tone === "light";
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center" : "items-start"} ${className}`} style={style}>
      <span
        className={`text-[10px] md:text-[11px] font-mono uppercase tracking-[0.28em] ${
          light ? "text-foreground/45" : "text-background/40"
        }`}
      >
        Startup parte de
      </span>
      <ul className="flex items-center gap-5 md:gap-7">
        {programs.map((p, i) => (
          <li key={p.name} className="flex items-center gap-5 md:gap-7">
            {i > 0 && (
              <span aria-hidden="true" className={`h-6 w-px ${light ? "bg-foreground/15" : "bg-background/15"}`} />
            )}
            <Image
              src={light ? p.src : p.srcDark}
              alt={p.name}
              width={p.width}
              height={p.height}
              className={`${p.size} w-auto`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
