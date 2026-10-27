import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  Download,
  FileText,
  Globe2,
  HelpCircle,
  LifeBuoy,
  LockKeyhole,
  MessageCircle,
  Search,
  SearchX,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserRound,
  Wallet,
} from "lucide-react";
import { EmptyState, TransactionIcon, TransactionRow, Toggle } from "../ui";
import { SheetField, SheetShell } from "./SheetShell";
import { notificationsData, type InfoTopic, type Transaction } from "../../lib/data";
import { money, peso } from "../../lib/format";
import { useMaya } from "../../lib/store";
import { cn } from "../../utils/cn";

export function NotificationsSheet() {
  const { closeSheet, openSheet, markAllRead, notify } = useMaya();

  return (
    <SheetShell
      title="Notifications"
      subtitle="Payments, rewards and important updates."
      onClose={closeSheet}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#7B887E]">Latest</p>
        <button
          type="button"
          onClick={markAllRead}
          className="text-[8.5px] font-bold text-brand-dark transition-opacity hover:opacity-70"
        >
          Mark all as read
        </button>
      </div>

      <div className="divide-y divide-line/70 overflow-hidden rounded-[18px] border border-line/80 bg-white px-3.5">
        {notificationsData.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openSheet("activity")}
            className="flex w-full items-start gap-2.5 py-3 text-left transition-opacity active:opacity-70"
          >
            <TransactionIcon category={item.tone} className="h-9 w-9 rounded-[12px]" />
            <span className="min-w-0 flex-1">
              <span className="flex items-start gap-1.5">
                <span className="min-w-0 flex-1 text-[10px] font-bold leading-snug text-ink">{item.title}</span>
                {item.unread && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />}
              </span>
              <span className="mt-0.5 block text-[8.5px] font-medium leading-relaxed text-muted">{item.body}</span>
              <span className="mt-1 block text-[7px] font-semibold uppercase tracking-[0.07em] text-muted/65">
                {item.time}
              </span>
            </span>
            <ChevronRight size={12} className="mt-1 shrink-0 text-[#B0BAB3]" />
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-[14px] bg-[#EEF5E7] p-3">
        <p className="text-[8.5px] font-bold text-[#50664A]">Maya sends service updates you can't turn off</p>
        <p className="mt-0.5 text-[8px] font-medium leading-relaxed text-[#7B8B74]">
          Important security and account notices are always delivered.
        </p>
      </div>

      <button
        type="button"
        onClick={() => openSheet("info", { topic: "security" })}
        className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[9.5px] font-bold text-[#56645A]"
      >
        <Bell size={12} /> Manage notifications
      </button>
      <button
        type="button"
        onClick={() => notify("All caught up ✦")}
        className="mt-2 h-7 w-full text-[8px] font-semibold text-muted"
      >
        Refresh
      </button>
    </SheetShell>
  );
}

type ActivityFilter = "all" | "in" | "out";

export function ActivitySheet() {
  const { closeSheet, transactions, openSheet, balanceHidden } = useMaya();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ActivityFilter>("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return transactions.filter((transaction) => {
      const matchesFilter =
        filter === "all" || (filter === "in" ? transaction.direction === "in" : transaction.direction === "out");
      const matchesQuery =
        !normalized ||
        transaction.title.toLowerCase().includes(normalized) ||
        transaction.meta.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [transactions, filter, query]);

  function openTransaction(transaction: Transaction) {
    openSheet("transaction", { transaction });
  }

  return (
    <SheetShell
      title="Activity"
      subtitle="Every payment, top-up and transfer in one place."
      onClose={closeSheet}
    >
      <div className="flex items-center gap-2 rounded-[14px] border border-line bg-white px-3">
        <Search size={14} className="shrink-0 text-[#8C9990]" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search transactions"
          aria-label="Search transactions"
          className="h-9 min-w-0 flex-1 bg-transparent text-[10px] font-medium text-ink outline-none placeholder:text-[#9FAAA1]"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-[8px] font-bold text-muted">
            Clear
          </button>
        )}
      </div>

      <div className="mt-3 flex gap-1.5">
        {(
          [
            { id: "all", label: "All" },
            { id: "in", label: "Money in" },
            { id: "out", label: "Money out" },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "h-7 rounded-full px-3 text-[8.5px] font-bold transition-colors",
              filter === item.id
                ? "bg-ink text-white"
                : "border border-line bg-white text-[#68766C] hover:bg-[#F4F7F0]",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-[13px] bg-[#EEF5E7] px-3 py-2">
        <p className="text-[8px] font-semibold text-[#6B7D61]">
          {filtered.length} transaction{filtered.length === 1 ? "" : "s"}
        </p>
        <p className="flex items-center gap-1 text-[8px] font-bold text-brand-dark">
          <ShieldCheck size={10} /> Secured by Maya
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No transactions found"
          body="Try a different search or filter to find what you're looking for."
        />
      ) : (
        <div className="mt-2 divide-y divide-line/65 overflow-hidden rounded-[18px] border border-line/80 bg-white px-3.5">
          {filtered.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              hidden={balanceHidden}
              onClick={() => openTransaction(transaction)}
            />
          ))}
        </div>
      )}
    </SheetShell>
  );
}

