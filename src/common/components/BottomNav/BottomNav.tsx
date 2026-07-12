'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
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
    { label: '홈', href: '/main', iconType: 'home' },
    { label: '저장한 꿀팁', href: '/saved-tips', iconType: 'savedTips' },
    { label: '챌린지', href: '/challenges', iconType: 'challenge' },
    { label: '마이페이지', href: '/mypage', iconType: 'mypage' },
  ];

  useEffect(() => {
    if (!pathname) {
      return;
    }

    setAnimatingTab(pathname);
    setAnimationProgress(0);

    const duration = 600;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      setAnimationProgress(currentStep / steps);

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatingTab(null);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[428px] rounded-t-2xl bg-white shadow-[0px_0px_8px_0px_rgba(54,98,76,0.2)]">
      <div className="flex items-center justify-around px-3.5 py-3.5">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          const isAnimating = animatingTab === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex w-[100px] flex-col items-center gap-1"
            >
              <NavIcon
                type={item.iconType}
                isActive={isActive}
                animationProgress={isAnimating ? animationProgress : isActive ? 1 : 0}
              />
              <motion.span
                className={`text-caption1 text-center ${
                  isActive ? 'text-gray-1000' : 'text-gray-800'
                }`}
                initial={false}
                transition={{ duration: 0.2 }}
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
