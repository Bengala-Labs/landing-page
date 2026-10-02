"use client";

import type { ReactNode } from "react";
import { openAccessModal } from "./accessEvents";

/* Any element that opens the early-access modal. `source` is sent with the sign-up. */
export default function AccessTrigger({
  source,
  className = "",
  children,
}: {
  source: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-haspopup="dialog" onClick={() => openAccessModal(source)} className={className}>
      {children}
    </button>
  );
}
