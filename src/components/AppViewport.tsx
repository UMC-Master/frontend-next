'use client';

import { usePathname } from 'next/navigation';

type AppViewportProps = {
  children: React.ReactNode;
};

export default function AppViewport({ children }: AppViewportProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen min-w-[1200px] bg-white">{children}</div>;
  }

  return (
    <div className="mx-auto min-h-svh w-full max-w-[428px] bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="pb-24 ps-[max(1.5rem,env(safe-area-inset-left,0px))] pe-[max(1.5rem,env(safe-area-inset-right,0px))]">
        {children}
      </div>
    </div>
  );
}
