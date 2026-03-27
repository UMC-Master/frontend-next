import { motion } from 'motion/react';
import { NavIconProps, getAnimationValues } from './types';
import SavedTipsDisabled from '@/assets/svgs/saved_tips_disabled.svg';
import SavedTipsBlur from '@/assets/svgs/saved_tips_blur.svg';
import SavedTipsShadow from '@/assets/svgs/saved_tips_shadow.svg';

export function SavedTipsIcon({ isActive, animationProgress }: NavIconProps) {
  const { rotation, scale, translateX, translateY } = getAnimationValues(animationProgress);

  return (
    <div className="relative w-8 h-8 flex items-center justify-center overflow-visible">
      {/* 뒤에 있는 초록색 배경 */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          rotate: isActive ? rotation : 0,
          scale: isActive ? scale : 1,
          x: isActive ? translateX : 0,
          y: isActive ? translateY : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: '-14px',
          marginTop: '-12px',
        }}
      >
        <SavedTipsShadow />
      </motion.div>

      {/* 비활성 상태 아이콘 */}
      {!isActive && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <SavedTipsDisabled />
        </div>
      )}

      {/* 활성 상태 반투명 아이콘 */}
      {isActive && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SavedTipsBlur />
        </div>
      )}
    </div>
  );
}
