'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import FlipDownIcon from '@/assets/svgs/flip-down-icon.svg';
import FlipUpIcon from '@/assets/svgs/flip-up-icon.svg';

const SIDO_LIST = [
  '서울특별시',
  '부산광역시',
  '경기도',
  '강원특별자치도',
  '대구광역시',
] as const;

const SIGUNGU_BY_SIDO: Record<(typeof SIDO_LIST)[number], string[]> = {
  서울특별시: ['강남구', '강동구', '강서구', '동작구', '서초구'],
  부산광역시: ['중구', '해운대구'],
  경기도: ['수원시', '성남시'],
  강원특별자치도: ['춘천시', '원주시'],
  대구광역시: ['중구', '수성구'],
};

const DROPDOWN_SHADOW_CLASS =
  'shadow-[0_0_8px_0_rgba(54,98,76,0.2)]';

const TRIGGER_CLASS =
  'flex h-12 w-full min-w-0 items-center justify-end gap-1 rounded-lg border-[0.4px] border-gray-800 bg-gray-100 px-3 py-1.5 text-body1 text-gray-900 outline-none';

const LIST_ITEM_CLASS =
  'flex h-12 w-full items-center justify-end bg-gray-100 px-3 text-right text-body1 text-gray-900';

type ProfileRegionDropdownsProps = {
  className?: string;
};

const ProfileRegionDropdowns = ({ className }: ProfileRegionDropdownsProps) => {
  const [sidoOpen, setSidoOpen] = useState(false);
  const [sigunguOpen, setSigunguOpen] = useState(false);
  const [sido, setSido] = useState<(typeof SIDO_LIST)[number]>('서울특별시');
  const [sigungu, setSigungu] = useState('강남구');

  const sidoWrapRef = useRef<HTMLDivElement>(null);
  const sigunguWrapRef = useRef<HTMLDivElement>(null);

  const sigunguOptions = SIGUNGU_BY_SIDO[sido] ?? [];

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (sidoWrapRef.current?.contains(t)) return;
      if (sigunguWrapRef.current?.contains(t)) return;
      setSidoOpen(false);
      setSigunguOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const handlePickSido = (next: (typeof SIDO_LIST)[number]) => {
    setSido(next);
    const districts = SIGUNGU_BY_SIDO[next];
    setSigungu(districts[0] ?? '');
    setSidoOpen(false);
  };

  const handlePickSigungu = (next: string) => {
    setSigungu(next);
    setSigunguOpen(false);
  };

  return (
    <div className={clsx('flex w-full min-w-0 max-w-[380px] flex-col gap-2', className)}>
      <div className="flex min-w-0 w-full gap-4">
        {/* 시·도 */}
        <div ref={sidoWrapRef} className="relative min-w-0 flex-1">
          <button
            type="button"
            className={TRIGGER_CLASS}
            aria-expanded={sidoOpen}
            aria-haspopup="listbox"
            onClick={() => {
              setSidoOpen(v => !v);
              setSigunguOpen(false);
            }}
          >
            <span className="min-w-0 truncate">{sido}</span>
            <span className="flex size-5 shrink-0 items-center justify-center">
              {sidoOpen ? <FlipUpIcon /> : <FlipDownIcon />}
            </span>
          </button>
          {sidoOpen ? (
            <ul
              className={clsx(
                'absolute left-0 top-full z-20 mt-0 w-full min-w-0 overflow-hidden rounded-lg',
                DROPDOWN_SHADOW_CLASS,
              )}
              role="listbox"
            >
              {SIDO_LIST.map(name => (
                <li key={name} role="option" aria-selected={name === sido}>
                  <button
                    type="button"
                    className={LIST_ITEM_CLASS}
                    onClick={() => handlePickSido(name)}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* 시·군·구 */}
        <div ref={sigunguWrapRef} className="relative min-w-0 flex-1">
          <button
            type="button"
            className={clsx(TRIGGER_CLASS, !sigungu && 'text-gray-800')}
            aria-expanded={sigunguOpen}
            aria-haspopup="listbox"
            disabled={sigunguOptions.length === 0}
            onClick={() => {
              if (sigunguOptions.length === 0) return;
              setSigunguOpen(v => !v);
              setSidoOpen(false);
            }}
          >
            <span className="min-w-0 truncate">
              {sigungu || '선택'}
            </span>
            <span className="flex size-5 shrink-0 items-center justify-center">
              {sigunguOpen ? <FlipUpIcon /> : <FlipDownIcon />}
            </span>
          </button>
          {sigunguOpen && sigunguOptions.length > 0 ? (
            <div
              className={clsx(
                'absolute left-0 top-full z-20 mt-0 w-full min-w-0 overflow-hidden rounded-lg',
                DROPDOWN_SHADOW_CLASS,
              )}
            >
              <ul
                className={clsx(
                  'max-h-[240px] overflow-y-auto',
                  '[scrollbar-color:var(--color-gray-500)_transparent] [scrollbar-width:thin]',
                  '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-gray-500',
                )}
                role="listbox"
              >
                {sigunguOptions.map(name => (
                  <li key={name} role="option" aria-selected={name === sigungu}>
                    <button
                      type="button"
                      className={LIST_ITEM_CLASS}
                      onClick={() => handlePickSigungu(name)}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileRegionDropdowns;