const goalEmojis = ["✈️", "🏝️", "💻", "🏡", "🚗", "🎓", "💍", "☂️"];

export function GoalSheet() {
  const { closeSheet, addGoal, notify } = useMaya();
  const [emoji, setEmoji] = useState("✈️");
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("Dec 2026");

  const numericTarget = Number.parseFloat(target) || 0;
  const canCreate = name.trim().length > 0 && numericTarget > 0;

  function submit() {
    if (!canCreate) return;
    addGoal({ name: name.trim(), emoji, target: numericTarget, deadline });
    closeSheet();
    notify(`${emoji} ${name.trim()} goal created`);
  }

  return (
    <SheetShell
      title="Create a goal"
      subtitle="Give your savings a name and something to look forward to."
      onClose={closeSheet}
    >
      <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#E4F9AB,#C8F274)] px-4 py-4">
        <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full border-[12px] border-white/25" />
        <div className="relative flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-white/50 text-[24px]">
            {emoji}
          </span>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#506518]">Your new goal</p>
            <p className="mt-0.5 text-[14px] font-extrabold tracking-[-0.03em] text-ink">
              {name.trim() || "Name your goal"}
            </p>
            <p className="mt-0.5 text-[8.5px] font-semibold text-[#586F25]">
              {numericTarget > 0 ? peso(numericTarget, 0) : "Set your target"} · {deadline}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <SheetField label="Choose a symbol">
          <div className="flex gap-1.5">
            {goalEmojis.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setEmoji(item)}
                aria-label={`Choose ${item}`}
                className={cn(
                  "flex h-8 flex-1 items-center justify-center rounded-[10px] border text-[15px] transition-colors",
                  emoji === item ? "border-brand bg-white ring-1 ring-brand/20" : "border-line bg-white",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </SheetField>
      </div>

      <div className="mt-3 space-y-3">
        <SheetField label="Goal name">
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value.slice(0, 28))}
            placeholder="e.g. Palawan with friends"
            className="h-10 w-full rounded-[12px] border border-line bg-white px-3 text-[10.5px] font-medium text-ink outline-none placeholder:text-[#9FAAA1] focus:border-brand"
          />
        </SheetField>

        <div className="grid grid-cols-2 gap-2">
          <SheetField label="Target amount">
            <div className="flex h-10 items-center gap-1 rounded-[12px] border border-line bg-white px-3">
              <span className="text-[11px] font-extrabold text-[#849188]">₱</span>
              <input
                type="text"
                inputMode="decimal"
                value={target}
                onChange={(event) => setTarget(event.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="0.00"
                className="min-w-0 flex-1 bg-transparent text-[10.5px] font-bold text-ink outline-none placeholder:text-[#D2D9D1]"
              />
            </div>
          </SheetField>
          <SheetField label="Target date">
            <select
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              className="h-10 w-full rounded-[12px] border border-line bg-white px-2.5 text-[10px] font-semibold text-ink outline-none focus:border-brand"
            >
              <option>Dec 2026</option>
              <option>Jun 2027</option>
              <option>Dec 2027</option>
              <option>Dec 2028</option>
            </select>
          </SheetField>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-[13px] bg-[#EEF5E7] px-3 py-2.5 text-[8px] font-medium leading-relaxed text-[#5F7258]">
        <Sparkles size={12} className="mt-0.5 shrink-0 text-brand-dark" />
        Your goal earns the same 4.5% p.a. interest as your Maya Savings. Top it up anytime.
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={!canCreate}
        className={cn(
          "mt-4 flex h-11 w-full items-center justify-center rounded-full text-[11px] font-extrabold transition-all",
          canCreate ? "bg-ink text-white active:scale-[0.99]" : "cursor-not-allowed bg-[#E5EAE1] text-[#A3AFA5]",
        )}
      >
        Create goal
      </button>
    </SheetShell>
  );
}

const infoConfig: Record<InfoTopic, { title: string; subtitle: string; cta: string }> = {
  personal: {
    title: "Personal information",
    subtitle: "Keep your details up to date so your account stays secure.",
    cta: "Edit my details",
  },
  security: {
    title: "Security & privacy",
    subtitle: "Control how you log in and how your account is protected.",
    cta: "Review recent devices",
  },
  limits: {
    title: "Transaction limits",
    subtitle: "Your current limits keep every account action safe.",
    cta: "Request a limit change",
  },
  statement: {
    title: "Statements & documents",
    subtitle: "Download records of your wallet and savings activity.",
    cta: "Email me a full statement",
  },
  linked: {
    title: "Linked accounts",
    subtitle: "Manage the bank accounts and wallets connected to Maya.",
    cta: "Link a new account",
  },
  help: {
    title: "Help center",
    subtitle: "Answers and friendly humans, whenever you need them.",
    cta: "Chat with Maya support",
  },
  credit: {
    title: "Maya Credit",
    subtitle: "Flexible credit built into the app you already use.",
    cta: "View my credit offer",
  },
  about: {
    title: "About Maya",
    subtitle: "One app for your everyday money, made for the Philippines.",
    cta: "Read our privacy promise",
  },
};

export function InfoSheet({ topic: requestedTopic }: { topic: InfoTopic }) {
  const { closeSheet, notify, faceScan, setFaceScan } = useMaya();
  const topic = infoConfig[requestedTopic] ? requestedTopic : "personal";
  const config = infoConfig[topic];
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometricPayments, setBiometricPayments] = useState(true);

  return (
    <SheetShell title={config.title} subtitle={config.subtitle} onClose={closeSheet}>
      {topic === "personal" && (
        <div className="overflow-hidden rounded-[18px] border border-line/80 bg-white px-4">
          <InfoRow icon={UserRound} label="Full name" value="Mia Santos" />
          <InfoRow icon={Smartphone} label="Mobile number" value="+63 917 842 4827" />
          <InfoRow icon={MessageCircle} label="Email address" value="mia.santos@email.com" />
          <InfoRow icon={BadgeCheck} label="Verification" value="Fully verified" />
        </div>
      )}

      {topic === "security" && (
        <>
          <div className="overflow-hidden rounded-[18px] border border-line/80 bg-white px-4">
            <div className="flex items-center gap-3 border-b border-line/70 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#E6F5EA] text-brand-dark">
                <Smartphone size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] font-bold text-ink">Face Scan login</p>
                <p className="mt-0.5 text-[8px] font-medium text-muted">Use your face to open Maya</p>
              </div>
              <Toggle checked={faceScan} onChange={setFaceScan} label="Face Scan login" />
            </div>
            <div className="flex items-center gap-3 border-b border-line/70 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#E4F0FE] text-[#27628C]">
                <LockKeyhole size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] font-bold text-ink">Two-factor authentication</p>
                <p className="mt-0.5 text-[8px] font-medium text-muted">An extra check for new devices</p>
              </div>
              <Toggle
                checked={twoFactor}
                onChange={(value) => {
                  setTwoFactor(value);
                  notify(value ? "Two-factor authentication on" : "Two-factor authentication off");
                }}
                label="Two-factor authentication"
              />
            </div>
            <div className="flex items-center gap-3 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#F1E8FE] text-[#6C489A]">
                <ShieldCheck size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] font-bold text-ink">Approve with biometrics</p>
                <p className="mt-0.5 text-[8px] font-medium text-muted">Protect payments and transfers</p>
              </div>
              <Toggle
                checked={biometricPayments}
                onChange={(value) => {
                  setBiometricPayments(value);
                  notify(value ? "Biometric approvals enabled" : "Biometric approvals disabled");
                }}
                label="Biometric approvals"
              />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-[13px] bg-[#EEF5E7] px-3 py-2.5">
            <ShieldCheck size={13} className="shrink-0 text-brand-dark" />
            <p className="text-[8px] font-medium leading-relaxed text-[#61735A]">
              Your account is protected. Last security check: today, 9:12 AM.
            </p>
          </div>
        </>
      )}

      {topic === "limits" && (
        <div className="space-y-2.5">
          {[
            { label: "Daily wallet spend", value: "₱50,000", used: 38, icon: Wallet },
            { label: "Per transaction", value: "₱20,000", used: 22, icon: ArrowUpRight },
            { label: "ATM withdrawal", value: "₱20,000", used: 10, icon: CreditCard },
          ].map(({ label, value, used, icon: Icon }) => (
            <div key={label} className="rounded-[18px] border border-line/80 bg-white p-3.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#EFF5E8] text-brand-dark">
                  <Icon size={15} />
                </span>
                <p className="flex-1 text-[10px] font-bold text-ink">{label}</p>
                <p className="text-[11px] font-extrabold text-ink">{value}</p>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#EEF1EA]">
                <div className="h-full rounded-full bg-brand" style={{ width: `${used}%` }} />
              </div>
              <p className="mt-1.5 text-[7.5px] font-medium text-muted">{used}% of your limit used</p>
            </div>
          ))}
        </div>
      )}

      {topic === "statement" && (
        <div className="overflow-hidden rounded-[18px] border border-line/80 bg-white px-4">
          {["May 2026", "April 2026", "March 2026"].map((month, index) => (
            <button
              key={month}
              type="button"
              onClick={() => notify(`${month} statement downloaded`)}
              className="flex w-full items-center gap-3 border-b border-line/70 py-3 text-left last:border-b-0"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#F1F5EC] text-brand-dark">
                <FileText size={16} />
              </span>
              <span className="flex-1">
                <span className="block text-[10px] font-bold text-ink">{month} statement</span>
                <span className="mt-0.5 block text-[8px] font-medium text-muted">
                  {index === 0 ? "Current month · PDF" : "PDF · 2 pages"}
                </span>
              </span>
              <Download size={14} className="text-[#92A096]" />
            </button>
          ))}
        </div>
      )}

      {topic === "linked" && (
        <div className="space-y-2">
          {[
            { name: "BPI", detail: "•••• 4321 · Linked", icon: "B", bg: "bg-[#E8F3D8] text-[#547A22]" },
            { name: "GCash", detail: "0917 ••• 4827 · Linked", icon: "G", bg: "bg-[#E4EEFF] text-[#295C9E]" },
          ].map((account) => (
            <div key={account.name} className="flex items-center gap-3 rounded-[16px] border border-line/80 bg-white p-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-[11px] text-[13px] font-extrabold ${account.bg}`}>
                {account.icon}
              </span>
              <div className="flex-1">
                <p className="text-[10.5px] font-bold text-ink">{account.name}</p>
                <p className="mt-0.5 text-[8px] font-medium text-muted">{account.detail}</p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-[#EAF7E6] px-2 py-1 text-[7px] font-bold text-brand-dark">
                <Check size={8} /> active
              </span>
            </div>
          ))}
          <button
            type="button"
            onClick={() => notify("Link a new account from your bank's app")}
            className="flex w-full items-center gap-2.5 rounded-[16px] border border-dashed border-[#C6D8C4] bg-[#F5F9F1] p-3 text-[9.5px] font-bold text-[#5D7355]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white">
              <ArrowUpRight size={14} />
            </span>
            Link another bank or wallet
          </button>
        </div>
      )}

      {topic === "help" && (
        <div className="divide-y divide-line/70 overflow-hidden rounded-[18px] border border-line/80 bg-white px-4">
          {[
            { label: "How do I send money?", detail: "Transfers & payments" },
            { label: "Reset my Maya PIN", detail: "Security & account access" },
            { label: "Why is my card frozen?", detail: "Maya Card" },
            { label: "Savings interest explained", detail: "Maya Savings" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => notify("Opening help article…")}
              className="flex w-full items-center gap-3 py-3 text-left"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F5EA] text-brand-dark">
                <HelpCircle size={14} />
              </span>
              <span className="flex-1">
                <span className="block text-[10px] font-bold text-ink">{item.label}</span>
                <span className="mt-0.5 block text-[8px] font-medium text-muted">{item.detail}</span>
              </span>
              <ChevronRight size={13} className="text-[#A7B2A9]" />
            </button>
          ))}
        </div>
      )}

      {topic === "credit" && (
        <>
          <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#133A29,#082117)] p-4 text-white">
            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full border border-lime/15" />
            <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-white/45">Available to use</p>
            <p className="mt-1.5 text-[28px] font-extrabold tracking-[-0.05em]">₱15,000.00</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-lime px-2 py-1 text-[7px] font-extrabold uppercase tracking-[0.07em] text-ink">
                Pre-approved
              </span>
              <span className="text-[8px] font-medium text-white/50">0% interest for 30 days</span>
            </div>
          </div>
          <div className="mt-3 divide-y divide-line/70 overflow-hidden rounded-[16px] border border-line/80 bg-white px-4">
            <InfoRow icon={CreditCard} label="Credit limit" value="₱15,000" />
            <InfoRow icon={Wallet} label="Outstanding balance" value="₱0.00" />
            <InfoRow icon={Sparkles} label="Credit score impact" value="Checking is safe" />
          </div>
        </>
      )}

      {topic === "about" && (
        <div className="overflow-hidden rounded-[18px] border border-line/80 bg-white px-4">
          <InfoRow icon={Globe2} label="Maya app version" value="2.8.1 (2026)" />
          <InfoRow icon={ShieldCheck} label="Maya Bank" value="PDIC insured" />
          <InfoRow icon={LifeBuoy} label="Customer care" value="24/7 support" />
          <InfoRow icon={FileText} label="Legal" value="Terms & privacy" />
        </div>
      )}

      <button
        type="button"
        onClick={() => notify(`${config.cta} — demo experience`)}
        className="mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-ink text-[10px] font-extrabold text-white"
      >
        {config.cta} <ArrowUpRight size={12} />
      </button>

      {topic === "about" && (
        <p className="mt-3 text-center text-[7.5px] font-medium leading-relaxed text-muted">
          This is an independent UI concept inspired by Maya. It is not affiliated with or endorsed by Maya
          Innovations Holdings.
        </p>
      )}
    </SheetShell>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-line/70 py-3 last:border-b-0">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#F1F5EC] text-brand-dark">
        <Icon size={14} />
      </span>
      <p className="flex-1 text-[9px] font-semibold text-muted">{label}</p>
      <p className="max-w-[55%] truncate text-right text-[9.5px] font-bold text-ink">{value}</p>
    </div>
  );
}

