'use client';

import Link from 'next/link';
import Image from 'next/image';
import CardBadge, {
  CardBadgeProps,
  CardBadgeType,
} from '@/common/components/CardBadge/CardBadge';

export interface CardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  href?: string;
  className?: string;
  badges?: Array<{
    type: CardBadgeType;
    count?: number | string;
    active?: boolean;
    onClick?: () => void;
  }>;
  showBadge?: boolean;
}

export default function Card({
  imageSrc,
  imageAlt = '',
  title,
  href,
  className = '',
  badges = [],
  showBadge = true,
}: CardProps) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    href ? <Link href={href}>{children}</Link> : <>{children}</>;

  return (
    <article
      className={[
        'relative flex h-[216px] flex-col items-center gap-2.5 rounded-lg drop-shadow-[0_0_8px_#eaeaea]',
        className,
      ].join(' ')}
    >
      <div className="relative h-[156px] w-full shrink-0 overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 182px"
        />

        {/* 배지 오버레이 */}
        {badges.length > 0 && showBadge && (
          <div className={'absolute z-10 flex left-1 top-1'}>
            {badges.map((b, idx) => (
              <CardBadge key={idx} {...(b as CardBadgeProps)} />
            ))}
          </div>
        )}
        {/* 전체 클릭 가능하게 */}
        <Wrapper>
          <span className="absolute inset-0" aria-hidden />
        </Wrapper>
      </div>

      <div className="w-[calc(100%-16px)]">
        <Wrapper>
          <h3 className="line-clamp-2 text-title4 text-gray-900">{title}</h3>
        </Wrapper>
      </div>
    </article>
  );
}
