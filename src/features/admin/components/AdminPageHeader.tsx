import Image from 'next/image';
import Link from 'next/link';

type AdminPageHeaderProps = {
  title: string;
  showDashboardLink?: boolean;
};

export default function AdminPageHeader({
  title,
  showDashboardLink = true,
}: AdminPageHeaderProps) {
  return (
    <div className="flex h-[42px] items-center justify-between">
      <h1 className="text-[32px] font-bold leading-[1.3] tracking-[-0.01em] text-gray-1000">
        {title}
      </h1>
      {showDashboardLink && (
        <Link href="/admin" className="flex items-center gap-[11px] text-xl font-semibold text-gray-900">
          메인 대시보드로 이동
          <Image src="/admin/arrow-forward.svg" alt="" width={12} height={12} />
        </Link>
      )}
    </div>
  );
}
