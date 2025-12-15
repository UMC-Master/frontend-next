'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Image, { StaticImageData } from 'next/image';

export type CardStackItem = {
  id: string;
  imageUrl: string | StaticImageData;
  alt?: string;
};

type CardStackProps = {
  cards: CardStackItem[];
  onCardClick?: (card: CardStackItem) => void;
  onIndexChange?: (index: number) => void;
};

const MAX_VISIBLE = 3;

export default function CardStack({
  cards,
  onCardClick,
  onIndexChange,
}: CardStackProps) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex(prev => {
      const nextIndex = (prev + 1) % cards.length;
      onIndexChange?.(nextIndex);
      return nextIndex;
    });
  };

  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      {Array.from({ length: Math.min(MAX_VISIBLE, cards.length) })
        .map((_, i) => {
          const cardIndex = (index + i) % cards.length;
          const card = cards[cardIndex];
          const isTop = i === 0;

          // 우측 상단으로 겹쳐 보이게
          const x = i * 24; // 오른쪽
          const y = i * -22; // 위쪽
          const scale = 1 - i * 0.04;

          return (
            <motion.div
              key={`${card.id}-${i}`}
              className="absolute inset-0"
              style={{ zIndex: MAX_VISIBLE - i }}
              initial={{ x, y, scale }}
              animate={{ x, y, scale }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              drag={isTop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 120) next();
              }}
              onClick={() => {
                if (isTop) onCardClick?.(card);
              }}
            >
              <div className="relative h-9/10 w-9/10 overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={card.imageUrl}
                  alt={card.alt ?? 'tip image'}
                  fill
                  priority={isTop}
                  className="object-cover"
                  sizes="340px"
                />
                {!isTop && <div className="absolute inset-0 bg-black/60" />}
              </div>
            </motion.div>
          );
        })
        .reverse()}
    </div>
  );
}
