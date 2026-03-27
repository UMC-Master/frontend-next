'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, FormEvent, KeyboardEvent } from 'react';
import BackwardIcon from '@/assets/svgs/arrow_backward.svg';
import SearchIcon from '@/assets/svgs/search.svg';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') ?? '';

  const [q, setQ] = useState(initialQuery);

  useEffect(() => {
    setQ(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const next = q.trim();

    if (!next) {
      router.push('/search');
      return;
    }

    router.push(`/search?query=${encodeURIComponent(next)}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (q.trim()) {
      setQ('');
      router.push('/search');
      return;
    }

    router.replace('/main');
  };

  return (
    <>
      <div className="pb-4">
        <div className="flex flex-row justify-between gap-3">
          {/* 뒤로가기 */}
          <button type="button" aria-label="뒤로가기" onClick={handleBack}>
            <BackwardIcon className="h-7 w-7" />
          </button>
          {/* 검색 입력 */}
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="flex items-center justify-between rounded-lg border-[0.4px] border-gray-600 bg-gray-100 px-3 py-2.5">
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="검색어를 입력해 주세요"
                className="flex-1 bg-transparent pr-3 text-body2 outline-none"
              />
              {/* 쿼리 파라미터가 없을 때만 검색 아이콘 표시 */}
              {!initialQuery && (
                <button type="submit" aria-label="검색">
                  <SearchIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <main>{children}</main>
    </>
  );
}