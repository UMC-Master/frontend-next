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
    <article className={['overflow-hidden', className].join(' ')}>
      <div className="relative aspect-[7/6] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover rounded-lg"
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

      <div className="px-2 pt-2.5 pb-1.5">
        <Wrapper>
          <h3 className="text-title4 text-gray-900">{title}</h3>
        </Wrapper>
      </div>
    </article>
  );
}
