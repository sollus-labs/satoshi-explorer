import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

export type DropdownOption<T extends string> = {
  readonly value: T;
  readonly label: string;
};

type DropdownMenuProps<T extends string> = {
  readonly label: string;
  readonly value: T;
  readonly options: readonly DropdownOption<T>[];
  readonly onChange: (value: T) => void;
  readonly className?: string;
};

export function DropdownMenu<T extends string>({
  label,
  value,
  options,
  onChange,
  className = "",
}: DropdownMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  useEffect(() => {
    if (!open) return;

    root.current
      ?.querySelector<HTMLButtonElement>(
        '[role="menuitemradio"][aria-checked="true"]',
      )
      ?.focus();

    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function handleMenuKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const items = root.current?.querySelectorAll<HTMLButtonElement>(
      '[role="menuitemradio"]',
    );
    if (!items?.length) return;

    const focusedIndex = Array.from(items).indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const currentIndex = focusedIndex >= 0 ? focusedIndex : selectedIndex;
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const next = (currentIndex + direction + items.length) % items.length;
    items[next]?.focus();
  }

  return (
    <div ref={root} className={`relative flex items-center gap-2 ${className}`}>
      <span className="text-[9px] text-[#858b96]">{label}</span>
      <button
        ref={trigger}
        type="button"
        className="inline-flex min-h-[31px] min-w-0 flex-1 items-center justify-between gap-2 truncate rounded-md border border-[#2a2f38] bg-[#15181e] px-2.5 text-left text-[10px] text-[#c5c8ce] transition-colors hover:bg-[#20242b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7931a] sm:flex-none"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        {options.find((option) => option.value === value)?.label ??
          "Selecionar"}
        <ChevronDown size={15} aria-hidden="true" />
      </button>
      {open && (
        <div
          className="absolute top-[calc(100%+6px)] right-0 z-20 min-w-[200px] rounded-lg border border-[#30343d] bg-[#171a20] p-1 shadow-xl shadow-black/50"
          role="menu"
          aria-label={label}
          onKeyDown={handleMenuKey}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={value === option.value}
              className="flex w-full items-center justify-between gap-2 rounded px-2.5 py-2 text-left text-[10px] text-[#c3c6cc] transition-colors hover:bg-[#252a32] focus-visible:bg-[#252a32] focus-visible:outline-none"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              {option.label}
              {value === option.value && (
                <Check
                  size={15}
                  className="shrink-0 text-[#f7931a]"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
