import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  MessageSquare,
  Search,
  ShieldCheck,
  UserRoundPlus,
  Wallet,
} from "lucide-react";
import { Avatar } from "../ui";
import { SheetField, SheetShell, StepBack } from "./SheetShell";
import { contacts, type Contact } from "../../lib/data";
import { money, peso } from "../../lib/format";
import { useMaya } from "../../lib/store";
import { cn } from "../../utils/cn";

type Step = "recipient" | "amount" | "success";

export function TransferSheet() {
  const { sheet, closeSheet, walletBalance, sendMoney, balanceHidden } = useMaya();
  const recentContact = contacts.find((contact) => contact.id === sheet?.meta?.contactId) ?? null;

  const [step, setStep] = useState<Step>(recentContact ? "amount" : "recipient");
  const [selected, setSelected] = useState<Contact | null>(recentContact);
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const filteredContacts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return contacts;
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalized) || contact.handle.toLowerCase().includes(normalized),
    );
  }, [query]);

  const numericAmount = Number.parseFloat(amount) || 0;
  const invalidAmount = numericAmount <= 0 || numericAmount > walletBalance;

  function chooseRecipient(contact: Contact) {
    setSelected(contact);
    setStep("amount");
    setError("");
  }

  function submit() {
    if (!selected) return;
    if (numericAmount <= 0) {
      setError("Enter an amount to send.");
      return;
    }
    if (numericAmount > walletBalance) {
      setError("That's more than your available wallet balance.");
      return;
    }
    const sent = sendMoney(selected.name, numericAmount, note);
    if (sent) {
      setStep("success");
      setError("");
    }
  }

  function reset() {
    setStep("recipient");
    setSelected(null);
    setAmount("");
    setNote("");
    setError("");
  }

  if (step === "success" && selected) {
    return (
      <SheetShell
        title="All done"
        subtitle="Your transfer went through instantly."
        onClose={closeSheet}
      >
        <div className="animate-pop flex flex-col items-center pb-2 pt-3 text-center">
          <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#DDF6C5]">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#DDF6C5] opacity-40" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/25">
              <Check size={26} strokeWidth={3} />
            </span>
          </div>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">Money sent</p>
          <p className="mt-1.5 text-[32px] font-extrabold tracking-[-0.055em] text-ink">{peso(numericAmount)}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#57645B]">
            to {selected.name}
            <BadgeCheck size={12} fill="#0FAE6D" className="text-white" />
          </div>
        </div>

        <div className="mt-5 divide-y divide-line/70 rounded-[18px] border border-line/80 bg-white px-4">
          <DetailRow label="From" value="Maya Wallet" strong={false} />
          <DetailRow label="To" value={`${selected.name} · ${selected.handle}`} strong={false} />
          <DetailRow label="Fee" value="Free" strong />
          <DetailRow label="Reference" value="MYA-8294-1026" strong={false} mono />
          <DetailRow label="New wallet balance" value={money(walletBalance, balanceHidden)} strong />
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-[14px] bg-[#EEF6E7] px-3 py-2.5 text-[8.5px] font-medium leading-relaxed text-[#5A7150]">
          <ShieldCheck size={13} className="mt-0.5 shrink-0 text-brand-dark" />
          Sent safely with Maya. This transaction is protected by Maya Shield.
        </div>

        <button
          type="button"
          onClick={closeSheet}
          className="mt-4 h-11 w-full rounded-full bg-ink text-[11px] font-extrabold text-white transition-transform active:scale-[0.99]"
        >
          Done
        </button>
        <button
          type="button"
          onClick={reset}
          className="mx-auto mt-3 flex h-8 items-center justify-center gap-1 px-4 text-[9.5px] font-bold text-brand-dark"
        >
          Send again <ArrowUpRight size={12} />
        </button>
      </SheetShell>
    );
  }

  if (step === "amount" && selected) {
    return (
      <SheetShell
        title="How much?"
        subtitle="Maya-to-Maya transfers are always free."
        onClose={closeSheet}
      >
        <StepBack onClick={() => setStep("recipient")} label="Change recipient" />

        <div className="flex items-center gap-2.5 rounded-[17px] border border-line/80 bg-white p-2.5">
          <Avatar initials={selected.initials} tone={selected.tone} className="h-9 w-9 text-[10px]" online />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-bold text-ink">{selected.name}</p>
              <BadgeCheck size={11} fill="#0FAE6D" className="text-white" />
            </div>
            <p className="mt-0.5 truncate text-[8.5px] font-semibold text-muted">{selected.handle}</p>
          </div>
          <span className="rounded-full bg-[#EAF7E7] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-brand-dark">
            Maya
          </span>
        </div>

        <div className="mt-3 rounded-[20px] border border-black/[0.05] bg-white px-4 py-4 text-center">
          <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-muted">Enter amount</p>
          <div className="mt-1 flex items-center justify-center gap-1">
            <span className="mt-1 text-[23px] font-extrabold text-[#819086]">₱</span>
            <input
              autoFocus
              inputMode="decimal"
              type="text"
              value={amount}
              onChange={(event) => {
                const next = event.target.value.replace(/[^0-9.]/g, "");
                if (next.split(".").length <= 2 && next.replace(".", "").length <= 9) {
                  setAmount(next);
                  setError("");
                }
              }}
              aria-label="Amount to send"
              placeholder="0.00"
              className="w-[190px] bg-transparent text-center text-[34px] font-extrabold tracking-[-0.055em] text-ink outline-none placeholder:text-[#D2D9D1]"
            />
          </div>
          <p className="mt-1.5 text-[8.5px] font-semibold text-muted">
            Available: <span className="text-ink">{money(walletBalance, balanceHidden)}</span>
          </p>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {[100, 500, 1000].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setAmount(String(value));
                setError("");
              }}
              className={cn(
                "h-8 rounded-full border text-[9.5px] font-bold transition-colors",
                amount === String(value)
                  ? "border-brand bg-[#ECF8E6] text-brand-dark"
                  : "border-line bg-white text-[#69766D] hover:bg-[#F4F7F0]",
              )}
            >
              ₱{value.toLocaleString()}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <SheetField label="Note" hint="Optional">
            <div className="flex items-center gap-2 rounded-[14px] border border-line bg-white px-3">
              <MessageSquare size={14} className="shrink-0 text-[#94A096]" />
              <input
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value.slice(0, 60))}
                placeholder="What's it for?"
                className="h-10 min-w-0 flex-1 bg-transparent text-[10.5px] font-medium text-ink outline-none placeholder:text-[#9FAAA1]"
              />
              <span className="text-[7.5px] font-semibold text-muted">{note.length}/60</span>
            </div>
          </SheetField>
        </div>

        {error && <p className="mt-2 text-[9px] font-semibold text-[#B34747]">{error}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={invalidAmount}
          className={cn(
            "mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-full text-[11px] font-extrabold transition-all",
            invalidAmount
              ? "cursor-not-allowed bg-[#E5EAE1] text-[#A3AFA5]"
              : "bg-ink text-white active:scale-[0.99]",
          )}
        >
          <Wallet size={14} />
          {numericAmount > 0 ? `Send ${peso(numericAmount)}` : "Send money"}
        </button>
        <p className="mt-2.5 text-center text-[8px] font-medium leading-relaxed text-muted">
          By sending, you agree to Maya's terms. No transfer fees.
        </p>
      </SheetShell>
    );
  }

  return (
    <SheetShell
      title="Send money"
      subtitle="Choose a contact or enter a new recipient."
      onClose={closeSheet}
    >
      <div className="flex items-center gap-2 rounded-[14px] border border-line bg-white px-3">
        <Search size={15} className="shrink-0 text-[#8C9990]" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Name, @username or mobile number"
          aria-label="Search recipient"
          className="h-10 min-w-0 flex-1 bg-transparent text-[10.5px] font-medium text-ink outline-none placeholder:text-[#9FAAA1]"
        />
      </div>

      {query.trim() && (
        <button
          type="button"
          onClick={() =>
            chooseRecipient({
              id: "custom",
              name: query.trim().startsWith("@") ? query.trim().slice(1) : query.trim(),
              handle: query.trim().startsWith("@") ? query.trim() : "New recipient",
              initials: query.trim().replace("@", "").slice(0, 2).toUpperCase(),
              tone: "lilac",
            })
          }
          className="mt-2.5 flex w-full items-center gap-3 rounded-[15px] border border-[#DCEBCF] bg-[#F3F9EC] px-3 py-2.5 text-left"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark">
            <UserRoundPlus size={16} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[10.5px] font-bold text-ink">Send to “{query.trim()}”</span>
            <span className="mt-0.5 block text-[8.5px] font-medium text-[#6B7D62]">New Maya recipient</span>
          </span>
          <ChevronRight size={14} className="text-[#6B7D62]" />
        </button>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#7B887E]">Recent contacts</p>
        <span className="text-[8px] font-semibold text-muted">{filteredContacts.length} Maya users</span>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-x-2 gap-y-4">
        {filteredContacts.map((contact) => (
          <button
            key={contact.id}
            type="button"
            onClick={() => chooseRecipient(contact)}
            className="group flex min-w-0 flex-col items-center gap-1.5"
          >
            <span className="rounded-full transition-transform group-active:scale-95">
              <Avatar initials={contact.initials} tone={contact.tone} className="h-12 w-12 text-[11px]" online />
            </span>
            <span className="w-full truncate text-center text-[9px] font-bold text-[#455349]">{contact.name}</span>
            <span className="-mt-1 w-full truncate text-center text-[7px] font-medium text-muted">
              {contact.handle}
            </span>
          </button>
        ))}
      </div>

      {filteredContacts.length === 0 && !query.trim() && (
        <p className="py-8 text-center text-[10px] text-muted">No contacts yet. Enter a recipient above.</p>
      )}

      <div className="mt-5 flex items-start gap-2 rounded-[14px] bg-[#F0F5EA] px-3 py-2.5 text-[8.5px] font-medium leading-relaxed text-[#607257]">
        <ShieldCheck size={13} className="mt-0.5 shrink-0 text-brand-dark" />
        Only send to people you know. Maya will never ask for your password or OTP.
      </div>
    </SheetShell>
  );
}

function DetailRow({
  label,
  value,
  strong,
  mono = false,
}: {
  label: string;
  value: string;
  strong: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="shrink-0 text-[8.5px] font-semibold text-muted">{label}</span>
      <span
        className={cn(
          "min-w-0 truncate text-right text-[9.5px]",
          strong ? "font-extrabold text-ink" : "font-semibold text-[#4B5A51]",
          mono && "font-mono text-[8.5px]",
        )}
      >
        {value}
      </span>
    </div>
  );
}
