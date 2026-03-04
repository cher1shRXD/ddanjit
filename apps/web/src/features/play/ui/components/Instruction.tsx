import { useState } from "react";

const PAGE_SIZE = 3;

interface Props {
  instructions: string[];
}

export const Instruction = ({ instructions }: Props) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(instructions.length / PAGE_SIZE);
  const paginated = instructions.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="flex flex-col w-full gap-3 p-4 rounded-xl bg-surface/60">
      <div className="flex flex-col w-full gap-2">
        {paginated.map((text, i) => {
          const globalIndex = page * PAGE_SIZE + i;
          return (
            <div key={globalIndex} className="flex gap-2 text-sm font-medium leading-relaxed text-text/60">
              <span className="shrink-0">{globalIndex + 1}.</span>
              <span>{text}</span>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between w-full">
          <button
            className="px-1 text-xs font-semibold transition-opacity text-text/40 disabled:opacity-0"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}>
            ← 이전
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-200 ${
                  i === page ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-text/20"
                }`}
              />
            ))}
          </div>
          <button
            className="px-1 text-xs font-semibold transition-opacity text-text/40 disabled:opacity-0"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages - 1}>
            다음 →
          </button>
        </div>
      )}
    </div>
  );
};