export function TransactionSheet({ transaction }: { transaction: Transaction }) {
  const { closeSheet, openSheet, balanceHidden } = useMaya();
  const isIn = transaction.direction === "in";
  const prettyCategory = transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1);

  return (
    <SheetShell
      title="Transaction details"
      subtitle="A record of this wallet transaction."
      onClose={closeSheet}
    >
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="relative">
          <TransactionIcon category={transaction.category} className="h-14 w-14 rounded-[18px]" />
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#FAFBF7] bg-brand text-white">
            <Check size={10} strokeWidth={3.2} />
          </span>
        </div>
        <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.11em] text-muted">
          {isIn ? "Money received" : "Payment completed"}
        </p>
        <p className={cn("mt-1 text-[31px] font-extrabold tracking-[-0.055em]", isIn ? "text-brand-dark" : "text-ink")}>
          {isIn ? "+" : "−"}
          {money(transaction.amount, balanceHidden)}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <p className="text-[11px] font-bold text-[#4D5C53]">{transaction.title}</p>
          <BadgeCheck size={12} fill="#0FAE6D" className="text-white" />
        </div>
        <p className="mt-0.5 text-[8.5px] font-medium text-muted">{transaction.dateLabel}</p>
      </div>

      <div className="mt-4 divide-y divide-line/70 rounded-[18px] border border-line/80 bg-white px-4">
        <InfoRow icon={isIn ? ArrowDownLeft : ArrowUpRight} label={isIn ? "Received from" : "Paid to"} value={transaction.title} />
        <InfoRow icon={Wallet} label="Payment method" value="Maya Wallet" />
        <InfoRow icon={Sparkles} label="Category" value={prettyCategory} />
        <InfoRow icon={FileText} label="Reference number" value={`MYA-${transaction.id.replace(/\D/g, "").slice(-7) || "8294102"}`} />
        <InfoRow icon={ShieldCheck} label="Status" value="Completed" />
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-[13px] bg-[#EEF5E7] px-3 py-2.5">
        <ShieldCheck size={13} className="shrink-0 text-brand-dark" />
        <p className="text-[8px] font-medium leading-relaxed text-[#61735A]">
          This transaction is protected by Maya Shield. Report anything unusual within 24 hours.
        </p>
      </div>

      <button
        type="button"
        onClick={() => openSheet("info", { topic: "help" })}
        className="mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[10px] font-bold text-[#57645B]"
      >
        <LifeBuoy size={13} /> Get help with this transaction
      </button>
      <button
        type="button"
        onClick={closeSheet}
        className="mt-2 h-10 w-full rounded-full bg-ink text-[10px] font-extrabold text-white"
      >
        Done
      </button>
    </SheetShell>
  );
}
