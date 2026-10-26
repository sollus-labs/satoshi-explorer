import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = {
  readonly id: string;
  readonly label: string;
  readonly content: ReactNode;
};

export function Tabs({ items }: { readonly items: readonly TabItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const direction =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction) return;

    event.preventDefault();
    const next = (index + direction + items.length) % items.length;
    setActive(items[next]?.id ?? "");
    refs.current[next]?.focus();
  }

  const selected = items.find((item) => item.id === active) ?? items[0];

  return (
    <div className="min-w-0">
      <div
        className="flex h-[45px] gap-6 border-b border-[#242831]"
        role="tablist"
        aria-label="Visualização do descriptor"
      >
        {items.map((item, index) => {
          const isActive = selected?.id === item.id;

          return (
            <button
              key={item.id}
              ref={(node) => {
                refs.current[index] = node;
              }}
              id={`tab-${item.id}`}
              className={`relative border-0 bg-transparent text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7931a] ${isActive ? 'text-[#f2f2f3] after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-0.5 after:bg-[#f7931a] after:content-[""]' : "text-[#858b96] hover:text-[#d5d7dc]"}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {selected && (
        <section
          id={`panel-${selected.id}`}
          className="min-w-0 outline-offset-4"
          role="tabpanel"
          aria-labelledby={`tab-${selected.id}`}
          tabIndex={0}
        >
          {selected.content}
        </section>
      )}
    </div>
  );
}
