export function ProgressBar({
  value,
  label,
}: {
  readonly value: number;
  readonly label: string;
}) {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-[9px] text-[#8e949e]">
        <span>{label}</span>
        <span className="font-semibold text-[#f2aa4f]">{progress}%</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-[#292d34]"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#e58215] to-[#ffb44f] transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
