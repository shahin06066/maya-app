import type { ReactNode } from "react";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  BatteryFull,
  CarFront,
  Check,
  ChevronRight,
  CreditCard,
  Droplets,
  Landmark,
  Play,
  ReceiptText,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Utensils,
  WalletCards,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../utils/cn";
import type { Biller, Tone, Transaction, TransactionCategory } from "../lib/data";
import { money } from "../lib/format";
import { useMaya } from "../lib/store";

export const toneStyles: Record<Tone, { bg: string; text: string; ring: string }> = {
  mint: { bg: "bg-[#DDF5E6]", text: "text-[#0B7147]", ring: "ring-[#BCE8CD]" },
  peach: { bg: "bg-[#FFE8D8]", text: "text-[#A35228]", ring: "ring-[#F5D4BE]" },
  sky: { bg: "bg-[#DFEEFF]", text: "text-[#235B91]", ring: "ring-[#C7DFF7]" },
  lilac: { bg: "bg-[#EDE4FF]", text: "text-[#69469B]", ring: "ring-[#DCCCF6]" },
  butter: { bg: "bg-[#FFF1C8]", text: "text-[#886313]", ring: "ring-[#F5E2A8]" },
  rose: { bg: "bg-[#FFE3EA]", text: "text-[#9D3552]", ring: "ring-[#F7CEDA]" },
};

export function Avatar({
  initials,
  tone = "mint",
  className,
  online = false,
}: {
  initials: string;
  tone?: Tone;
  className?: string;
  online?: boolean;
}) {
  const styles = toneStyles[tone];
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full font-bold tracking-[-0.02em]",
          styles.bg,
          styles.text,
          className ?? "h-10 w-10 text-[11px]",
        )}
      >
        {initials}
      </span>
      {online && (
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-brand" />
      )}
    </span>
  );
}

const categoryStyles: Record<
  TransactionCategory,
  { icon: LucideIcon; bg: string; text: string }
> = {
  food: { icon: Utensils, bg: "bg-[#FFF0E3]", text: "text-[#B4602D]" },
  transfer: { icon: ArrowUpRight, bg: "bg-[#E2F5EA]", text: "text-[#0B7E4E]" },
  bills: { icon: ReceiptText, bg: "bg-[#E8EDFF]", text: "text-[#4A5FAE]" },
  shopping: { icon: ShoppingBag, bg: "bg-[#FCE7F1]", text: "text-[#A63B6C]" },
  income: { icon: ArrowDownLeft, bg: "bg-[#E5F7D4]", text: "text-[#547E1B]" },
  entertainment: { icon: Play, bg: "bg-[#FFE6E4]", text: "text-[#B7443C]" },
  topup: { icon: WalletCards, bg: "bg-[#E4F3FC]", text: "text-[#267195]" },
  cashback: { icon: Sparkles, bg: "bg-[#FFF2C9]", text: "text-[#9A6E0A]" },
  transport: { icon: CarFront, bg: "bg-[#EEF0EA]", text: "text-[#49584F]" },
};

const billerIcons = {
  electric: Zap,
  water: Droplets,
  mobile: Smartphone,
  internet: Wifi,
  streaming: Play,
  government: Landmark,
  loan: BadgeDollarSign,
  card: CreditCard,
} satisfies Record<Biller["icon"], LucideIcon>;

export function BillerMark({ biller, className }: { biller: Biller; className?: string }) {
  const Icon = billerIcons[biller.icon];
  const tone = toneStyles[biller.tone];
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px]",
        tone.bg,
        tone.text,
        className,
      )}
    >
      <Icon size={18} strokeWidth={2} />
    </span>
  );
}

export function TransactionIcon({ category, className }: { category: TransactionCategory; className?: string }) {
  const style = categoryStyles[category];
  const Icon = style.icon;
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px]",
        style.bg,
        style.text,
        className,
      )}
    >
      <Icon size={18} strokeWidth={2} />
    </span>
  );
}

