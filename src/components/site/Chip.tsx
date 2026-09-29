import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3 py-2 text-[11px] tracking-[0.12em] uppercase transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary",
      )}
    >
      {children}
    </button>
  );
}
