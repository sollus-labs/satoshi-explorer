import { ChevronLeft, ChevronRight } from "lucide-react";

export type PaginationProps = {
  readonly totalPages: number;
  readonly currentPage: number;
  readonly onPageChange: (page: number) => void;
};

type PageItem = number | "ellipsis-left" | "ellipsis-right";

function visiblePages(
  totalPages: number,
  currentPage: number,
): readonly PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const candidates = new Set(
    [1, totalPages, currentPage - 1, currentPage, currentPage + 1].filter(
      (page) => page >= 1 && page <= totalPages,
    ),
  );
  const result: PageItem[] = [];
  let previous = 0;

  for (const page of [...candidates].sort((a, b) => a - b)) {
    if (page - previous === 2) result.push(previous + 1);
    else if (page - previous > 2) {
      result.push(page < currentPage ? "ellipsis-left" : "ellipsis-right");
    }
    result.push(page);
    previous = page;
  }

  return result;
}

const pageButtonClass =
  "grid h-[26px] min-w-[26px] place-items-center rounded-md border px-1.5 text-[10px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7931a] disabled:cursor-not-allowed disabled:opacity-35";

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages < 2) return null;

  const pages = visiblePages(totalPages, currentPage);

  return (
    <nav className="flex items-center gap-1" aria-label="Paginação">
      <button
        className={`${pageButtonClass} border-[#2b3038] bg-transparent text-[#969ca6] hover:bg-[#20242b]`}
        type="button"
        aria-label="Página anterior"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={17} aria-hidden="true" />
      </button>
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            className={`${pageButtonClass} ${currentPage === page ? "border-[#69451e] bg-[#2a1d10] text-[#ffb358]" : "border-transparent bg-transparent text-[#969ca6] hover:bg-[#20242b]"}`}
            key={page}
            type="button"
            aria-label={`Página ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span
            className="px-0.5 text-[10px] text-[#747a84]"
            key={`${page}-${index}`}
            aria-hidden="true"
          >
            …
          </span>
        ),
      )}
      <button
        className={`${pageButtonClass} border-[#2b3038] bg-transparent text-[#969ca6] hover:bg-[#20242b]`}
        type="button"
        aria-label="Próxima página"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={17} aria-hidden="true" />
      </button>
    </nav>
  );
}
