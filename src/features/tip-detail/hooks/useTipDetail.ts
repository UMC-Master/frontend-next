import { useState } from 'react';

export function useTipDetail(tipId: string) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const tip = {
    id: tipId,
    title: '떡볶이 개맛있게 만드는법 끼려움 나와 동참할 사람 ㅋㅋ',
    author: {
      name: '애니',
      level: '자취마스터',
      avatarUrl: '/image.png',
    },
    createdAt: '2025.08.07 01:43',
    images: ['/image.png', '/image.png', '/image.png', '/image.png'],
    content:
      '향수는 본래 전문가들만 이해할 수 있는 복잡한 언어와 추상적인 개념으로 설명되는 경우가 많습니다. 탑 노트, 미들 노트, 베이스 노트 같은 용어는 향에 익숙하지 않은 사용자에게는 낯설고 어렵게 느껴질 수 있습니다. 저는 이러한 장벽을 낮추고, 누구나 직관적으로 향을 이해하고 즐길 수 있도록 시각적 언어로 재해석한 디자인을 제안했습니다. 향의 지속 시간이나 발향력 같은 정보는 그래프와 아이콘으로 단순화하고, 계절·성별·가격대 필터는 직관적인 버튼과 컬러 구분으로 제공하여 사용자가 쉽게 취향에 맞는 향수를 탐색할 수 있도록 했습니다. 또한 향수의 카테고리를 실제 원료 이미지와 함께 카드 형태로 배치해 감각적인 몰입 경험을 제공했습니다. 이 과정을 통해 낯선 향의 언어를 감각적이고 즐거운 학습 경험으로 바꾸는 새로운 접근을 시도했습니다.또한 향수의 카테고리를 실제 원료 이미지와 함께 카드 형태로 배치해 감각적인 몰입 경험을 제공했습니다. 이 과정을 통해 낯선 향의 언어를 감각적이고 즐거운 학습 경험으로 바꾸는 새로운 접근을 시도했습니다.',
    tags: ['청소', '방', '정리', '인테리어', '가구'],
    stats: {
      like: 999,
      bookmark: 999,
      share: 999,
    },
  };

  return {
    tip,
    isDeleteOpen,
    openDelete: () => setDeleteOpen(true),
    closeDelete: () => setDeleteOpen(false),
  };
}
