'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import BottomNav from '@/common/components/BottomNav/BottomNav';

const bottomNavRoutes = new Set([
  '/main',
  '/saved-tips',
  '/challenges',
  '/mypage',
]);

type AppViewportProps = {
  children: React.ReactNode;
};

export default function AppViewport({ children }: AppViewportProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const hasPageFooter = pathname === '/auth/sign-up' || pathname === '/report';
  const hasWriteShortcut = pathname === '/main' || pathname === '/saved-tips';

  if (isAdminRoute) {
    return (
      <div className="min-h-screen min-w-[1200px] bg-white">{children}</div>
    );
  }

  return (
    <div className="mx-auto min-h-svh w-full max-w-[428px] bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div
        className={clsx(
          'ps-[max(1.5rem,env(safe-area-inset-left,0px))] pe-[max(1.5rem,env(safe-area-inset-right,0px))]',
          !hasPageFooter && (hasWriteShortcut ? 'pb-34' : 'pb-24'),
        )}
      >
        {children}
      </div>
      {bottomNavRoutes.has(pathname) && <BottomNav />}
    </div>
  );
}
