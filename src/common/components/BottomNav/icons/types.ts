export interface NavIconProps {
  isActive: boolean;
  animationProgress: number; // 0: inactive, 1: active
}

export const getAnimationValues = (animationProgress: number) => ({
  rotation: animationProgress * 10, // 0도 → 10도
  scale: 1 + animationProgress * 0.15, // 1 → 1.15
  translateX: animationProgress * 4, // 0 → 4px (오른쪽으로)
  translateY: animationProgress * -4, // 0 → -4px (위로)
});
