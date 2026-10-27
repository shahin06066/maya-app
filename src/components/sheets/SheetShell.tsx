import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export function SheetShell({
  title,
  subtitle,
  onClose,
  children,
  className,
  compact = false,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className="absolute inset-0 z-50">
      <button
        type="button"
        aria-label="Close sheet"
        onClick={onClose}
        className="animate-fade-in absolute inset-0 cursor-default bg-ink/45 backdrop-blur-[2px]"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "animate-sheet-up absolute inset-x-0 bottom-0 flex max-h-[93%] flex-col overflow-hidden rounded-t-[30px] border-t border-white/80 bg-[#FAFBF7] shadow-[0_-20px_60px_rgba(4,20,13,0.24)]",
          className,
        )}
      >
        <div className="flex shrink-0 justify-center pb-1 pt-2.5">
          <span className="h-[3px] w-9 rounded-full bg-[#CAD2C9]" />
        </div>
        <header className="flex shrink-0 items-start justify-between gap-4 px-5 pb-3 pt-1.5">
          <div className="min-w-0">
            <h2 className="text-[18px] font-extrabold leading-tight tracking-[-0.035em] text-ink">{title}</h2>
            {subtitle && <p className="mt-1 text-[9.5px] font-medium leading-relaxed text-muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-[#5E6B61] transition-transform active:scale-95"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </header>
        <div
          className={cn(
            "no-scrollbar overflow-y-auto overscroll-contain px-5",
            compact ? "pb-4" : "pb-[max(22px,env(safe-area-inset-bottom))]",
          )}
        >
          {children}
        </div>
      </section>
    </div>
  );
}

export function SheetField({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.09em] text-[#7B887E]">
        {label}
        {hint && <span className="text-[8px] font-medium normal-case tracking-normal text-muted">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function StepBack({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-3 inline-flex items-center gap-1 text-[9.5px] font-bold text-[#68766C] transition-colors hover:text-ink"
    >
      <span aria-hidden="true">←</span> {label}
    </button>
  );
}
