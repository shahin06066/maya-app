import { CreditCard, House, PiggyBank, ScanLine, UserRound, type LucideIcon } from "lucide-react";
import { cn } from "../utils/cn";
import type { Tab } from "../lib/data";
import { useMaya } from "../lib/store";

const items: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: House },
  { id: "pay", label: "Pay", icon: ScanLine },
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "savings", label: "Savings", icon: PiggyBank },
  { id: "profile", label: "Profile", icon: UserRound },
];

export function BottomNav() {
  const { tab, setTab } = useMaya();

  return (
    <nav
      aria-label="Main navigation"
      className="relative z-30 shrink-0 border-t border-line/90 bg-white/95 px-2 pt-2 backdrop-blur-xl"
      style={{ paddingBottom: "max(7px, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-5">
        {items.map(({ id, label, icon: Icon }) => {
          const active = id === tab;
          return (
            <button
              key={id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => setTab(id)}
              className="group flex flex-col items-center gap-1 rounded-xl py-0.5"
            >
              <span
                className={cn(
                  "relative flex h-7 w-12 items-center justify-center rounded-full transition-all duration-200",
                  active ? "bg-[#EAF7E7] text-brand-dark" : "text-[#92A097] group-hover:text-ink",
                )}
              >
                <Icon size={18} strokeWidth={active ? 2.35 : 1.9} />
                {active && (
                  <span className="absolute -right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-brand ring-2 ring-white" />
                )}
              </span>
              <span
                className={cn(
                  "text-[9px] font-semibold tracking-[-0.01em] transition-colors",
                  active ? "text-ink" : "text-[#92A097]",
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mx-auto mt-1 hidden h-[3px] w-24 rounded-full bg-ink/15 md:block" />
    </nav>
  );
}
