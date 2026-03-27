import { HomeIcon } from './icons/HomeIcon';
import { SavedTipsIcon } from './icons/SavedTipsIcon';
import { ChallengeIcon } from './icons/ChallengeIcon';
import { MyPageIcon } from './icons/MyPageIcon';

interface NavIconProps {
  type: 'home' | 'savedTips' | 'challenge' | 'mypage';
  isActive: boolean;
  animationProgress: number;
}

const iconComponents = {
  home: HomeIcon,
  savedTips: SavedTipsIcon,
  challenge: ChallengeIcon,
  mypage: MyPageIcon,
} as const;

export function NavIcon({ type, isActive, animationProgress }: NavIconProps) {
  const IconComponent = iconComponents[type];
  return <IconComponent isActive={isActive} animationProgress={animationProgress} />;
}
