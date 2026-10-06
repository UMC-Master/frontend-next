import type { CardListItem } from '@/common/components/CardList/CardList';
import type { TipItem } from './tip.types';

export const getTipImage = (tip: TipItem) => {
  const media = tip.imageUrls.find(
    image => image.media_type === 'IMAGE' || image.media_type === 'image',
  );
  const url = media?.media_url || tip.imageUrls[0]?.media_url;
  return url && /^https?:\/\//.test(url) ? url : '/images/tip-placeholder.svg';
};

export const toTipCard = (tip: TipItem): CardListItem => ({
  id: tip.tipId,
  title: tip.title,
  imageSrc: getTipImage(tip),
  imageAlt: tip.title,
  href: `/tips/${tip.tipId}`,
  badges: [
    { type: 'like', count: tip.likesCount },
    { type: 'save', count: tip.savesCount },
  ],
});
