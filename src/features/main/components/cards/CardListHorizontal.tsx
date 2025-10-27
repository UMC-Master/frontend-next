import CardList from '@/common/components/Card/CardList';
import Image from 'next/image';
import ForwardIcon from '@/assets/svgs/arrow_forward.svg';

export interface CardListHorizontalProps {
  icon?: string;
  title?: string;
  btnTitle?: string;
  width?: number;
  height?: number;
  items: React.ComponentProps<typeof CardList>['items'];
  onClick?: () => void;
  showBadge?: boolean;
}

export default function CardListHorizontal({
  icon = ForwardIcon,
  title = '오늘의 카드',
  btnTitle = '더보기',
  width = 12,
  height = 12,
  items,
  onClick,
  showBadge,
}: CardListHorizontalProps) {
  const handleBtn = () => {
    onClick?.();
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-3">
        <h3 className="text-title3 text-gray-1000">{title}</h3>
        <button
          onClick={handleBtn}
          className="flex flex-row justify-center items-center gap-1"
        >
          <h4 className="text-body2 text-gray-1000">{btnTitle}</h4>
          <Image src={icon} width={width} height={height} alt="btn" />
        </button>
      </div>
      <CardList items={items} showBadge={showBadge} />
    </>
  );
}
