'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, FormEvent, KeyboardEvent } from 'react';
import BackwardIcon from '@/assets/svgs/arrow_backward.svg';
import SearchIcon from '@/assets/svgs/search.svg';
import Image from 'next/image';

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

  // ✅ 검색 실행
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = q.trim();
    if (!next) {
      router.push('/search');
      return;
    }
    router.push(`/search?query=${encodeURIComponent(next)}`);
  };

  // ✅ 엔터키로도 검색 가능하게
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(e as never);
    }
  };

  // ✅ 뒤로가기 동작: 검색어 있을 때는 초기화, 없으면 메인으로
  const onBack = () => {
    if (q.trim()) {
      setQ('');
      router.push('/search');
    } else {
      router.replace('/main');
    }
  };

  return (
    <>
      <div className="pb-4">
        <div className="flex flex-row justify-between gap-3">
          {/* 뒤로가기 */}
          <button aria-label="뒤로가기" onClick={onBack}>
            <Image
              src={BackwardIcon}
              alt="backward icon"
              width={28}
              height={28}
            />
          </button>

          {/* 검색 입력 */}
          <form onSubmit={onSubmit} className="flex-1">
            <div className="flex items-center justify-between rounded-lg border-[0.4px] border-gray-600 bg-gray-100 px-3 py-2.5">
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="검색어를 입력해 주세요"
                className="bg-transparent outline-none text-body2 pr-3 flex-1"
              />
              {/* 쿼리 파라미터가 없을 때만 검색 아이콘 표시 */}
              {!initialQuery && (
                <button type="submit" aria-label="검색">
                  <Image
                    src={SearchIcon}
                    alt="search icon"
                    width={24}
                    height={24}
                  />
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
