'use client';

import { useState } from 'react';
import {
  AdminAnalyticsTabs,
  AdminBarChart,
  AdminPageHeader,
  type AnalyticsTab,
} from '@/features/admin/components';

const dailyValues = [40, 68, 18, 53, 31, 72, 23, 49, 41, 68, 18, 53, 31, 72, 23, 49, 41, 68, 18, 53, 31, 72, 23, 49, 49, 49, 49, 49, 49, 49];
const dailyLabels = Array.from({ length: 30 }, (_, index) => `06.${String(index + 1).padStart(2, '0')}`);
const funnelLabels = ['방문', '회원가입', '홈 진입', '꿀팁 게시물 진입', '꿀팁 게시물 작성 완료', '저장한 꿀팁 진입', '챌린지 클릭', '챌린지 참여 완료', '마이페이지 진입'];

export default function AdminAnalyticsPage() {
  const [tab, setTab] = useState<AnalyticsTab>('acquisition');

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="성과 분석" />
      <AdminAnalyticsTabs value={tab} onChange={setTab} />
      {tab === 'acquisition' && <AcquisitionPanel />}
      {tab === 'conversion' && <ConversionPanel />}
      {!['acquisition', 'conversion'].includes(tab) && (
        <div className="flex h-[540px] items-center justify-center rounded-2xl border border-gray-200 text-xl text-gray-600">
          다음 분석 화면에서 제공됩니다.
        </div>
      )}
    </div>
  );
}

function AcquisitionPanel() {
  const metrics = [
    ['유입', '128,540', '▲ 12.6'],
    ['전환', '24.8%', '▲ 12.6'],
    ['총 방문 수', '3,980', '▲ 8%'],
    ['최고 유입 채널', 'SNS', '지난 30일'],
  ];

  return (
    <section className="flex flex-col gap-10">
      <div className="grid grid-cols-4 gap-[42px]">
        {metrics.map(([label, value, trend]) => (
          <div key={label} className="flex h-[136px] flex-col justify-center rounded-3xl border border-gray-200 px-6">
            <div className="flex items-center justify-between text-base text-gray-900">
              <span>{label}</span><span className="text-xs text-gray-600">vs 지난 30일</span>
            </div>
            <strong className="mt-2 text-[28px] font-bold text-gray-1000">{value}</strong>
            <span className="mt-1 text-sm text-main-500">{trend}</span>
          </div>
        ))}
      </div>
      <AdminBarChart values={dailyValues} labels={dailyLabels} highlightIndexes={[5, 13, 21]} />
    </section>
  );
}

function ConversionPanel() {
  const [mode, setMode] = useState('panel');
  return (
    <section className="flex flex-col gap-6">
      <fieldset className="flex gap-8">
        <legend className="sr-only">전환 분석 방식</legend>
        {[
          ['panel', '전환 패널'],
          ['dropoff', '단계별 이탈률'],
          ['action', '기록 조치'],
        ].map(([value, label]) => (
          <label key={value} className="flex items-center gap-2 text-base text-gray-900">
            <input type="radio" checked={mode === value} onChange={() => setMode(value)} className="size-6 accent-main-500" />
            {label}
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-3 gap-[60px]">
        {[
          ['전체 전환율', '00%'],
          ['챌린지 참여 전환율', '00%'],
          ['최대 이탈 구간', '어디일까요'],
        ].map(([label, value]) => (
          <div key={label} className="flex h-[134px] flex-col items-center justify-center rounded-3xl border border-gray-200">
            <p className="text-xl text-gray-1000">{label}</p>
            <strong className="mt-3 text-2xl font-bold">{value}</strong>
          </div>
        ))}
      </div>
      <AdminBarChart values={[40, 66, 18, 54, 31, 70, 23, 71, 23]} labels={funnelLabels} highlightIndexes={[5, 7]} />
    </section>
  );
}
