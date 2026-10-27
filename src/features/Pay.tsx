import {
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Copy,
  QrCode as QrCodeIcon,
  ScanLine,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Avatar, BillerMark, RoundButton, ScreenHeader, SectionHeader } from "../components/ui";
import { QrCode } from "../components/brand";
import { billers, contacts } from "../lib/data";
import { useMaya } from "../lib/store";

export function PayScreen() {
  const { openSheet, setTab, notify, copy } = useMaya();

  return (
    <div className="pb-5">
      <ScreenHeader
        eyebrow="Pay"
        title="Move money, instantly."
        action={
          <RoundButton label="Scan a QR code" onClick={() => openSheet("qr")}>
            <ScanLine size={18} strokeWidth={2.1} />
          </RoundButton>
        }
      />

      <section className="px-5">
        <div className="relative overflow-hidden rounded-[26px] border border-black/[0.05] bg-white shadow-[0_18px_40px_-32px_rgba(10,31,22,0.5)]">
          <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#EAF7D9]" />
          <div className="relative p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-brand-dark">My Maya QR</p>
                <h2 className="mt-1 text-[15px] font-extrabold tracking-[-0.03em] text-ink">Scan to pay me</h2>
              </div>
              <button
                type="button"
                onClick={() => notify("Your Maya QR is ready to share")}
                aria-label="Share my QR"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink transition-transform active:scale-95"
              >
                <Share2 size={14} strokeWidth={2.1} />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-[16px] bg-[#F6F9F2] px-2.5 py-2">
                <Avatar initials="MS" tone="mint" className="h-9 w-9" online />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="truncate text-[11px] font-bold text-ink">Mia Santos</p>
                    <BadgeCheck size={11} fill="#0FAE6D" className="shrink-0 text-white" />
                  </div>
                  <p className="mt-0.5 truncate text-[9px] font-semibold text-muted">@miasantos</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-[#EAF7D9] px-2.5 py-1 text-[7.5px] font-extrabold uppercase tracking-[0.08em] text-brand-dark">
                verified
              </span>
            </div>

            <div className="relative mx-auto mt-3 w-[168px]">
              <span className="absolute -left-2 top-5 h-8 w-2 rounded-full bg-lime" />
              <span className="absolute -right-2 bottom-5 h-8 w-2 rounded-full bg-lime" />
              <QrCode seed={7} className="w-full rounded-[20px] border-[5px] border-[#EFF7E8]" />
            </div>

            <p className="mt-2.5 text-center text-[8.5px] font-semibold text-muted">
              Scan with any Maya or QR Ph app to send money
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => copy("https://maya.ph/@miasantos", "Maya QR link copied")}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[10px] font-bold text-ink transition-colors hover:bg-[#F6F8F2]"
              >
                <Copy size={12} /> Copy link
              </button>
              <button
                type="button"
                onClick={() => notify("QR downloaded to your device")}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-ink text-[10px] font-bold text-white transition-transform active:scale-[0.98]"
              >
                <ArrowUpRight size={12} /> Download
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 border-t border-line/70 bg-[#FBFCF8] py-2 text-[8px] font-semibold text-muted">
            <ShieldCheck size={10} className="text-brand-dark" />
            Every payment is secured and instant
          </div>
        </div>
      </section>

      <section className="mt-5">
        <SectionHeader
          title="Send again"
          action="All contacts"
          onAction={() => openSheet("send")}
          className="mb-2 px-5"
        />
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-1">
          <button
            type="button"
            onClick={() => openSheet("send")}
            className="flex w-[54px] shrink-0 flex-col items-center gap-1.5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-[#BFD1C2] bg-white text-brand-dark">
              <QrCodeIcon size={18} />
            </span>
            <span className="text-[9px] font-semibold text-[#546258]">New</span>
          </button>
          {contacts.slice(0, 6).map((contact) => (
            <button
              key={contact.id}
              type="button"
              onClick={() => openSheet("send", { contactId: contact.id })}
              className="group flex w-[54px] shrink-0 flex-col items-center gap-1.5"
            >
              <span className="rounded-full transition-transform group-active:scale-95">
                <Avatar initials={contact.initials} tone={contact.tone} className="h-12 w-12 text-[11px]" />
              </span>
              <span className="max-w-full truncate text-[9px] font-semibold text-[#546258]">{contact.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4 px-5">
        <SectionHeader
          title="Pay a bill"
          action="See all"
          onAction={() => openSheet("pay")}
          className="mb-2"
        />
        <div className="grid grid-cols-4 gap-1.5 rounded-[22px] border border-black/[0.045] bg-white p-3 shadow-[0_8px_24px_-24px_rgba(10,31,22,0.5)]">
          {billers.slice(0, 4).map((biller) => (
            <button
              key={biller.id}
              type="button"
              onClick={() => openSheet("pay")}
              className="flex min-w-0 flex-col items-center gap-1.5 rounded-xl py-1 transition-colors hover:bg-[#F7F9F3]"
            >
              <BillerMark biller={biller} />
              <span className="w-full truncate text-center text-[8.5px] font-semibold text-[#546258]">
                {biller.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4 px-5">
        <button
          type="button"
          onClick={() => setTab("savings")}
          className="flex w-full items-center gap-3 overflow-hidden rounded-[20px] bg-[#0B2B1E] p-3.5 text-left"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-lime text-ink">
            <Sparkles size={16} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10.5px] font-bold text-white">Get up to ₱50 cashback</span>
            <span className="mt-0.5 block text-[8.5px] font-medium text-white/50">
              Pay any QR Ph merchant this week
            </span>
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/80">
            <ChevronRight size={13} />
          </span>
        </button>
      </section>
    </div>
  );
}
