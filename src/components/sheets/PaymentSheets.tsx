import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Copy,
  CreditCard,
  Landmark,
  Plus,
  QrCode as QrCodeIcon,
  ScanLine,
  Share2,
  ShieldCheck,
  Smartphone,
  Store,
  Wallet,
} from "lucide-react";
import { Avatar, BillerMark } from "../ui";
import { QrCode } from "../brand";
import { SheetField, SheetShell, StepBack } from "./SheetShell";
import { billers, loadNetworks, type Biller } from "../../lib/data";
import { money, peso } from "../../lib/format";
import { useMaya } from "../../lib/store";
import { cn } from "../../utils/cn";

const cashMethods = [
  { name: "BPI", label: "Instant transfer", icon: Landmark },
  { name: "GCash", label: "Instant transfer", icon: Smartphone },
  { name: "7-Eleven", label: "Next day", icon: Store },
  { name: "Debit card", label: "Instant transfer", icon: CreditCard },
];

export function AddMoneySheet() {
  const { sheet, closeSheet, addMoney, goals, walletBalance, savingsBalance, balanceHidden } = useMaya();
  const target = sheet?.meta?.target ?? "wallet";
  const goal = goals.find((item) => item.id === sheet?.meta?.goalId);
  const isSavings = target === "savings";

  const [step, setStep] = useState<"form" | "success">("form");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("BPI");
  const [error, setError] = useState("");

  const numericAmount = Number.parseFloat(amount) || 0;
  const title = isSavings ? (goal ? `Top up ${goal.name}` : "Add to savings") : "Cash in";
  const destination = isSavings ? "Maya Savings" : "Maya Wallet";

  function submit() {
    if (numericAmount <= 0) {
      setError("Enter an amount to add.");
      return;
    }
    addMoney(numericAmount, method, target, goal?.id);
    setStep("success");
  }

  if (step === "success") {
    return (
      <SheetShell title="Cash in successful" subtitle="The money is ready to use." onClose={closeSheet}>
        <div className="animate-pop flex flex-col items-center pt-3 text-center">
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#DDF5E8]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/25">
              <Check size={24} strokeWidth={3} />
            </span>
          </div>
          <p className="mt-4 text-[30px] font-extrabold tracking-[-0.055em] text-ink">{peso(numericAmount)}</p>
          <p className="mt-1 text-[10px] font-semibold text-muted">added to {destination}</p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#EFF7E8] px-2.5 py-1 text-[8px] font-bold text-brand-dark">
            <ShieldCheck size={10} /> Safe and secure
          </span>
        </div>

        <div className="mt-5 divide-y divide-line/70 rounded-[18px] border border-line/80 bg-white px-4">
          <Row label="From" value={`${method} · ${method === "7-Eleven" ? "Next day" : "Instant"}`} />
          <Row label="Added to" value={goal ? `${goal.name} goal` : destination} />
          <Row label="Fee" value="Free" />
          <Row
            label="New balance"
            value={money(isSavings ? savingsBalance : walletBalance, balanceHidden)}
            strong
          />
        </div>

        <button
          type="button"
          onClick={closeSheet}
          className="mt-4 h-11 w-full rounded-full bg-ink text-[11px] font-extrabold text-white"
        >
          Done
        </button>
      </SheetShell>
    );
  }

  return (
    <SheetShell
      title={title}
      subtitle={
        goal
          ? `Add to your ${goal.name} goal and keep earning 4.5% p.a.`
          : isSavings
            ? "Move funds into your high-interest savings account."
            : "Top up your wallet from a linked account or partner."
      }
      onClose={closeSheet}
    >
      <div className="flex items-center gap-2.5 rounded-[16px] border border-[#DDEACC] bg-[#F2F9E9] p-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-ink text-lime">
          {isSavings ? <Plus size={16} /> : <Wallet size={16} />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#6F8560]">Adding to</p>
          <p className="mt-0.5 truncate text-[11px] font-extrabold text-ink">{goal ? `${goal.emoji} ${goal.name}` : destination}</p>
        </div>
        <p className="shrink-0 text-[9px] font-bold text-brand-dark">
          {money(isSavings ? savingsBalance : walletBalance, balanceHidden, 0)}
        </p>
      </div>

      <div className="mt-3 rounded-[20px] border border-black/[0.05] bg-white px-4 py-3.5 text-center">
        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-muted">Amount</p>
        <div className="mt-1 flex items-center justify-center gap-1">
          <span className="mt-1 text-[21px] font-extrabold text-[#819086]">₱</span>
          <input
            autoFocus
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(event) => {
              const next = event.target.value.replace(/[^0-9.]/g, "");
              if (next.split(".").length <= 2 && next.replace(".", "").length <= 8) {
                setAmount(next);
                setError("");
              }
            }}
            aria-label="Amount to add"
            placeholder="0.00"
            className="w-[180px] bg-transparent text-center text-[32px] font-extrabold tracking-[-0.055em] text-ink outline-none placeholder:text-[#D2D9D1]"
          />
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-4 gap-2">
        {[500, 1000, 2000, 3000].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setAmount(String(value));
              setError("");
            }}
            className={cn(
              "h-8 rounded-full border text-[9px] font-bold transition-colors",
              amount === String(value)
                ? "border-brand bg-[#ECF8E6] text-brand-dark"
                : "border-line bg-white text-[#69766D]",
            )}
          >
            ₱{value.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <SheetField label="Cash in from">
          <div className="grid grid-cols-2 gap-2">
            {cashMethods.map(({ name, label, icon: Icon }) => (
              <button
                key={name}
                type="button"
                onClick={() => setMethod(name)}
                className={cn(
                  "flex items-center gap-2 rounded-[14px] border bg-white p-2.5 text-left transition-colors",
                  method === name ? "border-brand ring-1 ring-brand/20" : "border-line hover:bg-[#F7F9F4]",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px]",
                    method === name ? "bg-[#EAF7E5] text-brand-dark" : "bg-[#F2F5EF] text-[#67756A]",
                  )}
                >
                  <Icon size={14} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[9.5px] font-bold text-ink">{name}</span>
                  <span className="mt-0.5 block truncate text-[7px] font-medium text-muted">{label}</span>
                </span>
              </button>
            ))}
          </div>
        </SheetField>
      </div>

      {error && <p className="mt-2 text-[9px] font-semibold text-[#B34747]">{error}</p>}

      <button
        type="button"
        onClick={submit}
        disabled={numericAmount <= 0}
        className={cn(
          "mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-full text-[11px] font-extrabold transition-all",
          numericAmount <= 0
            ? "cursor-not-allowed bg-[#E5EAE1] text-[#A3AFA5]"
            : "bg-ink text-white active:scale-[0.99]",
        )}
      >
        <ArrowUpRight size={14} />
        {numericAmount > 0 ? `Add ${peso(numericAmount)}` : "Add money"}
      </button>
      <p className="mt-2.5 text-center text-[8px] font-medium text-muted">
        Instant cash in. No hidden charges.
      </p>
    </SheetShell>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-[8.5px] font-semibold text-muted">{label}</span>
      <span
        className={cn(
          "truncate text-right text-[9.5px]",
          strong ? "font-extrabold text-ink" : "font-semibold text-[#4B5A51]",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function PaySheet({ mode }: { mode: "bill" | "load" }) {
  const { sheet, closeSheet, payBiller, walletBalance, balanceHidden } = useMaya();
  const initialBiller = billers.find((biller) => biller.id === sheet?.meta?.billerId) ?? null;

  const [step, setStep] = useState<"pick" | "details" | "success">(initialBiller ? "details" : "pick");
  const [biller, setBiller] = useState<Biller | null>(initialBiller);
  const [network, setNetwork] = useState<(typeof loadNetworks)[number] | null>(null);
  const [account, setAccount] = useState(mode === "load" ? "0917 842 4827" : "");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const numericAmount = Number.parseFloat(amount) || 0;
  const detailTitle = mode === "load" ? "Buy load" : "Pay a bill";
  const targetName = mode === "load" ? network?.name ?? "" : biller?.name ?? "";

  const quickAmounts = mode === "load" ? [50, 100, 300, 500] : [500, 1000, 2000, 5000];

  function chooseBiller(next: Biller) {
    setBiller(next);
    setStep("details");
    setError("");
  }

  function chooseNetwork(next: (typeof loadNetworks)[number]) {
    setNetwork(next);
    setStep("details");
    setError("");
  }

  function submit() {
    if (!targetName) return;
    if (account.replace(/\s/g, "").length < 4) {
      setError(mode === "load" ? "Enter a valid mobile number." : "Enter your account number.");
      return;
    }
    if (numericAmount <= 0) {
      setError("Enter an amount.");
      return;
    }
    if (numericAmount > walletBalance) {
      setError("Your wallet balance isn't enough for this payment.");
      return;
    }
    payBiller(targetName, numericAmount, account);
    setStep("success");
    setError("");
  }

  if (step === "success") {
    return (
      <SheetShell
        title={mode === "load" ? "Load delivered" : "Payment sent"}
        subtitle={mode === "load" ? `${targetName} load is on its way.` : "Your biller received the payment."}
        onClose={closeSheet}
      >
        <div className="animate-pop flex flex-col items-center pt-3 text-center">
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#DFF4E5]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/25">
              <Check size={24} strokeWidth={3} />
            </span>
          </div>
          <p className="mt-4 text-[30px] font-extrabold tracking-[-0.055em] text-ink">{peso(numericAmount)}</p>
          <p className="mt-1 text-[10px] font-semibold text-muted">
            {mode === "load" ? `${targetName} load` : `paid to ${targetName}`}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#EFF7E8] px-2.5 py-1 text-[8px] font-bold text-brand-dark">
            <BadgeCheck size={10} /> Completed
          </span>
        </div>
        <div className="mt-5 divide-y divide-line/70 rounded-[18px] border border-line/80 bg-white px-4">
          <Row label={mode === "load" ? "Mobile number" : "Account number"} value={account} />
          <Row label="From" value="Maya Wallet" />
          <Row label="Fee" value="Free" />
          <Row label="Reference" value="MYA-6428-1107" />
          <Row label="New balance" value={money(walletBalance, balanceHidden)} strong />
        </div>
        <button
          type="button"
          onClick={closeSheet}
          className="mt-4 h-11 w-full rounded-full bg-ink text-[11px] font-extrabold text-white"
        >
          Done
        </button>
      </SheetShell>
    );
  }

  if (step === "details") {
    return (
      <SheetShell
        title={detailTitle}
        subtitle="Pay instantly using your Maya Wallet."
        onClose={closeSheet}
      >
        <StepBack
          onClick={() => {
            setStep("pick");
            setNetwork(null);
            if (!initialBiller) setBiller(null);
          }}
          label="Change"
        />
        <div className="flex items-center gap-2.5 rounded-[16px] border border-line/80 bg-white p-3">
          {mode === "load" && network ? (
            <Avatar initials={network.initials} tone={network.tone} className="h-10 w-10 text-[10px]" />
          ) : biller ? (
            <BillerMark biller={biller} className="h-10 w-10" />
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-ink">{targetName}</p>
            <p className="mt-0.5 text-[8.5px] font-medium text-muted">
              {mode === "load" ? network?.handle : biller?.category}
            </p>
          </div>
          <span className="rounded-full bg-[#EFF7E8] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-brand-dark">
            {mode === "load" ? "prepaid" : "biller"}
          </span>
        </div>

        <div className="mt-3 space-y-3">
          <SheetField label={mode === "load" ? "Mobile number" : "Account number"}>
            <input
              type="tel"
              value={account}
              onChange={(event) => {
                setAccount(event.target.value.slice(0, 22));
                setError("");
              }}
              inputMode="numeric"
              placeholder={mode === "load" ? "09XX XXX XXXX" : "Enter account number"}
              className="h-10 w-full rounded-[12px] border border-line bg-white px-3 text-[10.5px] font-medium text-ink outline-none transition-colors placeholder:text-[#9FAAA1] focus:border-brand"
            />
          </SheetField>

          <SheetField label="Amount">
            <div className="flex items-center gap-1 rounded-[12px] border border-line bg-white px-3">
              <span className="text-[13px] font-extrabold text-[#849188]">₱</span>
              <input
                autoFocus
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(event) => {
                  const next = event.target.value.replace(/[^0-9.]/g, "");
                  if (next.split(".").length <= 2) {
                    setAmount(next);
                    setError("");
                  }
                }}
                placeholder="0.00"
                aria-label="Payment amount"
                className="h-10 min-w-0 flex-1 bg-transparent text-[15px] font-extrabold tracking-[-0.02em] text-ink outline-none placeholder:text-[#D2D9D1]"
              />
            </div>
          </SheetField>

          <div className="grid grid-cols-4 gap-1.5">
            {quickAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setAmount(String(value));
                  setError("");
                }}
                className={cn(
                  "h-7 rounded-full border text-[8.5px] font-bold transition-colors",
                  amount === String(value)
                    ? "border-brand bg-[#ECF8E6] text-brand-dark"
                    : "border-line bg-white text-[#69766D]",
                )}
              >
                ₱{value.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-[12px] bg-[#F1F5EC] px-3 py-2">
          <span className="text-[8px] font-semibold text-[#6C7C67]">Wallet balance</span>
          <span className="text-[9px] font-extrabold text-ink">{money(walletBalance, balanceHidden)}</span>
        </div>

        {error && <p className="mt-2 text-[9px] font-semibold text-[#B34747]">{error}</p>}

        <button
          type="button"
          onClick={submit}
          className="mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-ink text-[11px] font-extrabold text-white transition-transform active:scale-[0.99]"
        >
          {numericAmount > 0 ? `Pay ${peso(numericAmount)}` : mode === "load" ? "Buy load" : "Pay bill"}
          <ChevronRight size={14} />
        </button>
        <p className="mt-2.5 flex items-center justify-center gap-1 text-center text-[8px] font-medium text-muted">
          <ShieldCheck size={10} className="text-brand-dark" />
          Protected by Maya Shield · No convenience fee
        </p>
      </SheetShell>
    );
  }

  return (
    <SheetShell
      title={mode === "load" ? "Buy mobile load" : "Pay a bill"}
      subtitle={mode === "load" ? "Pick a network and top up in seconds." : "Choose from 500+ trusted billers."}
      onClose={closeSheet}
    >
      {mode === "load" ? (
        <div className="grid grid-cols-2 gap-2">
          {loadNetworks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => chooseNetwork(item)}
              className="flex items-center gap-2 rounded-[15px] border border-line bg-white p-3 text-left transition-colors hover:border-[#C9DEC1] hover:bg-[#F8FAF5]"
            >
              <Avatar initials={item.initials} tone={item.tone} className="h-9 w-9 text-[9px]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[10px] font-bold text-ink">{item.name}</span>
                <span className="mt-0.5 block truncate text-[7.5px] font-medium text-muted">{item.handle}</span>
              </span>
              <ChevronRight size={12} className="text-[#ABB5AE]" />
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {billers.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => chooseBiller(item)}
                className="flex min-w-0 flex-col items-center gap-1.5 rounded-[13px] border border-transparent px-1 py-2 transition-colors hover:border-line hover:bg-white"
              >
                <BillerMark biller={item} />
                <span className="w-full truncate text-center text-[8.5px] font-bold text-[#4C5A51]">{item.name}</span>
                <span className="-mt-1 w-full truncate text-center text-[7px] font-medium text-muted">
                  {item.category}
                </span>
              </button>
            ))}
          </div>
          <div className="rounded-[14px] bg-[#F0F5EB] p-3">
            <p className="text-[8.5px] font-bold text-[#53654F]">Can't find your biller?</p>
            <p className="mt-0.5 text-[8px] font-medium text-[#7B8B74]">
              Search over 500 billers, from utilities to government payments.
            </p>
          </div>
        </div>
      )}
    </SheetShell>
  );
}

export function QrSheet() {
  const { closeSheet, copy, notify, payBiller } = useMaya();
  const [mode, setMode] = useState<"mine" | "scan">("mine");
  const [scanned, setScanned] = useState(false);
  const merchantAmount = 185;

  function payScanned() {
    payBiller("Kape Corner", merchantAmount, "QR Ph");
    closeSheet();
    notify(`${peso(merchantAmount)} paid to Kape Corner`);
  }

  return (
    <SheetShell
      title="Maya QR"
      subtitle={mode === "mine" ? "Get paid by anyone, instantly." : "Scan any QR Ph code to pay."}
      onClose={closeSheet}
    >
      <div className="mb-4 flex rounded-full border border-line bg-[#F0F3EB] p-1">
        {(["mine", "scan"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={cn(
              "flex h-8 flex-1 items-center justify-center gap-1.5 rounded-full text-[9.5px] font-bold transition-all",
              mode === item ? "bg-white text-ink shadow-sm" : "text-[#7B887E]",
            )}
          >
            {item === "mine" ? <QrCodeIcon size={12} /> : <ScanLine size={12} />}
            {item === "mine" ? "My QR" : "Scan"}
          </button>
        ))}
      </div>

      {mode === "mine" ? (
        <div className="flex flex-col items-center">
          <div className="relative mb-2 flex w-full items-center justify-center gap-1.5">
            <Avatar initials="MS" tone="mint" className="h-8 w-8 text-[9px]" online />
            <div className="text-left">
              <div className="flex items-center gap-1">
                <p className="text-[10.5px] font-bold text-ink">Mia Santos</p>
                <BadgeCheck size={11} fill="#0FAE6D" className="text-white" />
              </div>
              <p className="text-[8px] font-semibold text-muted">@miasantos</p>
            </div>
          </div>
          <div className="relative mt-1 w-[212px]">
            <span className="absolute -left-2 top-1/4 h-10 w-2 rounded-full bg-lime" />
            <span className="absolute -right-2 top-1/2 h-10 w-2 rounded-full bg-[#E4F7C7]" />
            <QrCode seed={11} className="w-full rounded-[22px] border-[5px] border-[#EEF6E5]" />
          </div>
          <button
            type="button"
            onClick={() => copy("@miasantos", "Maya username copied")}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[8.5px] font-bold text-[#58665C]"
          >
            <Copy size={10} /> @miasantos
          </button>
          <div className="mt-3 grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => notify("Maya QR saved to your photos")}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-ink text-[9.5px] font-bold text-white"
            >
              <ArrowUpRight size={12} /> Save QR
            </button>
            <button
              type="button"
              onClick={() => notify("Share sheet opened")}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[9.5px] font-bold text-ink"
            >
              <Share2 size={12} /> Share
            </button>
          </div>
          <p className="mt-3 flex items-center gap-1 text-[8px] font-medium text-muted">
            <ShieldCheck size={10} className="text-brand-dark" />
            Works with Maya and all QR Ph apps
          </p>
        </div>
      ) : (
        <div>
          <div className="relative flex h-[245px] flex-col items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(145deg,#102E21,#081A13)] p-5 text-center text-white">
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, #7FA68D 1px, transparent 1px)", backgroundSize: "17px 17px" }} />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute left-0 top-0 h-8 w-8 rounded-tl-[12px] border-l-2 border-t-2 border-lime" />
              <span className="absolute right-0 top-0 h-8 w-8 rounded-tr-[12px] border-r-2 border-t-2 border-lime" />
              <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-[12px] border-b-2 border-l-2 border-lime" />
              <span className="absolute bottom-0 right-0 h-8 w-8 rounded-br-[12px] border-b-2 border-r-2 border-lime" />
              <span className="absolute left-2 right-2 top-1/2 h-px bg-lime/60 shadow-[0_0_12px_rgba(212,247,122,.7)]" />
            </div>
            <div className="relative z-10 mt-24">
              {!scanned ? (
                <>
                  <p className="text-[11px] font-bold text-white">Position a QR code in the frame</p>
                  <p className="mt-1 text-[8.5px] font-medium text-white/50">Scanning happens automatically</p>
                </>
              ) : (
                <div className="animate-pop rounded-[16px] border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                  <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-lime text-ink">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <p className="mt-2 text-[10px] font-bold">Kape Corner</p>
                  <p className="mt-0.5 text-[8px] text-white/55">QR Ph merchant · {peso(merchantAmount)}</p>
                </div>
              )}
            </div>
          </div>
          {!scanned ? (
            <button
              type="button"
              onClick={() => setScanned(true)}
              className="mt-3 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-ink text-[10px] font-extrabold text-white"
            >
              <ScanLine size={14} /> Simulate a scan
            </button>
          ) : (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setScanned(false)}
                className="h-10 flex-1 rounded-full border border-line bg-white text-[10px] font-bold text-[#68766C]"
              >
                Scan again
              </button>
              <button
                type="button"
                onClick={payScanned}
                className="h-10 flex-[1.5] rounded-full bg-brand text-[10px] font-extrabold text-white"
              >
                Pay {peso(merchantAmount)}
              </button>
            </div>
          )}
          <p className="mt-3 text-center text-[8px] font-medium text-muted">
            Scan with any QR Ph merchant. Need help? Tap the camera icon.
          </p>
        </div>
      )}
    </SheetShell>
  );
}
