'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleNotificationClick = () => {
    setNotificationOpen((open) => !open);
    onNotificationClick?.();
  };

  return (
    <header className="relative h-20 border-b border-gray-200/60 bg-gray-100 shadow-[0_4px_16px_rgba(234,234,234,0.6)]">
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
            onClick={handleNotificationClick}
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
      {notificationOpen && (
        <section className="absolute right-[120px] top-[96px] z-40 w-[385px] rounded-2xl bg-white p-[22px] shadow-[0_8px_32px_rgba(30,27,27,0.16)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-lg font-semibold text-gray-1000">
              <Image src="/admin/notifications.svg" alt="" width={28} height={28} />
              알림
            </div>
            <button type="button" onClick={() => setNotificationOpen(false)} aria-label="알림 닫기">
              <Image src="/admin/close.svg" alt="" width={28} height={28} />
            </button>
          </div>
          <ul className="mt-7 divide-y divide-gray-300">
            {[
              '새로운 챌린지 인증이 올라왔어요.',
              '새로운 신고가 들어왔어요.',
              '새로운 문의사항이 들어왔어요.',
              '새로운 챌린지를 등록하러 가세요.',
            ].map((message) => (
              <li key={message} className="py-4 text-base text-gray-1000">
                <p>{message}</p>
                <p className="mt-1 text-right text-xs text-gray-700">2시간 전</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </header>
  );
}