export function TransactionRow({
  transaction,
  onClick,
  hidden = false,
  compact = false,
}: {
  transaction: Transaction;
  onClick?: () => void;
  hidden?: boolean;
  compact?: boolean;
}) {
  const isIn = transaction.direction === "in";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 text-left transition-colors",
        compact ? "py-2.5" : "py-3",
        onClick ? "hover:bg-black/[0.018] active:opacity-70" : "cursor-default",
      )}
    >
      <TransactionIcon category={transaction.category} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold tracking-[-0.01em] text-ink">
          {transaction.title}
        </span>
        <span className="mt-0.5 block truncate text-[10.5px] font-medium text-muted">{transaction.meta}</span>
      </span>
      <span className="shrink-0 text-right">
        <span
          className={cn(
            "block text-[12.5px] font-bold tracking-[-0.02em]",
            isIn ? "text-brand-dark" : "text-ink",
          )}
        >
          {isIn ? "+" : "−"}
          {money(transaction.amount, hidden)}
        </span>
        <span className="mt-0.5 block text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted/70">
          {isIn ? "Received" : "Paid"}
        </span>
      </span>
    </button>
  );
}

export function SectionHeader({
  title,
  action,
  onAction,
  className,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <h2 className="text-[15px] font-bold tracking-[-0.025em] text-ink">{title}</h2>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-0.5 text-[11px] font-bold text-brand-dark transition-opacity hover:opacity-70"
        >
          {action}
          <ChevronRight size={14} strokeWidth={2.4} />
        </button>
      )}
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-[25px] w-[44px] shrink-0 rounded-full transition-colors duration-200",
        checked ? "bg-brand" : "bg-[#DBDFD8]",
      )}
    >
      <span
        className={cn(
          "absolute top-[3px] h-[19px] w-[19px] rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-[22px]" : "translate-x-[3px]",
        )}
      />
    </button>
  );
}

export function ScreenHeader({
  eyebrow,
  title,
  subtitle,
  action,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="px-5 pb-3 pt-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-1 text-[9.5px] font-bold uppercase tracking-[0.16em] text-brand-dark">{eyebrow}</p>
          )}
          <h1 className="text-[25px] font-extrabold leading-tight tracking-[-0.045em] text-ink">{title}</h1>
          {subtitle && <p className="mt-1 text-[11.5px] font-medium leading-relaxed text-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </header>
  );
}

export function RoundButton({
  children,
  label,
  onClick,
  className,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/90 bg-white text-ink shadow-[0_1px_2px_rgba(10,31,22,0.03)] transition-transform active:scale-95",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function StatusBar() {
  return (
    <div className="relative z-20 flex h-9 shrink-0 items-end justify-between px-6 pb-1 text-ink">
      <span className="text-[11px] font-extrabold tracking-[-0.02em]">9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="flex items-end gap-[2px]" aria-hidden="true">
          <span className="h-[5px] w-[3px] rounded-[1px] bg-ink" />
          <span className="h-[7px] w-[3px] rounded-[1px] bg-ink" />
          <span className="h-[9px] w-[3px] rounded-[1px] bg-ink" />
          <span className="h-[11px] w-[3px] rounded-[1px] bg-ink/30" />
        </span>
        <Wifi size={13} strokeWidth={2.6} />
        <BatteryFull size={17} strokeWidth={1.8} />
      </div>
    </div>
  );
}

export function Toast() {
  const { toast, sheet } = useMaya();
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      role="status"
      className={cn(
        "animate-toast pointer-events-none absolute left-4 right-4 z-[90] flex items-center gap-2.5 rounded-2xl bg-ink px-4 py-3 text-white shadow-[0_16px_34px_rgba(6,27,18,0.3)]",
        sheet ? "top-[50px]" : "bottom-[98px]",
      )}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
        <Check size={11} strokeWidth={3.2} />
      </span>
      <p className="text-[11.5px] font-semibold leading-snug">{toast.message}</p>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDF5E8] text-brand-dark">
        <Icon size={21} />
      </span>
      <p className="text-[13px] font-bold text-ink">{title}</p>
      <p className="mt-1 max-w-[230px] text-[11px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function ArrowHint() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-sm">
      <ArrowRight size={14} strokeWidth={2.4} />
    </span>
  );
}
