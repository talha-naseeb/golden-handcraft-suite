import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, label: "Choose Setting", to: "/ring-builder/setting" },
  { n: 2, label: "Choose Diamond", to: "/ring-builder/diamond" },
  { n: 3, label: "Complete Your Ring", to: "/ring-builder/complete" },
] as const;

export function BuilderSteps({ current, done = [] }: { current: 1 | 2 | 3; done?: number[] }) {
  return (
    <nav aria-label="Ring builder steps" className="border-b border-border bg-linen">
      <ol className="mx-auto grid max-w-7xl grid-cols-3 px-4 sm:px-6">
        {STEPS.map((s) => (
          <li key={s.n}>
            <Link
              to={s.to}
              className={cn(
                "flex items-center gap-3 border-b-2 py-5 text-[11px] tracking-[0.16em] uppercase transition-colors",
                current === s.n ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border font-display text-sm",
                  done.includes(s.n) ? "border-primary bg-primary text-primary-foreground" : "border-border",
                )}
              >
                {s.n}
              </span>
              <span className="hidden sm:inline">Step {s.n}: </span>
              {s.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
