import card1 from '@/assets/images/mocks/card1.png';
import card2 from '@/assets/images/mocks/card2.png';
import card3 from '@/assets/images/mocks/card3.png';

export type ChallengeMode =
  | 'preview'
  | 'preview-started'
  | 'active'
  | 'active-quit-confirm'
  | 'active-quit-success';

export type VerifyMode = 'default' | 'success' | 'fail';

export interface ChallengeExample {
  id: string;
  label: 'O' | 'X';
  title: string;
  description: string;
  imageSrc: string;
}

export interface ChallengeAuthor {
  name: string;
  rank: string;
  tipWins: number;
}

export interface Challenge {
  id: string;
  title: string;
  summary: string;
  description: string;
  verifyGuide: string;
  periodLabel: string;
  bottomPeriodLabel: string;
  cadenceLabel: string;
  completedMessage?: string;
  tags: string[];
  heroImages: string[];
  verifyExamples: ChallengeExample[];
  notices: string[];
  author: ChallengeAuthor;
  likes: number;
  bookmarks: number;
  shares: number;
  rating: number;
}

export const challenges: Challenge[] = [
  {
    id: 'recycle',
    title: '오늘은 분리수거 챌린지에용',
    summary: '분리수거를 더 쉽게 만드는 2주 습관 챌린지',
    description:
      '헷갈리기 쉬운 분리수거 기준을 실제 예시와 함께 익히고, 사진 인증으로 습관까지 만드는 챌린지예요. 매일 조금씩 실천하면서 올바른 배출 방법을 몸에 익힐 수 있어요.',
    verifyGuide: '비운 용기를 깨끗하게 헹군 뒤, 재질별로 분리한 상태를 촬영해 주세요.',
    periodLabel: '2025.08.07~2025.09.19',
    bottomPeriodLabel: '8. 18 ~ 8. 31',
    cadenceLabel: '주 2일, 2주 동안',
    completedMessage: '2025.08.07 별점 매기기를 완료했습니다.',
    tags: ['#청소', '#분리수거', '#정리', '#인테리어', '#가구'],
    heroImages: [card1.src, card2.src, card3.src],
    verifyExamples: [
      {
        id: 'ok-1',
        label: 'O',
        title: '성공 처리',
        description: '내용물을 깨끗하게 헹군 뒤, 부착물을 제거한 후 배출',
        imageSrc: card1.src,
      },
      {
        id: 'ok-2',
        label: 'O',
        title: '성공 처리',
        description: '부착물을 제거한 후 박스를 펼친 뒤 촬영',
        imageSrc: card2.src,
      },
      {
        id: 'fail-1',
        label: 'X',
        title: '실패 처리',
        description: '부착물을 제거해 주세요.',
        imageSrc: card3.src,
      },
      {
        id: 'fail-2',
        label: 'X',
        title: '실패 처리',
        description: '여러 재질이 섞여있는 플라스틱은 일반쓰레기로 분리하세요.',
        imageSrc: card1.src,
      },
    ],
    notices: [
      '00시 00분 ~ 23시 59분 사이에 인증하셔야 합니다.',
      '2주 동안 주 2일, 하루에 1번 인증샷을 촬영하셔야 합니다.',
      '기존에 저장된 사진은 사용하실 수 없습니다.',
      '인증샷은 외부에 노출되지 않습니다.',
    ],
    author: {
      name: '애니',
      rank: '자취마스터',
      tipWins: 20,
    },
    likes: 999,
    bookmarks: 999,
    shares: 999,
    rating: 4.4,
  },
  {
    id: 'soft-serve',
    title: '이번 주 인증샷은 아이스크림이에요',
    summary: '사진 한 장으로 가볍게 시작하는 주간 챌린지',
    description:
      '부담 없이 참여할 수 있는 짧은 챌린지입니다. 지정된 피사체를 촬영하고 이번 주 인증 버튼을 눌러 루틴을 만들어 보세요.',
    verifyGuide: '중앙 피사체가 잘 보이도록 가까이에서 한 장 촬영해 주세요.',
    periodLabel: '2025.08.18~2025.08.31',
    bottomPeriodLabel: '8. 18 ~ 8. 31',
    cadenceLabel: '주 2일, 2주 동안',
    tags: ['#사진', '#기록', '#주간미션'],
    heroImages: [card2.src, card1.src, card3.src],
    verifyExamples: [],
    notices: [
      '이번 주 주제에 맞는 장면을 촬영해 주세요.',
      '같은 사진을 반복 제출할 수 없습니다.',
    ],
    author: {
      name: '홈마스터',
      rank: '운영팀',
      tipWins: 0,
    },
    likes: 123,
    bookmarks: 78,
    shares: 16,
    rating: 4.8,
  },
];

export function getChallengeById(id: string) {
  return challenges.find(challenge => challenge.id === id) ?? challenges[0];
}
