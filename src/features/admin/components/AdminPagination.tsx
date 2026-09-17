'use client';

import Image from 'next/image';

type AdminPaginationProps = {
  currentPage: number;
  totalPages?: number;
  onChange?: (page: number) => void;
};

export default function AdminPagination({
  currentPage,
  totalPages = 10,
  onChange,
}: AdminPaginationProps) {
  return (
    <nav className="flex items-center justify-center gap-2" aria-label="페이지 이동">
      <button
        type="button"
        onClick={() => onChange?.(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex size-12 items-center justify-center disabled:opacity-30"
        aria-label="이전 페이지"
      >
        <Image src="/admin/arrow-back.svg" alt="" width={12} height={12} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onChange?.(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`size-12 rounded-lg text-xl font-semibold ${page === currentPage ? 'bg-main-500 text-gray-100' : 'text-gray-900'}`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange?.(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex size-12 rotate-180 items-center justify-center disabled:opacity-30"
        aria-label="다음 페이지"
      >
        <Image src="/admin/arrow-back.svg" alt="" width={12} height={12} />
      </button>
    </nav>
  );
}
