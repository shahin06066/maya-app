import { ArrowUpRight, Eye, EyeOff, Plus, ShieldCheck, Sprout, TrendingUp } from "lucide-react";
import { RoundButton, ScreenHeader, SectionHeader } from "../components/ui";
import { money, peso } from "../lib/format";
import { useMaya } from "../lib/store";

export function SavingsScreen() {
  const {
    savingsBalance,
    balanceHidden,
    toggleBalance,
    goals,
    openSheet,
    notify,
  } = useMaya();

  return (
    <div className="pb-5">
      <ScreenHeader
        eyebrow="Maya Savings"
        title="Small steps, bigger tomorrows."
        action={
          <RoundButton label="Create a savings goal" onClick={() => openSheet("goal")}>
            <Plus size={18} strokeWidth={2.2} />
          </RoundButton>
        }
      />

      <section className="px-5">
        <div className="relative isolate overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#E1FAA4_0%,#C8F274_55%,#BCEB63_100%)] p-4 text-ink shadow-[0_20px_36px_-26px_rgba(90,128,37,0.6)]">
          <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full border-[18px] border-white/25" />
          <div className="pointer-events-none absolute -bottom-16 right-16 h-32 w-32 rounded-full border border-ink/10" />
          <div className="pointer-events-none absolute right-4 top-16 h-2 w-2 rounded-full bg-ink/60" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <p className="text-[8.5px] font-extrabold uppercase tracking-[0.15em] text-[#4E661B]">
                  Total savings
                </p>
                <span className="rounded-full bg-white/40 px-1.5 py-0.5 text-[7px] font-extrabold text-[#496014]">
                  4.5% p.a.
                </span>
              </div>
              <button
                type="button"
                onClick={toggleBalance}
                aria-label={balanceHidden ? "Show savings balance" : "Hide savings balance"}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/35 text-ink/60 transition-colors hover:bg-white/50"
              >
                {balanceHidden ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <p className="mt-3 text-[34px] font-extrabold leading-none tracking-[-0.055em]">
              {money(savingsBalance, balanceHidden)}
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-ink/[0.08] px-2 py-1 text-[8px] font-bold text-[#3F5812]">
                <TrendingUp size={10} /> Interest paid monthly
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/35 px-2 py-1 text-[8px] font-bold text-[#3F5812]">
                <ShieldCheck size={10} /> PDIC insured
              </span>
            </div>

            <div className="mt-4 flex items-end justify-between gap-3">
              <button
                type="button"
                onClick={() => openSheet("add", { target: "savings" })}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[10.5px] font-extrabold text-lime transition-transform active:scale-[0.98]"
              >
                <Plus size={14} strokeWidth={2.6} /> Add to savings
              </button>
              <div className="text-right">
                <p className="text-[7.5px] font-semibold uppercase tracking-[0.1em] text-[#516A20]">Earned so far</p>
                <p className="mt-0.5 text-[11px] font-extrabold">+₱1,218.30</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-3 px-5">
        <div className="grid grid-cols-3 rounded-[18px] border border-black/[0.045] bg-white px-2 py-3">
          {[
            { value: "4.5%", label: "Interest p.a." },
            { value: "₱0", label: "Minimum" },
            { value: "₱1M", label: "PDIC cover" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={index < 2 ? "border-r border-line text-center" : "text-center"}
            >
              <p className="text-[13px] font-extrabold tracking-[-0.03em] text-ink">{item.value}</p>
              <p className="mt-0.5 text-[8px] font-semibold text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 px-5">
        <SectionHeader
          title="Your goals"
          action="New goal"
          onAction={() => openSheet("goal")}
          className="mb-2"
        />
        <div className="space-y-2.5">
          {goals.map((goal) => {
            const progress = Math.min(100, Math.round((goal.saved / goal.target) * 100));
            return (
              <div
                key={goal.id}
                className="rounded-[20px] border border-black/[0.045] bg-white p-3.5 shadow-[0_8px_24px_-26px_rgba(10,31,22,0.45)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#F2F7E9] text-[20px]">
                    {goal.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[11.5px] font-bold tracking-[-0.015em] text-ink">{goal.name}</p>
                      <span className="ml-auto shrink-0 text-[9px] font-extrabold text-brand-dark">{progress}%</span>
                    </div>
                    <p className="mt-0.5 text-[8.5px] font-medium text-muted">
                      {money(goal.saved, balanceHidden, 0)} of {money(goal.target, balanceHidden, 0)} · {goal.deadline}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openSheet("add", { target: "savings", goalId: goal.id })}
                    aria-label={`Add money to ${goal.name}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EDF6E4] text-brand-dark transition-transform active:scale-95"
                  >
                    <Plus size={14} strokeWidth={2.4} />
                  </button>
                </div>
                <div className="mt-2.5 h-[5px] overflow-hidden rounded-full bg-[#EEF1E9]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#0FAE6D,#82D65A)] transition-all duration-500"
                    style={{ width: `${Math.max(progress, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-5 px-5">
        <div className="relative overflow-hidden rounded-[22px] bg-[#0B2B1E] p-4 text-white">
          <div className="pointer-events-none absolute -right-7 -top-10 h-28 w-28 rounded-full border border-lime/15" />
          <div className="relative flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-lime text-ink">
              <Sprout size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-bold">Let your savings do the work</p>
              <p className="mt-1 text-[9px] font-medium leading-relaxed text-white/55">
                Interest is credited monthly. No lock-in, no minimum, no hidden fees.
              </p>
            </div>
            <ArrowUpRight size={15} className="mt-1 shrink-0 text-lime/70" />
          </div>
          <button
            type="button"
            onClick={() => notify(`At 4.5% p.a., you could earn ${peso(savingsBalance * 0.045, 0)} in a year`)}
            className="relative mt-3 h-8 w-full rounded-full border border-white/10 bg-white/[0.07] text-[9.5px] font-bold text-white/80 transition-colors hover:bg-white/[0.12]"
          >
            Estimate my interest
          </button>
        </div>
      </section>

      <p className="mx-auto mt-4 flex max-w-[290px] items-center justify-center gap-1.5 text-center text-[8px] font-medium leading-relaxed text-muted">
        <ShieldCheck size={11} className="shrink-0 text-brand-dark" />
        Deposits are insured by PDIC up to ₱1,000,000 per depositor.
      </p>
    </div>
  );
}
