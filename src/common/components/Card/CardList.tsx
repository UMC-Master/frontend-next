'use client';

import Card, { CardProps } from './Card';

export interface CardListItem
  extends Pick<
    CardProps,
    'imageSrc' | 'imageAlt' | 'title' | 'href' | 'badges'
  > {
  id: string | number;
}

export interface CardListProps {
  items: CardListItem[];
  className?: string;
  showBadge?: boolean;
}

export default function CardList({
  items,
  showBadge,
  className = '',
}: CardListProps) {
  return (
    <ul className={['grid grid-cols-2 gap-4', className].join(' ')}>
      {items.map(item => (
        <li key={item.id}>
          <Card
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            title={item.title}
            href={item.href}
            badges={item.badges}
            showBadge={showBadge}
          />
        </li>
      ))}
    </ul>
  );
}
