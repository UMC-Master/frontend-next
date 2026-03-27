'use client';

import TopAppBar from '@/components/TopAppBar';
import { AppBarContext } from '@/components/AppBarContext';

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppBarContext.Provider value={{ showBack: true, title: '꿀팁 작성하기' }}>
      <div className="mx-auto max-w-[430px] bg-white">
        <TopAppBar />
        {children}
      </div>
    </AppBarContext.Provider>
  );
}
