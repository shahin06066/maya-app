import { cn } from "../utils/cn";

export function MayaMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-ink",
        className ?? "h-7 w-7",
      )}
      aria-hidden="true"
    >
      <span className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-brand" />
      <svg viewBox="0 0 24 24" fill="none" className="relative h-[62%] w-[62%]">
        <path
          d="M4.5 17.5V8.8c0-1.3 1.6-1.9 2.4-.9l2.9 3.6 2.2-3.6c.4-.7 1.4-.7 1.8 0l2.2 3.6 2.9-3.6c.8-1 2.4-.4 2.4.9v8.7"
          stroke="#D4F77A"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function MayaLogo({
  light = false,
  compact = false,
  className,
}: {
  light?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)} aria-label="Maya">
      <MayaMark className={compact ? "h-6 w-6 rounded-[8px]" : "h-8 w-8"} />
      <span
        className={cn(
          "font-extrabold leading-none tracking-[-0.065em]",
          compact ? "text-[21px]" : "text-[26px]",
          light ? "text-white" : "text-ink",
        )}
      >
        maya
      </span>
    </div>
  );
}

const QR_SIZE = 27;

function inFinderArea(x: number, y: number) {
  const origins = [
    [1, 1],
    [QR_SIZE - 8, 1],
    [1, QR_SIZE - 8],
  ];
  return origins.some(([ox, oy]) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7);
}

function finderCell(x: number, y: number) {
  const origins = [
    [1, 1],
    [QR_SIZE - 8, 1],
    [1, QR_SIZE - 8],
  ];
  for (const [ox, oy] of origins) {
    const lx = x - ox;
    const ly = y - oy;
    if (lx >= 0 && lx < 7 && ly >= 0 && ly < 7) {
      const outer = lx === 0 || lx === 6 || ly === 0 || ly === 6;
      const inner = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
      return outer || inner;
    }
  }
  return null;
}

function makeQrCells(seed: number) {
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < QR_SIZE; y += 1) {
    for (let x = 0; x < QR_SIZE; x += 1) {
      const finder = finderCell(x, y);
      const isDark =
        finder ??
        ((x * 17 + y * 31 + x * y * 7 + seed * 13) % 11 < 5 &&
          !inFinderArea(x, y));
      if (isDark) cells.push({ x, y });
    }
  }
  return cells;
}

export function QrCode({
  seed = 4,
  className,
  dark = false,
}: {
  seed?: number;
  className?: string;
  dark?: boolean;
}) {
  const cells = makeQrCells(seed);
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-[18px] p-2",
        dark ? "bg-white" : "border border-line/80 bg-white shadow-sm",
        className,
      )}
      role="img"
      aria-label="Maya personal QR code"
    >
      <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} className="h-full w-full" shapeRendering="crispEdges">
        <rect width={QR_SIZE} height={QR_SIZE} fill="#ffffff" />
        {cells.map(({ x, y }) => (
          <rect
            key={`${x}-${y}`}
            x={x + 0.08}
            y={y + 0.08}
            width={0.84}
            height={0.84}
            rx={0.26}
            fill="#0A1F16"
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-[19%] w-[19%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[8px] border-[3px] border-white bg-ink shadow-sm">
        <MayaMark className="h-[55%] w-[55%] rounded-[3px] bg-white" />
      </div>
    </div>
  );
}
