import {
  ArrowUpRight,
  Eye,
  EyeOff,
  Globe2,
  HelpCircle,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  Wifi,
} from "lucide-react";
import { CardVisual } from "../components/CardVisual";
import { RoundButton, ScreenHeader, SectionHeader, Toggle, TransactionRow } from "../components/ui";
import { useMaya } from "../lib/store";
import { cn } from "../utils/cn";

export function CardsScreen() {
  const {
    frozen,
    toggleFrozen,
    cardRevealed,
    toggleCardDetails,
    onlinePayments,
    setOnlinePayments,
    contactless,
    setContactless,
    openSheet,
    transactions,
    notify,
  } = useMaya();

  const cardTransactions = transactions
    .filter((transaction) => ["food", "entertainment", "shopping"].includes(transaction.category))
    .slice(0, 3);

  return (
    <div className="pb-5">
      <ScreenHeader
        eyebrow="Maya Card"
        title="Tap. Shop. Go."
        action={
          <RoundButton label="Card help" onClick={() => openSheet("info", { topic: "help" })}>
            <HelpCircle size={18} strokeWidth={2} />
          </RoundButton>
        }
      />

      <section className="px-5">
        <CardVisual className="w-full" />
        <div className="mt-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "relative flex h-2 w-2",
                frozen ? "text-[#A3ADA6]" : "text-brand",
              )}
            >
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full opacity-60",
                  frozen ? "bg-[#A3ADA6]" : "animate-ping bg-brand",
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  frozen ? "bg-[#A3ADA6]" : "bg-brand",
                )}
              />
            </span>
            <p className="text-[10px] font-bold text-ink">{frozen ? "Card frozen" : "Card is active"}</p>
            <span className="text-[9px] text-muted">• Maya Debit</span>
          </div>
          <p className="font-mono text-[9px] font-semibold tracking-[0.09em] text-muted">•• 4827</p>
        </div>
      </section>

      <section className="mt-4 px-5">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={toggleCardDetails}
            className="flex flex-col items-start gap-2 rounded-[18px] border border-black/[0.045] bg-white p-3 text-left shadow-[0_8px_22px_-24px_rgba(10,31,22,0.5)] transition-colors hover:bg-[#F8FAF4]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#EAF6E3] text-brand-dark">
              {cardRevealed ? <EyeOff size={15} /> : <Eye size={15} />}
            </span>
            <span>
              <span className="block text-[9.5px] font-bold text-ink">{cardRevealed ? "Hide" : "Show"} details</span>
              <span className="mt-0.5 block text-[7.5px] font-medium text-muted">Number & expiry</span>
            </span>
          </button>
          <button
            type="button"
            onClick={toggleFrozen}
            className="flex flex-col items-start gap-2 rounded-[18px] border border-black/[0.045] bg-white p-3 text-left shadow-[0_8px_22px_-24px_rgba(10,31,22,0.5)] transition-colors hover:bg-[#F8FAF4]"
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-[10px]",
                frozen ? "bg-ink text-lime" : "bg-[#EAF2FA] text-[#2E6991]",
              )}
            >
              <Snowflake size={15} />
            </span>
            <span>
              <span className="block text-[9.5px] font-bold text-ink">{frozen ? "Unfreeze" : "Freeze"}</span>
              <span className="mt-0.5 block text-[7.5px] font-medium text-muted">Pause spending</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => openSheet("info", { topic: "limits" })}
            className="flex flex-col items-start gap-2 rounded-[18px] border border-black/[0.045] bg-white p-3 text-left shadow-[0_8px_22px_-24px_rgba(10,31,22,0.5)] transition-colors hover:bg-[#F8FAF4]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FFF0D9] text-[#9A6726]">
              <SlidersHorizontal size={15} />
            </span>
            <span>
              <span className="block text-[9.5px] font-bold text-ink">Limits</span>
              <span className="mt-0.5 block text-[7.5px] font-medium text-muted">Spending rules</span>
            </span>
          </button>
        </div>
      </section>

      <section className="mt-5 px-5">
        <SectionHeader title="Card controls" className="mb-2" />
        <div className="divide-y divide-line/70 rounded-[22px] border border-black/[0.045] bg-white px-3.5">
          <div className="flex items-center gap-3 py-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#EAF6E3] text-brand-dark">
              <Globe2 size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-bold tracking-[-0.015em] text-ink">Online payments</p>
              <p className="mt-0.5 text-[9px] font-medium text-muted">Use for websites and apps</p>
            </div>
            <Toggle
              checked={onlinePayments}
              onChange={(value) => {
                setOnlinePayments(value);
                notify(value ? "Online payments enabled" : "Online payments paused");
              }}
              label="Online payments"
            />
          </div>
          <div className="flex items-center gap-3 py-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#EAF2FA] text-[#2E6991]">
              <Wifi size={16} className="rotate-90" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-bold tracking-[-0.015em] text-ink">Contactless payments</p>
              <p className="mt-0.5 text-[9px] font-medium text-muted">Tap to pay in stores</p>
            </div>
            <Toggle
              checked={contactless}
              onChange={(value) => {
                setContactless(value);
                notify(value ? "Contactless payments enabled" : "Contactless payments disabled");
              }}
              label="Contactless payments"
            />
          </div>
        </div>
      </section>

      <section className="mt-3 px-5">
        <button
          type="button"
          onClick={() => openSheet("info", { topic: "credit" })}
          className="flex w-full items-center gap-3 rounded-[18px] border border-[#DCEACF] bg-[#F1F8E8] px-3.5 py-3 text-left"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-lime">
            <Sparkles size={14} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-extrabold text-ink">Earn 1% cashback, every time</span>
            <span className="mt-0.5 block text-[8.5px] font-medium text-[#677B5C]">
              ₱1,248.50 earned this year
            </span>
          </span>
          <ArrowUpRight size={14} className="text-[#617556]" />
        </button>
      </section>

      <section className="mt-5 px-5">
        <SectionHeader
          title="Card activity"
          action="See all"
          onAction={() => openSheet("activity")}
          className="mb-1.5"
        />
        <div className="divide-y divide-line/65 rounded-[22px] border border-black/[0.045] bg-white px-3.5 py-1">
          {cardTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onClick={() => openSheet("transaction", { transaction })}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
