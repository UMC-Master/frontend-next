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
      {tab === 'retention' && <RetentionPanel />}
      {tab === 'active-users' && <EngagementPanel kind="active-users" />}
      {tab === 'feature-usage' && <EngagementPanel kind="feature-usage" />}
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

function RetentionPanel() {
  const [mode, setMode] = useState('cohort');
  const weeks = ['6월 1주차', '6월 2주차', '6월 3주차', '6월 4주차', '7월 1주차', '7월 2주차', '7월 3주차', '7월 4주차'];
  const headers = ['가입 주차', 'Day 0', 'Day 1', 'Day 7', 'Day 14', 'Day 21', 'Day 30', '코호트 수'];

  return (
    <section className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-[60px]">
        {['D1 리텐션', 'D7 리텐션', 'D30 리텐션'].map((label) => (
          <div key={label} className="flex h-[136px] flex-col items-center justify-center rounded-3xl border border-gray-200">
            <p className="text-xl text-gray-900">{label}</p>
            <strong className="mt-3 text-2xl font-bold">00%</strong>
          </div>
        ))}
      </div>
      <fieldset className="flex gap-8">
        <legend className="sr-only">리텐션 분석 방식</legend>
        {[
          ['cohort', '코호트 히트맵'],
          ['compare', '비교 분석'],
          ['insight', '인사이트 및 액션 제안 영역'],
        ].map(([value, label]) => (
          <label key={value} className="flex items-center gap-2 text-base">
            <input type="radio" checked={mode === value} onChange={() => setMode(value)} className="size-6 accent-main-500" />
            {label}
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-5">
        <p className="rounded-lg border border-gray-400 px-5 py-3 text-base">코호트 기준 : 가입 주차</p>
        <p className="rounded-lg border border-gray-400 px-5 py-3 text-base">활성 기준 : 해당 주차 내 챌린지 클릭 또는 참여</p>
      </div>
      <table className="w-full table-fixed text-center text-base text-gray-800">
        <thead className="bg-main-500 text-gray-100">
          <tr>{headers.map((header) => <th key={header} className="h-[52px] font-semibold">{header}</th>)}</tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={week} className="h-14 border-b border-gray-200">
              <td>{week}</td><td>100%</td><td>42%</td><td>21%</td><td>15%</td><td>11%</td><td>9%</td><td>{320 - index * 12}명</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="rounded-lg border border-gray-300 p-5 text-base leading-7 text-gray-900">
        <strong className="text-lg text-main-500">해석 메모</strong>
        <p className="mt-2">• 최근 코호트의 Day 1 이후 리텐션 구간 확인</p>
        <p>• Day 7 이전 이탈이 가장 큰 문제 구간</p>
        <p>• 최근 코호트는 아직 D30 관측 불가</p>
      </div>
    </section>
  );
}

function EngagementPanel({ kind }: { kind: 'active-users' | 'feature-usage' }) {
  const [period, setPeriod] = useState('hour');
  const labels = Array.from({ length: 24 }, (_, index) => `${String(index).padStart(2, '0')}:00`);
  const values = [40, 68, 18, 53, 31, 72, 23, 49, 41, 68, 18, 53, 31, 72, 23, 49, 41, 68, 18, 53, 31, 72, 23, 49];

  return (
    <section className="flex flex-col gap-6">
      <fieldset className="flex gap-8">
        <legend className="sr-only">분석 기간</legend>
        {[
          ['hour', '시간'],
          ['week', '주'],
          ['month', '월'],
          ['quarter', '분기'],
        ].map(([value, label]) => (
          <label key={value} className="flex items-center gap-2 text-base">
            <input type="radio" checked={period === value} onChange={() => setPeriod(value)} className="size-6 accent-main-500" />
            {label}
          </label>
        ))}
      </fieldset>
      {kind === 'feature-usage' && (
        <div className="grid grid-cols-3 gap-6">
          {[
            ['최다 사용 기능', '꿀팁 조회'],
            ['챌린지 참여', '3,240회'],
            ['게시물 작성', '1,120회'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-gray-200 p-5 text-center">
              <p className="text-lg text-gray-900">{label}</p>
              <strong className="mt-2 block text-2xl text-main-500">{value}</strong>
            </div>
          ))}
        </div>
      )}
      <AdminBarChart values={values} labels={labels} highlightIndexes={[5, 13, 21]} />
    </section>
  );
}
