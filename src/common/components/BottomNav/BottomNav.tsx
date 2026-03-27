'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { NavIcon } from './NavIcon';

interface NavItem {
  label: string;
  href: string;
  iconType: 'home' | 'savedTips' | 'challenge' | 'mypage';
}

export default function BottomNav() {
  const pathname = usePathname();
  const [animatingTab, setAnimatingTab] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  const navItems: NavItem[] = [
    {
      label: '홈',
      href: '/main',
      iconType: 'home',
    },
    {
      label: '저장한 꿀팁',
      href: '/saved-tips',
      iconType: 'savedTips',
    },
    {
      label: '챌린지',
      href: '/challenges',
      iconType: 'challenge',
    },
    {
      label: '마이페이지',
      href: '/mypage',
      iconType: 'mypage',
    },
  ];

  useEffect(() => {
    // 페이지 변경 시 애니메이션 트리거
    if (pathname) {
      setAnimatingTab(pathname);
      setAnimationProgress(0);

      // 애니메이션 진행
      const duration = 600; // 0.6초
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        setAnimationProgress(currentStep / steps);

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatingTab(null);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0px_0px_8px_0px_rgba(54,98,76,0.2)] max-w-[428px] mx-auto rounded-t-2xl z-50">
      <div className="flex items-center justify-around px-3.5 py-3.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isAnimating = animatingTab === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 w-[100px] relative"
            >
              {/* Icon with fill animation */}
              <NavIcon
                type={item.iconType}
                isActive={isActive}
                animationProgress={isAnimating ? animationProgress : isActive ? 1 : 0}
              />

              {/* Label */}
              <motion.span
                className={`text-caption1 text-center ${
                  isActive ? 'text-gray-1000' : 'text-gray-800'
                }`}
                initial={false}
                transition={{
                  duration: 0.2,
                }}
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
