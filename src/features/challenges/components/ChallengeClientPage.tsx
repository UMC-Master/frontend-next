'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import HeartIcon from '@/assets/svgs/heart.svg';
import BookmarkIcon from '@/assets/svgs/bookmark.svg';
import ShareIcon from '@/assets/svgs/share.svg';
import SearchIcon from '@/assets/svgs/search.svg';
import { getChallengeById, type ChallengeMode } from '../data/mockChallenges';
import ChallengeBottomBar from './ChallengeBottomBar/ChallengeBottomBar';
import ChallengeExampleGrid from './ChallengeExampleGrid/ChallengeExampleGrid';
import ChallengeHeroCarousel from './ChallengeHeroCarousel/ChallengeHeroCarousel';
import ChallengeNoticeList from './ChallengeNoticeList/ChallengeNoticeList';
import ChallengeStateModal from './ChallengeStateModal/ChallengeStateModal';

function Header({
  title,
  backHref,
  rightSlot,
}: {
  title: string;
  backHref?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="flex h-[54px] items-center justify-between">
        <div className="flex w-10 items-center">
          {backHref ? (
            <Link href={backHref} className="text-[28px] leading-none text-gray-1000">
              ←
            </Link>
          ) : (
            <div />
          )}
        </div>
        <h1 className="text-title2 text-gray-1000">{title}</h1>
        <div className="flex w-10 items-center justify-end">{rightSlot}</div>
      </div>
    </header>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_0_16px_0_rgba(234,234,234,1)]">
      <h2 className="mb-2 text-title3 text-gray-1000">{title}</h2>
      {children}
    </section>
  );
}

function BadgeRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map(tag => (
        <span
          key={tag}
          className="rounded-lg bg-gray-200 px-3 py-1.5 text-body2 text-gray-900"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function MetricChip({
  icon,
  value,
  accent,
}: {
  icon: React.ReactNode;
  value: string | number;
  accent?: 'red' | 'blue' | 'default';
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 shadow-[0_0_16px_0_rgba(234,234,234,1)]">
      {icon}
      <span
        className={clsx('text-body2', {
          'text-red': accent === 'red',
          'text-blue': accent === 'blue',
          'text-gray-900': !accent || accent === 'default',
        })}
      >
        {value}
      </span>
    </div>
  );
}

function ChallengeListPage() {
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

function HeroStrip({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-[15px]">
      {images.slice(0, 2).map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="relative aspect-square overflow-hidden rounded-[10px] bg-gray-300"
        >
          <Image src={image} alt={title} fill className="object-cover" sizes="200px" />
        </div>
      ))}
    </div>
  );
}

function HeroSingle({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative mb-4 h-[328px] overflow-hidden rounded-lg">
      <Image src={image} alt={title} fill className="object-cover" sizes="380px" />
    </div>
  );
}

function AuthorCard() {
  return (
    <div className="rounded-[10px] bg-gray-200 p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-title3 text-main-500">
          A
        </div>
        <div>
          <p className="text-title2 text-gray-1000">애니</p>
          <p className="text-caption1 text-gray-700">
            등급 자취마스터 · 이 달의 꿀팁 선정 20회
          </p>
        </div>
      </div>
    </div>
  );
}

function ChallengeDetailPage({ mode }: { mode: ChallengeMode }) {
  const params = useParams<{ id: string }>();
  const challenge = getChallengeById(params.id);
  const isPreview = mode === 'preview' || mode === 'preview-started';
  const showRating =
    mode !== 'active';
  const showAuthorFooter =
    mode === 'preview' ||
    mode === 'preview-started' ||
    mode === 'active-quit-confirm' ||
    mode === 'active-quit-success';

  return (
    <div className="pb-52">
      <Header title="챌린지" backHref="/challenges" />
      {isPreview || mode === 'active' ? (
        <HeroSingle image={challenge.heroImages[0]} title={challenge.title} />
      ) : (
        <HeroStrip images={challenge.heroImages} title={challenge.title} />
      )}

      <div className="space-y-6">
        <SectionCard title={challenge.title}>
          <p className="text-body2 text-main-500">{challenge.periodLabel}</p>
        </SectionCard>

        <SectionCard title="어떤 챌린지일까요?">
          <p className="text-body1 text-gray-1000">{challenge.description}</p>
        </SectionCard>

        <SectionCard title="인증방법">
          <div className="flex items-start gap-2">
            <span className="text-main-500">✓</span>
            <p className="text-body1 text-gray-1000">{challenge.verifyGuide}</p>
          </div>
        </SectionCard>

        <SectionCard title="인증 예시">
          <ChallengeExampleGrid examples={challenge.verifyExamples} />
        </SectionCard>

        <SectionCard title="챌린지 진행 시 유의사항">
          <ChallengeNoticeList notices={challenge.notices} />
        </SectionCard>

        <BadgeRow tags={challenge.tags} />

        <div className="flex flex-wrap gap-4">
          <MetricChip
            icon={<HeartIcon className="h-6 w-6 text-red" />}
            value={challenge.likes}
            accent="red"
          />
          <MetricChip
            icon={<BookmarkIcon className="h-6 w-6 text-blue" />}
            value={challenge.bookmarks}
            accent="blue"
          />
          <MetricChip
            icon={<ShareIcon className="h-6 w-6 text-gray-900" />}
            value={challenge.shares}
          />
          {showRating && (
            <MetricChip icon={<span className="text-[14px]">평점</span>} value={challenge.rating} />
          )}
        </div>

        {showAuthorFooter ? <AuthorCard /> : null}
      </div>

      <ChallengeBottomBar
        mode={mode}
        challengeId={challenge.id}
        periodLabel={challenge.bottomPeriodLabel}
        cadenceLabel={challenge.cadenceLabel}
      />

      {mode === 'preview-started' && (
        <ChallengeStateModal
          title="챌린지가 시작되었습니다."
          primaryLabel="확인"
          primaryHref={`/challenges/${challenge.id}?state=active`}
        />
      )}
      {mode === 'active-quit-confirm' && (
        <ChallengeStateModal
          title="그만두시겠습니까?"
          primaryLabel="그만두기"
          primaryHref={`/challenges/${challenge.id}?state=active-quit-success`}
          secondaryLabel="닫기"
          secondaryHref={`/challenges/${challenge.id}?state=active`}
        />
      )}
      {mode === 'active-quit-success' && (
        <ChallengeStateModal
          title="챌린지가 중단되었습니다."
          primaryLabel="확인"
          primaryHref={`/challenges/${challenge.id}?state=preview`}
        />
      )}
    </div>
  );
}

export default function ChallengeClientPage() {
  const params = useParams<{ id?: string }>();
  const searchParams = useSearchParams();

  if (!params.id) {
    return <ChallengeListPage />;
  }

  const rawState = searchParams.get('state') as ChallengeMode | null;
  const mode: ChallengeMode = rawState ?? 'preview';

  return <ChallengeDetailPage mode={mode} />;
}
