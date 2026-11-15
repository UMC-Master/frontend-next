import type { Metadata } from 'next';

export const SITE_URL = 'https://www.homemaster.site';
export const SITE_NAME = '홈마스터(HomeMaster)';
export const SITE_TITLE = `${SITE_NAME} | 자취 꿀팁 공유 서비스`;
export const SITE_DESCRIPTION =
  '자취 생활에 필요한 꿀팁을 홈마스터에서 찾아보세요. 나만의 생활 노하우를 공유하고, 유용한 팁을 저장해 더 편리한 자취 생활을 만들어보세요.';

export const SHARED_IMAGE = {
  url: '/brand/homemaster-logo.png',
  width: 2048,
  height: 2048,
  alt: '홈마스터 로고',
};

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [SHARED_IMAGE],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [SHARED_IMAGE],
    },
  };
}

// Keep this list limited to public routes with explicit indexable metadata.
export const PUBLIC_PAGES = [
  { path: '/main', title: SITE_TITLE, description: SITE_DESCRIPTION },
  {
    path: '/today-tips',
    title: `오늘의 자취 꿀팁 | ${SITE_NAME}`,
    description:
      '새롭게 올라온 자취 꿀팁을 확인하고 일상에 필요한 생활 노하우를 찾아보세요.',
  },
  {
    path: '/monthly-tips',
    title: `월간 자취 꿀팁 | ${SITE_NAME}`,
    description:
      '이번 달 주목받는 자취 꿀팁과 유용한 생활 노하우를 홈마스터에서 만나보세요.',
  },
  {
    path: '/trending-tips',
    title: `인기 자취 꿀팁 | ${SITE_NAME}`,
    description:
      '많은 사람들이 관심을 가진 인기 자취 꿀팁을 찾아보고 저장해보세요.',
  },
];
