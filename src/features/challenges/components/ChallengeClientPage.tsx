'use client';

import { useParams, useSearchParams } from 'next/navigation';
import HeartIcon from '@/assets/svgs/heart.svg';
import BookmarkIcon from '@/assets/svgs/bookmark.svg';
import ShareIcon from '@/assets/svgs/share.svg';
import { getChallengeById, type ChallengeMode } from '../data/mockChallenges';
import ChallengeAuthorCard from './ChallengeAuthorCard/ChallengeAuthorCard';
import ChallengeBottomBar from './ChallengeBottomBar/ChallengeBottomBar';
import ChallengeExampleGrid from './ChallengeExampleGrid/ChallengeExampleGrid';
import ChallengeHeroSingle from './ChallengeHeroSingle/ChallengeHeroSingle';
import ChallengeHeroStrip from './ChallengeHeroStrip/ChallengeHeroStrip';
import ChallengeListPage from './ChallengeListPage/ChallengeListPage';
import ChallengeMetricChip from './ChallengeMetricChip/ChallengeMetricChip';
import ChallengeNoticeList from './ChallengeNoticeList/ChallengeNoticeList';
import ChallengePageHeader from './ChallengePageHeader/ChallengePageHeader';
import ChallengeSectionCard from './ChallengeSectionCard/ChallengeSectionCard';
import ChallengeStateModal from './ChallengeStateModal/ChallengeStateModal';
import ChallengeTagList from './ChallengeTagList/ChallengeTagList';

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
      <ChallengePageHeader title="챌린지" backHref="/challenges" />
      {isPreview || mode === 'active' ? (
        <ChallengeHeroSingle image={challenge.heroImages[0]} title={challenge.title} />
      ) : (
        <ChallengeHeroStrip images={challenge.heroImages} title={challenge.title} />
      )}

      <div className="space-y-6">
        <ChallengeSectionCard title={challenge.title}>
          <p className="text-body2 text-main-500">{challenge.periodLabel}</p>
        </ChallengeSectionCard>

        <ChallengeSectionCard title="어떤 챌린지일까요?">
          <p className="text-body1 text-gray-1000">{challenge.description}</p>
        </ChallengeSectionCard>

        <ChallengeSectionCard title="인증방법">
          <div className="flex items-start gap-2">
            <span className="text-main-500">✓</span>
            <p className="text-body1 text-gray-1000">{challenge.verifyGuide}</p>
          </div>
        </ChallengeSectionCard>

        <ChallengeSectionCard title="인증 예시">
          <ChallengeExampleGrid examples={challenge.verifyExamples} />
        </ChallengeSectionCard>

        <ChallengeSectionCard title="챌린지 진행 시 유의사항">
          <ChallengeNoticeList notices={challenge.notices} />
        </ChallengeSectionCard>

        <ChallengeTagList tags={challenge.tags} />

        <div className="flex flex-wrap gap-4">
          <ChallengeMetricChip
            icon={<HeartIcon className="h-6 w-6 text-red" />}
            value={challenge.likes}
            accent="red"
          />
          <ChallengeMetricChip
            icon={<BookmarkIcon className="h-6 w-6 text-blue" />}
            value={challenge.bookmarks}
            accent="blue"
          />
          <ChallengeMetricChip
            icon={<ShareIcon className="h-6 w-6 text-gray-900" />}
            value={challenge.shares}
          />
          {showRating && (
            <ChallengeMetricChip
              icon={<span className="text-[14px]">평점</span>}
              value={challenge.rating}
            />
          )}
        </div>

        {showAuthorFooter ? <ChallengeAuthorCard /> : null}
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
