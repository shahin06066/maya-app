import { Eye, EyeOff, Snowflake, Wifi } from "lucide-react";
import { cn } from "../utils/cn";
import { useMaya } from "../lib/store";

function Chip() {
  return (
    <span className="relative block h-[27px] w-[36px] overflow-hidden rounded-[6px] border border-[#CBBB83]/70 bg-gradient-to-br from-[#F1E5B9] via-[#D8C58C] to-[#AE9B5F]">
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#9A8751]/70" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#9A8751]/70" />
      <span className="absolute left-[6px] top-[5px] h-[6px] w-[7px] rounded-[1px] border border-[#9A8751]/80" />
      <span className="absolute bottom-[5px] right-[6px] h-[6px] w-[7px] rounded-[1px] border border-[#9A8751]/80" />
    </span>
  );
}

export function CardVisual({
  className,
  hideControls = false,
}: {
  className?: string;
  hideControls?: boolean;
}) {
  const { frozen, cardRevealed, toggleCardDetails } = useMaya();

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[26px] border border-white/[0.06] bg-[linear-gradient(128deg,#1B4434_0%,#081B13_46%,#12402F_100%)] p-5 text-white shadow-[0_22px_40px_-20px_rgba(7,31,21,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-lime/10" />
      <div className="absolute -right-5 -top-8 h-28 w-28 rounded-full border border-lime/15" />
      <div className="absolute -bottom-16 -left-6 h-40 w-40 rounded-full bg-[#2D8F58]/25 blur-2xl" />
      <div className="absolute right-4 top-16 h-24 w-24 rounded-full bg-lime/[0.07] blur-xl" />
      <div className="card-sheen pointer-events-none absolute inset-0" />
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "linear-gradient(135deg, transparent 25%, black 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[20px] font-extrabold leading-none tracking-[-0.07em]">maya</span>
            <span className="mt-[2px] block h-1.5 w-1.5 rounded-full bg-lime" />
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 text-[7.5px] font-bold uppercase tracking-[0.15em] text-white/80">
              debit
            </span>
            {!hideControls && (
              <button
                type="button"
                onClick={toggleCardDetails}
                aria-label={cardRevealed ? "Hide card details" : "Show card details"}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/85 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {cardRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between pb-3.5 pt-5">
          <Chip />
          <Wifi size={23} strokeWidth={1.5} className="rotate-90 text-white/65" />
        </div>

        <p className="font-mono text-[15px] font-medium tracking-[0.065em] text-white/95">
          {cardRevealed ? "5123 4567 8901 4827" : "••••  ••••  ••••  4827"}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-4">
          <div>
            <p className="text-[7px] font-semibold uppercase tracking-[0.18em] text-white/45">Card holder</p>
            <p className="mt-1 text-[9.5px] font-bold uppercase tracking-[0.08em] text-white/90">Mia Santos</p>
          </div>
          <div>
            <p className="text-[7px] font-semibold uppercase tracking-[0.18em] text-white/45">Valid thru</p>
            <p className="mt-1 text-[9.5px] font-bold tracking-[0.08em] text-white/90">
              {cardRevealed ? "09/29" : "••/••"}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[21px] font-extrabold italic leading-none tracking-[-0.06em] text-white">
              VISA
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-[7px] font-semibold tracking-wide text-lime/80">
              {frozen ? "FROZEN" : "ACTIVE"}
              <span className={cn("h-1 w-1 rounded-full", frozen ? "bg-white/50" : "bg-lime")} />
            </span>
          </div>
        </div>
      </div>

      {frozen && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-[#081B13]/55 backdrop-blur-[7px]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lime">
            <Snowflake size={20} />
          </span>
          <p className="text-[12px] font-bold">Card frozen</p>
          <p className="text-[9px] text-white/65">Unfreeze it anytime</p>
        </div>
      )}
    </div>
  );
}
