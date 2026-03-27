'use client';

import RankAccordion from '@/features/mypage/components/RankAccordion';

export default function RankPage() {
  // TODO: Replace with actual user data
  const userName = '애니';
  const currentRank = '자취 신';
  const currentPoints = 2000;

  const rankLevels = [
    {
      id: 'beginner',
      title: '자취 새싹',
      description: '0 ~ 299pt이면 자취 새싹입니다.',
    },
    {
      id: 'challenger',
      title: '자취 도전자',
      description: '300 ~ 599pt이면 자취 도전자입니다.',
    },
    {
      id: 'expert',
      title: '자취 고수',
      description: '600 ~ 999pt이면 자취 고수입니다.',
    },
    {
      id: 'master',
      title: '자취 박사',
      description: '1000 ~ 1999pt이면 자취 박사입니다.',
    },
    {
      id: 'god',
      title: '자취 신',
      description: '2000pt 이상이면 자취 신입니다.',
    },
  ];

  return (
    <div className="flex flex-col gap-6 pt-6 pb-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-2">
        {/* Profile Image */}
        <div className="w-[160px] h-[160px] bg-gray-300 rounded-full" />
        <p className="text-title1 text-gray-1000">{userName}</p>
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-3">
        {/* Current Rank Info Card */}
        <div className="bg-main-500 rounded-2xl px-4 py-3 shadow-[0px_0px_16px_0px_rgba(234,234,234,1)]">
          <p className="text-title3 text-gray-100">
            {userName}님은 현재{' '}
            <span className="text-title2">{currentRank}</span>입니다.
          </p>
          <p className="text-body1 text-gray-200">
            현재 포인트 {currentPoints.toLocaleString()}pt
          </p>
        </div>

        {/* Rank Levels Accordion */}
        {rankLevels.map((level) => (
          <RankAccordion
            key={level.id}
            title={level.title}
            description={level.description}
          />
        ))}
      </div>
    </div>
  );
}
