'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { href: '/admin/feedback', label: '사용자 문의/피드백' },
  { href: '/admin/challenges', label: '챌린지 관리' },
  { href: '/admin/reports', label: '신고 관리' },
  { href: '/admin/analytics', label: '성과 분석' },
];

type AdminHeaderProps = {
  onNotificationClick?: () => void;
};

export default function AdminHeader({ onNotificationClick }: AdminHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="h-20 border-b border-gray-200/60 bg-gray-100 shadow-[0_4px_16px_rgba(234,234,234,0.6)]">
      <div className="mx-auto flex h-full w-[1200px] items-center justify-between">
        <div className="flex h-full items-center gap-[30px]">
          <Link href="/admin" className="flex items-center gap-2" aria-label="관리자 대시보드">
            <Image src="/admin/logo.svg" alt="" width={40} height={32} />
            <span className="text-[22px] font-semibold tracking-[-0.01em] text-main-500">
              관리자페이지
            </span>
          </Link>
          <nav className="flex h-full items-center" aria-label="관리자 메뉴">
            {navigation.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-full items-center px-[19px] text-lg font-semibold tracking-[-0.01em] ${active ? 'text-main-500' : 'text-gray-900'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onNotificationClick}
            className="flex size-10 items-center justify-center"
            aria-label="알림 열기"
          >
            <Image src="/admin/notifications.svg" alt="" width={28} height={28} />
          </button>
          <div className="flex items-center gap-1 text-xl text-gray-900">
            <strong className="font-semibold">애니</strong>
            <span>님</span>
          </div>
          <button
            type="button"
            className="h-12 rounded-lg border border-main-500 px-6 text-base font-medium text-main-500"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
