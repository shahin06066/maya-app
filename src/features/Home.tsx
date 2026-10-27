import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Building2,
  CreditCard,
  Eye,
  EyeOff,
  Plus,
  QrCode as QrCodeIcon,
  ReceiptText,
  Send,
  Smartphone,
  Sparkles,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { MayaLogo } from "../components/brand";
import { RoundButton, SectionHeader, TransactionRow } from "../components/ui";
import { money } from "../lib/format";
import { useMaya } from "../lib/store";
import { cn } from "../utils/cn";

interface QuickAction {
  label: string;
  icon: LucideIcon;
  tone: string;
  onClick: () => void;
}

export function HomeScreen() {
  const {
    walletBalance,
    savingsBalance,
    totalBalance,
    balanceHidden,
    toggleBalance,
    transactions,
    openSheet,
    setTab,
    notify,
  } = useMaya();

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateLabel = now
    .toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" })
    .toUpperCase();

  const actions: QuickAction[] = [
    { label: "Send", icon: Send, tone: "bg-[#E5F89A] text-ink", onClick: () => openSheet("send") },
    { label: "Bank transfer", icon: Building2, tone: "bg-[#E0F0FE] text-[#23618F]", onClick: () => openSheet("send") },
    { label: "Pay bills", icon: ReceiptText, tone: "bg-[#FFE9D8] text-[#A25227]", onClick: () => openSheet("pay") },
    { label: "Buy load", icon: Smartphone, tone: "bg-[#EEE6FD] text-[#6D4B9C]", onClick: () => openSheet("load") },
    { label: "QR pay", icon: QrCodeIcon, tone: "bg-ink text-lime", onClick: () => openSheet("qr") },
    { label: "Cash in", icon: Plus, tone: "bg-[#DDF5E7] text-[#087A4A]", onClick: () => openSheet("add", { target: "wallet" }) },
    { label: "Savings", icon: Sprout, tone: "bg-[#FFF2C7] text-[#856310]", onClick: () => setTab("savings") },
    { label: "Maya Card", icon: CreditCard, tone: "bg-[#F4E8E8] text-[#874A4A]", onClick: () => setTab("cards") },
  ];

  return (
    <div className="pb-5">
      <header className="flex items-center justify-between px-5 pb-1 pt-2">
        <MayaLogo compact />
        <div className="flex items-center gap-2">
          <RoundButton label="Notifications" onClick={() => openSheet("notifications")}>
            <Bell size={17} strokeWidth={2} />
            <span className="absolute right-[9px] top-[9px] h-[6px] w-[6px] rounded-full border border-white bg-brand" />
          </RoundButton>
          <button
            type="button"
            onClick={() => setTab("profile")}
            aria-label="Open profile"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#E5F3D6] text-[11px] font-extrabold text-ink shadow-[inset_0_0_0_1px_rgba(10,31,22,0.05)] transition-transform active:scale-95"
          >
            MS
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-paper bg-brand" />
          </button>
        </div>
      </header>

      <div className="px-5 pb-4 pt-3">
        <p className="text-[8.5px] font-bold uppercase tracking-[0.17em] text-muted">{dateLabel}</p>
        <h1 className="mt-1 text-[23px] font-extrabold leading-tight tracking-[-0.045em] text-ink">
          {greeting}, Mia <span className="inline-block text-[19px]">✦</span>
        </h1>
      </div>

      <section className="px-5" aria-label="Account balance">
        <div className="relative isolate overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#164730_0%,#09251A_55%,#0D3726_100%)] px-4 pb-4 pt-4 text-white shadow-[0_20px_35px_-18px_rgba(9,37,26,0.65)]">
          <div className="balance-noise pointer-events-none absolute inset-0 -z-0" />
          <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full border border-lime/15" />
          <div className="pointer-events-none absolute -right-3 -top-10 h-32 w-32 rounded-full bg-lime/[0.06]" />
          <div className="pointer-events-none absolute bottom-8 right-7 h-2 w-2 rounded-full bg-lime/70" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-white/55">
                  Total balance
                </span>
                <span className="h-1 w-1 rounded-full bg-lime/70" />
              </div>
              <button
                type="button"
                onClick={toggleBalance}
                aria-label={balanceHidden ? "Show balance" : "Hide balance"}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.08] text-white/70 transition-colors hover:bg-white/[0.15]"
              >
                {balanceHidden ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <p
              className="mt-2 flex items-baseline text-[31px] font-extrabold leading-none tracking-[-0.055em]"
              aria-live="polite"
            >
              {money(totalBalance, balanceHidden)}
              <span className="ml-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white/35">PHP</span>
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.055] px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-[5px] w-[5px] rounded-full bg-lime" />
                  <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/45">Maya Wallet</p>
                </div>
                <p className="mt-1 text-[12px] font-bold tracking-[-0.02em] text-white/95">
                  {money(walletBalance, balanceHidden)}
                </p>
              </div>
              <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.055] px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#8CE4B2]" />
                  <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/45">Maya Savings</p>
                </div>
                <p className="mt-1 text-[12px] font-bold tracking-[-0.02em] text-white/95">
                  {money(savingsBalance, balanceHidden)}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => openSheet("add", { target: "wallet" })}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-lime px-3.5 text-[10.5px] font-extrabold text-ink transition-transform active:scale-[0.98]"
              >
                <Plus size={13} strokeWidth={2.8} /> Add money
              </button>
              <button
                type="button"
                onClick={() => openSheet("qr")}
                aria-label="Show my QR code"
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.08] px-3 text-[10.5px] font-bold text-white/85 transition-colors hover:bg-white/[0.14]"
              >
                <QrCodeIcon size={13} strokeWidth={2.1} /> My QR
              </button>
              <span className="ml-auto flex items-center gap-1 text-[7.5px] font-semibold tracking-wide text-white/30">
                <span className="h-1 w-1 rounded-full bg-lime/70" /> Live
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 px-5" aria-label="Quick actions">
        <div className="grid grid-cols-4 gap-x-2 gap-y-3.5 rounded-[24px] border border-black/[0.045] bg-white px-2.5 py-4 shadow-[0_10px_30px_-24px_rgba(10,31,22,0.4)]">
          {actions.map(({ label, icon: Icon, tone, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="group flex min-w-0 flex-col items-center gap-1.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span
                className={cn(
                  "flex h-[46px] w-[46px] items-center justify-center rounded-[16px] transition-transform duration-200 group-hover:-translate-y-0.5 group-active:scale-95",
                  tone,
                )}
              >
                <Icon size={19} strokeWidth={2} />
              </span>
              <span className="max-w-full truncate text-[9.5px] font-semibold tracking-[-0.015em] text-[#4C5B52]">
                {label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4 px-5">
        <button
          type="button"
          onClick={() => setTab("savings")}
          className="group relative w-full overflow-hidden rounded-[23px] bg-[linear-gradient(112deg,#E9F8B3_0%,#D2F68E_52%,#C6F17D_100%)] p-3.5 text-left"
        >
          <div className="pointer-events-none absolute -right-7 -top-8 h-32 w-32 rounded-full border-[16px] border-white/20" />
          <div className="pointer-events-none absolute -bottom-10 right-14 h-20 w-20 rounded-full border border-ink/10" />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <div className="mb-1.5 flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#496214]" />
                <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-[#496214]">Maya Savings</p>
              </div>
              <h2 className="max-w-[200px] text-[16px] font-extrabold leading-[1.2] tracking-[-0.035em] text-ink">
                Grow your money at 4.5% p.a.
              </h2>
              <span className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-extrabold text-ink">
                Start saving <ArrowRight size={12} strokeWidth={2.5} />
              </span>
            </div>
            <div className="relative flex h-[58px] w-[58px] shrink-0 flex-col items-center justify-center rounded-full bg-ink text-lime shadow-lg">
              <span className="text-[17px] font-extrabold leading-none tracking-[-0.05em]">4.5%</span>
              <span className="mt-1 text-[7px] font-semibold uppercase tracking-[0.12em] text-white/50">per annum</span>
              <span className="absolute -right-1 top-0 h-3.5 w-3.5 rounded-full border-2 border-[#CDF37C] bg-white" />
            </div>
          </div>
        </button>
      </section>

      <section className="mt-2.5 px-5">
        <button
          type="button"
          onClick={() => openSheet("info", { topic: "credit" })}
          className="flex w-full items-center gap-3 rounded-[19px] border border-black/[0.045] bg-white px-3.5 py-2.5 text-left shadow-[0_8px_24px_-22px_rgba(10,31,22,0.5)] transition-transform active:scale-[0.995]"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#EDF7E3] text-brand-dark">
            <CreditCard size={17} strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11.5px] font-bold tracking-[-0.02em] text-ink">Maya Credit</span>
            <span className="mt-0.5 block text-[9.5px] font-medium text-muted">₱15,000 is ready for you</span>
          </span>
          <span className="rounded-full bg-[#EDF7E3] px-2 py-1 text-[7.5px] font-extrabold uppercase tracking-[0.08em] text-brand-dark">
            pre-approved
          </span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>
      </section>

      <section className="mt-4 px-5">
        <SectionHeader
          title="Recent activity"
          action="See all"
          onAction={() => openSheet("activity")}
          className="mb-1.5"
        />
        <div className="divide-y divide-line/65 rounded-[22px] border border-black/[0.04] bg-white px-3.5 py-0.5 shadow-[0_10px_30px_-26px_rgba(10,31,22,0.45)]">
          {transactions.slice(0, 3).map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              hidden={balanceHidden}
              onClick={() => openSheet("transaction", { transaction })}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => notify("You're all caught up ✦")}
          className="mx-auto mt-4 flex items-center gap-2 text-[9px] font-semibold text-muted/80"
        >
          <span className="h-1 w-1 rounded-full bg-brand" />
          Your money is safe with Maya
          <span className="h-1 w-1 rounded-full bg-brand" />
        </button>
      </section>
    </div>
  );
}
