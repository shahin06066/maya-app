import {
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Copy,
  FileText,
  Fingerprint,
  Info,
  LifeBuoy,
  Link2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Avatar, ScreenHeader, SectionHeader, Toggle } from "../components/ui";
import { useMaya } from "../lib/store";
import type { InfoTopic } from "../lib/data";

interface MenuItem {
  label: string;
  description: string;
  icon: LucideIcon;
  topic: InfoTopic;
  accent: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Personal information",
    description: "Name, email and mobile number",
    icon: UserRound,
    topic: "personal",
    accent: "bg-[#E6F5EA] text-brand-dark",
  },
  {
    label: "Security & privacy",
    description: "PIN, Face Scan and devices",
    icon: ShieldCheck,
    topic: "security",
    accent: "bg-[#E4F0FE] text-[#27628C]",
  },
  {
    label: "Linked accounts",
    description: "Banks and funding sources",
    icon: Link2,
    topic: "linked",
    accent: "bg-[#F1E8FE] text-[#6C489A]",
  },
  {
    label: "Statements & documents",
    description: "Download account records",
    icon: FileText,
    topic: "statement",
    accent: "bg-[#FFF0DB] text-[#946229]",
  },
];

export function ProfileScreen() {
  const {
    faceScan,
    setFaceScan,
    pushEnabled,
    setPushEnabled,
    openSheet,
    notify,
    copy,
  } = useMaya();

  return (
    <div className="pb-5">
      <ScreenHeader
        eyebrow="Your Maya"
        title="Profile"
        action={
          <button
            type="button"
            onClick={() => openSheet("info", { topic: "security" })}
            aria-label="Profile settings"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-transform active:scale-95"
          >
            <SlidersHorizontal size={17} />
          </button>
        }
      />

      <section className="px-5">
        <div className="relative isolate overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#173E2C_0%,#09251A_60%,#0D3323_100%)] p-4 text-white shadow-[0_20px_35px_-20px_rgba(9,37,26,0.65)]">
          <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full border border-lime/15" />
          <div className="pointer-events-none absolute -bottom-16 -left-6 h-36 w-36 rounded-full bg-[#1A8F59]/20 blur-2xl" />
          <div className="relative flex items-start gap-3">
            <button
              type="button"
              onClick={() => notify("Profile photo controls are ready")}
              className="group relative shrink-0 rounded-full ring-[3px] ring-white/10"
              aria-label="Change profile photo"
            >
              <Avatar initials="MS" tone="mint" className="h-[58px] w-[58px] text-[16px]" online />
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Sparkles size={16} className="text-lime" />
              </span>
            </button>
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[16px] font-extrabold tracking-[-0.03em]">Mia Santos</p>
                <BadgeCheck size={14} fill="#0FAE6D" className="shrink-0 text-[#0B2B1E]" />
              </div>
              <p className="mt-0.5 text-[9.5px] font-semibold text-white/50">@miasantos</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.07] px-2 py-1 text-[7.5px] font-bold uppercase tracking-[0.09em] text-lime/90">
                <ShieldCheck size={9} /> Fully verified
              </div>
            </div>
            <button
              type="button"
              onClick={() => openSheet("info", { topic: "personal" })}
              aria-label="Edit personal information"
              className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="relative mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.08] pt-3">
            <div>
              <p className="text-[7.5px] font-semibold uppercase tracking-[0.11em] text-white/35">Maya since</p>
              <p className="mt-1 text-[11px] font-bold text-white/90">May 2022</p>
            </div>
            <div className="border-l border-white/[0.08] pl-3">
              <p className="text-[7.5px] font-semibold uppercase tracking-[0.11em] text-white/35">Mission points</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-white/90">
                2,480 <Sparkles size={10} className="text-lime" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 px-5">
        <SectionHeader title="My account" className="mb-2" />
        <div className="rounded-[20px] border border-black/[0.045] bg-white p-3.5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#E8F5DF] text-[13px] font-extrabold text-brand-dark">
              M
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-[11.5px] font-bold tracking-[-0.015em] text-ink">Maya Bank</p>
                <BadgeCheck size={11} fill="#0FAE6D" className="text-white" />
              </div>
              <p className="mt-0.5 text-[9px] font-medium text-muted">Savings account · 0123 4567 8971</p>
            </div>
            <button
              type="button"
              onClick={() => copy("012345678971", "Account number copied")}
              aria-label="Copy account number"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F6EF] text-muted transition-colors hover:text-ink"
            >
              <Copy size={13} />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-line/70 pt-2.5">
            <p className="flex items-center gap-1 text-[8px] font-semibold text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> PDIC insured up to ₱1M
            </p>
            <button
              type="button"
              onClick={() => openSheet("info", { topic: "linked" })}
              className="inline-flex items-center gap-0.5 text-[8.5px] font-bold text-brand-dark"
            >
              Manage <ArrowUpRight size={10} />
            </button>
          </div>
        </div>
      </section>

      <section className="mt-4 px-5">
        <SectionHeader title="Preferences" className="mb-2" />
        <div className="divide-y divide-line/70 rounded-[20px] border border-black/[0.045] bg-white px-3.5">
          <div className="flex items-center gap-3 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#E6F5EA] text-brand-dark">
              <Fingerprint size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-ink">Face Scan</p>
              <p className="mt-0.5 text-[8.5px] font-medium text-muted">Log in and approve with a glance</p>
            </div>
            <Toggle
              checked={faceScan}
              onChange={(value) => {
                setFaceScan(value);
                notify(value ? "Face Scan enabled" : "Face Scan disabled");
              }}
              label="Face Scan"
            />
          </div>
          <div className="flex items-center gap-3 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#E4F0FE] text-[#27628C]">
              <Sparkles size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-ink">Push notifications</p>
              <p className="mt-0.5 text-[8.5px] font-medium text-muted">Payments, rewards and reminders</p>
            </div>
            <Toggle
              checked={pushEnabled}
              onChange={(value) => {
                setPushEnabled(value);
                notify(value ? "Notifications enabled" : "Notifications paused");
              }}
              label="Push notifications"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 px-5">
        <SectionHeader title="Account & support" className="mb-2" />
        <div className="divide-y divide-line/70 overflow-hidden rounded-[20px] border border-black/[0.045] bg-white px-3.5">
          {menuItems.map(({ label, description, icon: Icon, topic, accent }) => (
            <button
              key={label}
              type="button"
              onClick={() => openSheet("info", { topic })}
              className="flex w-full items-center gap-3 py-3 text-left transition-opacity active:opacity-60"
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${accent}`}>
                <Icon size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold text-ink">{label}</span>
                <span className="mt-0.5 block truncate text-[8.5px] font-medium text-muted">{description}</span>
              </span>
              <ChevronRight size={14} className="shrink-0 text-[#A8B2AB]" />
            </button>
          ))}
        </div>
      </section>

      <section className="px-5">
        <button
          type="button"
          onClick={() => openSheet("info", { topic: "help" })}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-[16px] bg-[#EAF2E4] py-2.5 text-[9.5px] font-bold text-[#4C6149]"
        >
          <LifeBuoy size={12} /> Need a hand? Chat with Maya
        </button>
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[8px] font-medium text-muted/80">
          <Info size={10} />
          Maya app · v2.8.1
          <span className="h-1 w-1 rounded-full bg-muted/40" />
          Made for the Philippines
        </div>
      </section>
    </div>
  );
}
