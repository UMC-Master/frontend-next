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

type ReportRow = {
  id: number;
  title: string;
  resolved: boolean;
  nickname: string;
  createdAt: string;
};

const reports: ReportRow[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: index % 2 === 0 ? '부적절한 게시물 신고 요청입니다.' : '서비스 이용 규칙 위반 사용자를 신고합니다.',
  resolved: [1, 4, 5, 9].includes(index),
  nickname: `신고자${index + 1}`,
  createdAt: `2025/04/${String(index + 1).padStart(2, '0')} 00:00:00`,
}));

const columns: AdminTableColumn<ReportRow>[] = [
  { key: 'id', label: '번호', width: '80px', render: (row) => row.id },
  { key: 'title', label: '제목', width: '560px', render: (row) => <p className="truncate text-left">{row.title}</p> },
  {
    key: 'resolved',
    label: '처리 여부',
    width: '172px',
    render: (row) => (
      <AdminStatusBadge tone={row.resolved ? 'primary' : 'muted'}>
        {row.resolved ? '처리 완료' : '미확인'}
      </AdminStatusBadge>
    ),
  },
  { key: 'nickname', label: '닉네임', width: '160px', render: (row) => row.nickname },
  { key: 'createdAt', label: '작성일', width: '228px', render: (row) => row.createdAt },
];

type Filter = 'latest' | 'oldest' | 'unresolved' | 'resolved' | 'history';

export default function AdminReportListPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('latest');
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    if (filter === 'oldest') return [...reports].reverse();
    if (filter === 'unresolved') return reports.filter((report) => !report.resolved);
    if (filter === 'resolved' || filter === 'history') return reports.filter((report) => report.resolved);
    return reports;
  }, [filter]);

  const filters: { value: Filter; label: string }[] = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'unresolved', label: '미확인' },
    { value: 'resolved', label: '처리 완료' },
    { value: 'history', label: '기록 조치 모음' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="신고 관리" />
      <div className="flex gap-4">
        {filters.map((item) => (
          <AdminChip key={item.value} active={filter === item.value} onClick={() => setFilter(item.value)}>
            {item.label}
          </AdminChip>
        ))}
      </div>
      <AdminTable columns={columns} rows={rows} onRowClick={(row) => router.push(`/admin/reports/${row.id}`)} />
      <div className="mt-2">
        <AdminPagination currentPage={page} onChange={setPage} />
      </div>
    </div>
  );
}
