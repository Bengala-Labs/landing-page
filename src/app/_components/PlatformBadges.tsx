import type { CSSProperties } from "react";

export function AppleIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 170" className={className} fill="currentColor" aria-hidden="true">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.74-11.64-14.1-6.1-9.58-10.83-20.35-14.19-32.32-3.36-11.97-5.04-23.23-5.04-33.79 0-14.07 3.42-25.75 10.26-35.03 6.84-9.28 15.63-13.98 26.36-14.11 5.34 0 11.3 1.48 17.89 4.43 6.6 2.95 10.96 4.49 13.09 4.49 1.83 0 6.42-1.61 13.78-4.83 7.35-3.21 13.5-4.63 18.45-4.25 13.74 1.09 24.36 6.13 31.86 15.11-12.02 7.28-17.9 17.3-17.65 30.06.26 10.25 4.15 18.81 11.67 25.68 7.52 6.87 16.47 10.74 26.85 11.61-2.43 7.42-5.46 14.73-9.08 21.94zM119.22 31.96c0-7.39 2.66-14.33 7.98-20.82 5.32-6.5 11.89-10.42 19.7-11.14.26 1.09.39 2.18.39 3.27 0 7.39-2.75 14.37-8.25 20.95-5.5 6.58-12.07 10.37-19.7 11.01-.06-1.09-.12-2.18-.12-3.27z" />
    </svg>
  );
}

export function WindowsIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M2 3h9v9H2V3zm11 0h9v9h-9V3zM2 13h9v9H2v-9zm11 0h9v9h-9v-9z" />
    </svg>
  );
}

export default function PlatformBadges({
  tone = "light",
  className = "",
  style,
}: {
  tone?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
}) {
  const light = tone === "light";
  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
        light
          ? "border-foreground/15 bg-foreground/[0.03] text-foreground/75"
          : "border-white/15 bg-white/[0.05] text-background/80"
      } ${className}`}
      style={style}
    >
      <span
        className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] ${
          light ? "text-foreground/45" : "text-background/45"
        }`}
      >
        Disponible para
      </span>
      <span
        aria-hidden="true"
        className={`h-3 w-px ${light ? "bg-foreground/15" : "bg-white/15"}`}
      />
      <span
        className={`inline-flex items-center gap-1.5 font-medium ${
          light ? "text-foreground" : "text-background"
        }`}
      >
        <AppleIcon className="w-3.5 h-3.5" />
        macOS
      </span>
      <span
        aria-hidden="true"
        className={`text-xs ${light ? "text-foreground/25" : "text-background/30"}`}
      >
        ·
      </span>
      <span
        className={`inline-flex items-center gap-1.5 font-medium ${
          light ? "text-foreground" : "text-background"
        }`}
      >
        <WindowsIcon className="w-3.5 h-3.5" />
        Windows
      </span>
    </div>
  );
}
