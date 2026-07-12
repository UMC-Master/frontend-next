import Link from 'next/link';
import type { ChallengeMode } from '../../data/mockChallenges';

interface ChallengeBottomBarProps {
  mode: ChallengeMode;
  challengeId: string;
  periodLabel: string;
  cadenceLabel: string;
}

export default function ChallengeBottomBar({
  mode,
  challengeId,
  periodLabel,
  cadenceLabel,
}: ChallengeBottomBarProps) {
  const preview = mode === 'preview' || mode === 'preview-started';
  const activeSingle = mode === 'active';
  const activeQuit =
    mode === 'active-quit-confirm' || mode === 'active-quit-success';

  return (
    <div className="fixed bottom-24 left-1/2 z-20 w-full max-w-[428px] -translate-x-1/2 bg-main-500 px-9 py-3 text-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-title3">{periodLabel}</p>
          <p className="text-body1 text-gray-200">{cadenceLabel}</p>
        </div>
        {preview && (
          <Link
            href={`/challenges/${challengeId}?state=preview-started`}
            className="rounded-lg bg-white px-4 py-3 text-title4 text-main-500"
          >
            챌린지 시작하기
          </Link>
        )}
        {activeSingle && (
          <Link
            href={`/challenges/${challengeId}/verify`}
            className="rounded-lg bg-white px-4 py-3 text-title4 text-main-500"
          >
            인증하기
          </Link>
        )}
        {activeQuit && (
          <div className="flex gap-3">
            <Link
              href={`/challenges/${challengeId}/verify`}
              className="rounded-lg bg-white px-5 py-3 text-title4 text-gray-1000"
            >
              인증하기
            </Link>
            <Link
              href={`/challenges/${challengeId}?state=active-quit-confirm`}
              className="rounded-lg bg-white px-5 py-3 text-title4 text-gray-1000"
            >
              그만두기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
