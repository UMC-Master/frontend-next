'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AdminChip,
  AdminPageHeader,
  AdminPagination,
  AdminStatusBadge,
  AdminTable,
  type AdminTableColumn,
} from '@/features/admin/components';

type FeedbackType = 'inquiry' | 'feedback';

type FeedbackRow = {
  id: number;
  title: string;
  answered: boolean;
  nickname: string;
  createdAt: string;
};

const feedbackRows: FeedbackRow[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: index % 2 === 0 ? '서비스 이용 중 궁금한 점이 있어 문의드립니다.' : '새로운 기능에 대한 의견을 전달드립니다.',
  answered: [1, 4, 5, 9].includes(index),
  nickname: `사용자${index + 1}`,
  createdAt: `2025/04/${String(index + 1).padStart(2, '0')} 00:00:00`,
}));

const columns: AdminTableColumn<FeedbackRow>[] = [
  { key: 'id', label: '번호', width: '80px', render: (row) => row.id },
  {
    key: 'title',
    label: '제목',
    width: '560px',
    render: (row) => <p className="truncate text-left">{row.title}</p>,
  },
  {
    key: 'answered',
    label: '답변/확인 여부',
    width: '172px',
    render: (row) => (
      <AdminStatusBadge tone={row.answered ? 'primary' : 'muted'}>
        {row.answered ? '답변/확인 완료' : '미확인'}
      </AdminStatusBadge>
    ),
  },
  { key: 'nickname', label: '닉네임', width: '160px', render: (row) => row.nickname },
  { key: 'createdAt', label: '작성일', width: '228px', render: (row) => row.createdAt },
];

export default function AdminFeedbackListPage() {
  const router = useRouter();
  const [type, setType] = useState<FeedbackType>('inquiry');
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const [page, setPage] = useState(1);

  const rows = useMemo(
    () => (sort === 'latest' ? feedbackRows : [...feedbackRows].reverse()),
    [sort],
  );

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="사용자 문의/피드백" />
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <AdminChip active={type === 'inquiry'} onClick={() => setType('inquiry')}>문의</AdminChip>
          <AdminChip active={type === 'feedback'} onClick={() => setType('feedback')}>피드백</AdminChip>
        </div>
        <div className="flex gap-4">
          <AdminChip active={sort === 'latest'} onClick={() => setSort('latest')}>최신순</AdminChip>
          <AdminChip active={sort === 'oldest'} onClick={() => setSort('oldest')}>오래된순</AdminChip>
        </div>
      </div>
      <AdminTable
        columns={columns}
        rows={rows}
        onRowClick={(row) => router.push(`/admin/feedback/${row.id}?type=${type}`)}
      />
      <div className="mt-2">
        <AdminPagination currentPage={page} onChange={setPage} />
      </div>
    </div>
  );
}
