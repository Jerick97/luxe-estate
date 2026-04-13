'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : '/');
  };

  // Generate page numbers to show
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];

    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push('...');

    pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 rounded-lg border border-nordic-dark/10 dark:border-white/10 text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      </button>

      {getPageNumbers().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-nordic-muted text-sm select-none">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
              page === currentPage
                ? 'bg-mosque text-white shadow-lg shadow-mosque/20'
                : 'border border-nordic-dark/10 dark:border-white/10 text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-lg border border-nordic-dark/10 dark:border-white/10 text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </nav>
  );
};
