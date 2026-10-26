import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  readonly title: string;
  readonly content: ReactNode;
};

export function Accordion({
  items,
}: {
  readonly items: readonly AccordionItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#242831] border-t border-[#242831]">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `accordion-panel-${index}`;

        return (
          <section key={item.title}>
            <h3 className="m-0">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 bg-transparent py-3 text-left text-[10px] font-medium text-[#c7cad0] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7931a]"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                {item.title}
                <ChevronDown
                  size={17}
                  className={`shrink-0 text-[#858b96] transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              className="pr-1 pb-3 text-[10px] leading-relaxed text-[#9298a2]"
              hidden={!open}
            >
              {item.content}
            </div>
          </section>
        );
      })}
    </div>
  );
}
