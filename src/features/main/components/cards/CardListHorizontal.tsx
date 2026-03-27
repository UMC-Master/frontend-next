import CardList from '@/common/components/CardList/CardList';
import ForwardIcon from '@/assets/svgs/arrow_forward.svg';

export interface CardListHorizontalProps {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  btnTitle?: string;
  items: React.ComponentProps<typeof CardList>['items'];
  onClick?: () => void;
  showBadge?: boolean;
}

export default function CardListHorizontal({
  icon: Icon = ForwardIcon,
  title = '오늘의 카드',
  btnTitle = '더보기',
  items,
  onClick,
  showBadge,
}: CardListHorizontalProps) {
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-3">
        <h3 className="text-title3 text-gray-1000">{title}</h3>
        <button
          onClick={onClick}
          className="flex flex-row justify-center items-center gap-1"
        >
          <h4 className="text-body2 text-gray-1000">{btnTitle}</h4>
          <Icon className="w-3 h-3" />
        </button>
      </div>
      <CardList items={items} showBadge={showBadge} />
    </>
  );
}
