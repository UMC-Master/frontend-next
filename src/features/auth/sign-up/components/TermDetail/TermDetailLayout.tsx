'use client';

import clsx from 'clsx';
import LargeButton from '@/components/Button/LargeButton/LargeButton';
import { useRouter } from 'next/navigation';

interface TermDetailLayoutProps {
  children: React.ReactNode;
  /** 짧은 본문만 있을 때 부모 `items-center`에 가로로 꽉 차게 (예: 마케팅 동의) */
  className?: string;
}

const TermDetailLayout = ({ children, className }: TermDetailLayoutProps) => {
  const router = useRouter();

  return (
    <div className={clsx('relative w-full text-gray-900', className)}>
      <div className="mt-4 w-full min-w-0 text-left pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        {children}
      </div>
      <div
        className="fixed bottom-0 left-1/2 z-30 w-full max-w-[428px] -translate-x-1/2 bg-white pt-3 ps-[max(1.5rem,env(safe-area-inset-left,0px))] pe-[max(1.5rem,env(safe-area-inset-right,0px))] pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
        role="presentation"
      >
        <div className="flex justify-center">
          <LargeButton
            text="확인"
            className="text-title3"
            onClick={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
};

export default TermDetailLayout;
