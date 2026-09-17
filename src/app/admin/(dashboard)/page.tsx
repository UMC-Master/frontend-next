import Image from 'next/image';
import Link from 'next/link';
import { AdminChip, AdminStatusBadge } from '@/features/admin/components';

const rows = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  title: index === 0 ? '[인증 1회차] 플라스틱 사용 줄이기 챌린지 인증' : '새로운 관리자 확인 항목이 등록되었습니다.',
  author: `사용자${index + 1}`,
  date: '2025/04/01 00:00:00',
  status: index === 1 ? '확인' : '미확인',
}));

type SummarySectionProps = {
  title: string;
  href: string;
  filters?: string[];
};

function SummarySection({ title, href, filters }: SummarySectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex h-[42px] items-center justify-between">
        <h2 className="text-[32px] font-bold tracking-[-0.01em] text-gray-1000">{title}</h2>
        <Link href={href} className="flex items-center gap-3 text-xl font-semibold text-gray-900">
          전체보기
          <Image src="/admin/arrow-forward.svg" alt="" width={12} height={12} />
        </Link>
      </div>
      {filters && (
        <div className="flex gap-4">
          {filters.map((filter, index) => (
            <AdminChip key={filter} active={index === 0}>{filter}</AdminChip>
          ))}
        </div>
      )}
      <div className="rounded-2xl bg-gray-100 px-5 py-5 shadow-[0_1px_2px_rgba(75,69,69,0.2)]">
        <ul className="space-y-5">
          {rows.map((row) => (
            <li key={row.id} className="grid grid-cols-[1fr_150px_180px_90px] items-center gap-5 text-base text-gray-1000">
              <span className="truncate">{row.title}</span>
              <span className="truncate">{row.author}</span>
              <time>{row.date}</time>
              <AdminStatusBadge tone={row.status === '확인' ? 'primary' : 'muted'}>{row.status}</AdminStatusBadge>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-12">
      <SummarySection title="사용자 문의/피드백" href="/admin/feedback" filters={['문의', '피드백']} />
      <SummarySection
        title="챌린지 관리"
        href="/admin/challenges"
        filters={['챌린지 승인/관리', '챌린지 생성', '챌린지 참여 현황', '챌린지 참여율 분석']}
      />
      <SummarySection title="신고 관리" href="/admin/reports" />

      <section className="flex flex-col gap-6">
        <div className="flex h-[42px] items-center justify-between">
          <h2 className="text-[32px] font-bold tracking-[-0.01em] text-gray-1000">성과 분석</h2>
          <Link href="/admin/analytics" className="flex items-center gap-3 text-xl font-semibold text-gray-900">
            전체보기
            <Image src="/admin/arrow-forward.svg" alt="" width={12} height={12} />
          </Link>
        </div>
        <p className="rounded-lg border border-gray-400 px-5 py-3 text-lg text-gray-900">
          참고 : 최근 30일 간 전주 대비 신규 이용자 유입 분석
        </p>
        <div className="grid grid-cols-3 gap-[30px]">
          {[
            ['신규 사용자 수', '1,240 (+12%)'],
            ['총 방문 수', '1,240 (+12%)'],
            ['최고 유입 채널', 'SNS'],
          ].map(([label, value]) => (
            <div key={label} className="flex h-[134px] flex-col items-center justify-center rounded-2xl border border-gray-400">
              <p className="text-xl text-gray-1000">{label}</p>
              <strong className="mt-3 text-xl font-semibold text-main-500">{value}</strong>
            </div>
          ))}
        </div>
        <div className="flex h-[480px] items-end gap-5 border-b border-l border-gray-400 px-10 pt-8">
          {[42, 68, 20, 55].map((height, index) => (
            <div key={height} className="flex flex-1 items-end gap-2">
              <div className="w-1/2 rounded-t-full bg-[#7d9187]" style={{ height: `${height}%` }} />
              <div className="w-1/2 rounded-t-full bg-main-500" style={{ height: `${height + 20}%` }} />
              <span className="sr-only">{index + 1}주차 사용자 지표</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
