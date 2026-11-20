'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function AppStatusScreen({
  state,
}: {
  state: 'loading' | 'error';
}) {
  const pathname = usePathname();
  const isLoading = state === 'loading';

  return (
    <main
      className="fixed inset-0 z-40 mx-auto max-w-[428px] overflow-y-auto bg-gray-100"
      data-app-status={state}
    >
      <div
        className={clsx(
          'flex min-h-full flex-col items-center justify-center gap-6 pt-[env(safe-area-inset-top)] ps-[max(1.5rem,env(safe-area-inset-left,0px))] pe-[max(1.5rem,env(safe-area-inset-right,0px))]',
          isLoading
            ? 'pb-[calc(9.5rem+env(safe-area-inset-bottom))]'
            : 'pb-[calc(6.875rem+env(safe-area-inset-bottom))]',
        )}
      >
        <div className="flex w-full flex-col items-center">
          {isLoading ? (
            <div className="relative size-[240px] overflow-hidden">
              <Image
                src="/brand/signup-complete-logo.gif"
                alt=""
                width={675}
                height={335}
                unoptimized
                className="absolute left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] h-[335px] w-[675px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
              />
            </div>
          ) : (
            <div aria-hidden className="relative size-[200px] overflow-hidden">
              <div className="absolute top-5 left-[26.8px] flex size-[156.392px] items-center justify-center">
                <div className="size-[135px] rotate-10 rounded-[20px] bg-main-500" />
              </div>
              <div className="absolute top-[45.7px] left-[16.25px] size-[135px] rounded-[20px] bg-gray-100/80 shadow-[0_1.25px_15px_rgba(75,69,69,0.2)] backdrop-blur-[7.5px]" />
              <Image
                src="/brand/error-mark.svg"
                alt=""
                width={16}
                height={77}
                className="absolute top-[37%] left-[38%]"
              />
            </div>
          )}
          <p
            role={isLoading ? 'status' : 'alert'}
            className="text-center text-title3 text-gray-900"
          >
            {isLoading ? '조금만 기다려 주세요.' : '에러가 발생했어요.'}
            <br />
            {isLoading ? '곧 보여드릴게요.' : '다시 시도해 주세요.'}
          </p>
        </div>
        {!isLoading && (
          <Link
            href="/main"
            onClick={event => {
              if (
                pathname === '/main' &&
                !event.metaKey &&
                !event.ctrlKey &&
                !event.shiftKey &&
                !event.altKey
              ) {
                event.preventDefault();
                window.location.reload();
              }
            }}
            className="flex h-13 w-full max-w-[380px] items-center justify-center rounded-2xl bg-main-500 text-title3 text-gray-200 hover:bg-main-600"
          >
            홈으로
          </Link>
        )}
      </div>
    </main>
  );
}
