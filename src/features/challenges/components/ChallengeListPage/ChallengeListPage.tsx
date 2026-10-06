'use client';

import Link from 'next/link';
import SearchIcon from '@/assets/svgs/search.svg';
import { useOngoingChallenge } from '@/api/challenge/useOngoingChallenge';
import Image from 'next/image';

export default function ChallengeListPage() {
  const query = useOngoingChallenge();
  const featured = query.data;

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-20 bg-white">
        <div className="flex h-[54px] items-center justify-between">
          <h1 className="text-title2 text-gray-1000">홈마스터</h1>
          <Link href="/search" aria-label="검색">
            <SearchIcon className="h-8 w-8 text-gray-1000" />
          </Link>
        </div>
      </header>
      <section className="pt-1">
        <h2 className="mb-8 text-title2 whitespace-pre-line text-gray-1000">
          {'안녕하세요:)\n이번주 챌린지도'}
        </h2>
        {query.isPending && <p role="status">챌린지를 불러오는 중...</p>}
        {query.isError && (
          <div role="alert">
            {query.error.message}{' '}
            <button type="button" onClick={() => query.refetch()}>
              다시 시도
            </button>
          </div>
        )}
        {query.isSuccess && !featured && <p>진행 중인 챌린지가 없습니다.</p>}
        {featured && (
          <>
            <Link
              href={`/challenges/${featured.challengeId}`}
              className="block"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src={featured.imageUrl || '/images/tip-placeholder.svg'}
                  alt={featured.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-title3">{featured.title}</h3>
              <p className="my-3 text-body2">
                {new Date(featured.startDate).toLocaleDateString('ko-KR')} ~{' '}
                {new Date(featured.endDate).toLocaleDateString('ko-KR')}
              </p>
            </Link>
            <Link
              href={`/challenges/${featured.challengeId}`}
              className="flex h-[52px] items-center justify-center rounded-2xl bg-main-500 text-title3 text-gray-200"
            >
              챌린지 자세히 보기
            </Link>
          </>
        )}
      </section>
    </div>
  );
}
