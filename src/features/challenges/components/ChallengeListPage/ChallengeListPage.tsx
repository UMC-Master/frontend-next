import Link from 'next/link';
import SearchIcon from '@/assets/svgs/search.svg';
import { getChallengeById } from '../../data/mockChallenges';
import ChallengeHeroCarousel from '../ChallengeHeroCarousel/ChallengeHeroCarousel';

export default function ChallengeListPage() {
  const featured = getChallengeById('soft-serve');
  const cards = featured.heroImages;

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-20 bg-white">
        <div className="flex h-[54px] items-center justify-between">
          <h1 className="text-title2 text-gray-1000">홈마스터</h1>
          <SearchIcon className="h-8 w-8 text-gray-1000" />
        </div>
      </header>
      <section className="pt-1">
        <h2 className="mb-8 text-title2 whitespace-pre-line text-gray-1000">
          {'안녕하세요:)\n이번주 챌린지도'}
        </h2>
        <ChallengeHeroCarousel images={cards} title={featured.title} />
        <Link
          href="/challenges/recycle"
          className="flex h-[52px] items-center justify-center rounded-2xl bg-main-500 text-title3 text-gray-200"
        >
          챌린지 인증하러가기
        </Link>
      </section>
    </div>
  );
}
