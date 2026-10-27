import { ArrowUpRight, ScanLine, Send, ShieldCheck, Sparkles, Sprout } from "lucide-react";
import { MayaProvider } from "./lib/store";
import { AppShell } from "./components/AppShell";
import { MayaLogo } from "./components/brand";

const highlights = [
  {
    icon: Send,
    title: "Move money instantly",
    body: "Fee-free transfers to any Maya user, any time.",
  },
  {
    icon: Sprout,
    title: "Grow at 4.5% p.a.",
    body: "Everyday savings, with no lock-in and no minimum.",
  },
  {
    icon: ScanLine,
    title: "Pay wherever life goes",
    body: "One QR for shops, bills, load and everything between.",
  },
];

function DesktopIntro() {
  return (
    <aside className="relative hidden w-[360px] shrink-0 flex-col lg:flex xl:w-[430px]">
      <div className="flex items-center justify-between">
        <MayaLogo />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/[0.08] bg-white/55 px-3 py-1.5 text-[8.5px] font-extrabold uppercase tracking-[0.11em] text-[#526457] backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          Live app preview
        </span>
      </div>

      <div className="mt-12 xl:mt-14">
        <p className="mb-4 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#5B715D]">
          Your money, made simple
          <span className="h-px w-7 bg-ink/20" />
        </p>
        <h1 className="text-[48px] font-extrabold leading-[0.97] tracking-[-0.065em] text-ink xl:text-[59px]">
          All your money.
          <br />
          One{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-[5px] -z-0 h-[13px] -rotate-[1.5deg] rounded-full bg-lime xl:bottom-[8px] xl:h-[16px]" />
            <span className="relative z-10">simple</span>
          </span>{" "}
          app.
        </h1>
        <p className="mt-5 max-w-[365px] text-[12px] font-medium leading-[1.8] text-[#61736A] xl:text-[13px]">
          A wallet and a digital bank, together in one thoughtful place. Send, spend, save and grow — at
          your own pace.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {highlights.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-white/70 bg-white/70 text-brand-dark shadow-[0_4px_12px_rgba(10,31,22,0.04)] backdrop-blur-sm">
              <Icon size={16} strokeWidth={2.1} />
            </span>
            <div>
              <p className="text-[11px] font-extrabold tracking-[-0.01em] text-ink">{title}</p>
              <p className="mt-1 max-w-[290px] text-[9.5px] font-medium leading-[1.7] text-[#7A8C7F]">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-3 border-t border-ink/[0.08] pt-5">
        <div className="flex -space-x-2">
          {["MS", "AC", "MR"].map((initials, index) => (
            <span
              key={initials}
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#EBF0E7] text-[7px] font-extrabold ${
                index === 0
                  ? "bg-ink text-lime"
                  : index === 1
                    ? "bg-[#DCF2C9] text-[#4F681C]"
                    : "bg-[#DDEAF7] text-[#376178]"
              }`}
            >
              {initials}
            </span>
          ))}
        </div>
        <p className="text-[9px] font-semibold leading-relaxed text-[#74867A]">
          Built for the way you live.
          <br />
          <span className="text-ink/60">Try every button — it all works.</span>
        </p>
        <ArrowUpRight size={14} className="ml-auto text-[#809084]" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[7.5px] font-bold uppercase tracking-[0.08em] text-[#8B9A8F]">
        <span className="flex items-center gap-1">
          <ShieldCheck size={10} /> PDIC insured
        </span>
        <span className="h-1 w-1 rounded-full bg-[#AFBBAF]" />
        <span className="flex items-center gap-1">
          <Sparkles size={10} /> Maya Bank
        </span>
        <span className="h-1 w-1 rounded-full bg-[#AFBBAF]" />
        <span>QR Ph ready</span>
      </div>
    </aside>
  );
}

function PhoneStage() {
  return (
    <div className="relative z-10 flex w-full justify-center md:w-auto">
      <div className="pointer-events-none absolute -right-16 top-16 hidden h-[280px] w-[280px] rounded-full bg-lime/35 blur-3xl md:block" />
      <div className="pointer-events-none absolute -left-16 bottom-20 hidden h-48 w-48 rounded-full border border-brand/15 lg:block" />
      <div className="pointer-events-none absolute bottom-32 right-full mr-4 hidden rotate-[-7deg] rounded-[22px] border border-white/80 bg-white/80 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(10,31,22,0.25)] backdrop-blur-md xl:block">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#E8F7D8] text-brand-dark">
            <Sprout size={14} />
          </span>
          <div>
            <p className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#849287]">Maya Savings</p>
            <p className="mt-0.5 text-[10px] font-extrabold text-ink">4.5% p.a.</p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-full top-[47%] ml-4 hidden rotate-[6deg] rounded-[20px] border border-white/80 bg-white/80 px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(10,31,22,0.25)] backdrop-blur-md xl:block">
        <p className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#849287]">Cashback earned</p>
        <p className="mt-1 text-[12px] font-extrabold tracking-[-0.02em] text-ink">+₱1,248.50</p>
      </div>
      <AppShell />
    </div>
  );
}

export default function App() {
  return (
    <MayaProvider>
      <div className="stage-bg relative flex min-h-[100dvh] w-full flex-col overflow-hidden">
        <div className="stage-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-[6%] -top-[18%] hidden h-[520px] w-[520px] rounded-full border-[1.5px] border-ink/[0.055] lg:block" />
        <div className="pointer-events-none absolute -right-[2%] -top-[10%] hidden h-[380px] w-[380px] rounded-full border border-ink/[0.04] lg:block" />
        <div className="pointer-events-none absolute -bottom-28 -left-32 hidden h-[370px] w-[370px] rounded-full bg-brand/[0.07] blur-3xl lg:block" />
        <div className="pointer-events-none absolute bottom-8 left-8 hidden select-none font-serif text-[150px] italic leading-none text-ink/[0.025] xl:block">
          maya
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center gap-10 lg:gap-12 lg:px-10 lg:py-5 xl:gap-24 xl:px-16">
          <DesktopIntro />
          <PhoneStage />
        </div>

        <div className="pointer-events-none absolute bottom-3 left-8 hidden items-center gap-2 text-[7.5px] font-semibold uppercase tracking-[0.11em] text-[#87968A] xl:flex">
          Independent UI concept · Not affiliated with Maya
        </div>
        <div className="pointer-events-none absolute bottom-3 right-8 hidden items-center gap-2 text-[7.5px] font-semibold uppercase tracking-[0.11em] text-[#87968A] xl:flex">
          <span className="h-1 w-1 rounded-full bg-brand" /> Everything updates live
        </div>
      </div>
    </MayaProvider>
  );
}
