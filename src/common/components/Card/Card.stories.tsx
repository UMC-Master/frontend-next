import type { Meta, StoryObj } from '@storybook/nextjs';
import Card from './Card';
import type { CardProps } from './Card';
import type { CardBadgeType } from '../CardBadge/CardBadge';

type PlaygroundArgs = CardProps & {
  badgeType: CardBadgeType;
  badgeCount: number;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Card/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card는 이미지/타이틀을 보여주는 카드 컴포넌트입니다. `href`가 있으면 전체 영역이 링크로 동작하며, `badges`를 통해 이미지 위 배지를 오버레이할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    imageSrc: {
      control: 'text',
      description: '이미지 URL(현재 string만 지원)',
    },
    imageAlt: { control: 'text' },
    title: { control: 'text' },
    href: { control: 'text', description: '있으면 링크 카드로 동작' },
    className: { control: 'text' },
    showBadge: { control: 'boolean', description: '배지 렌더링 여부' },
    badges: { control: false },
    badgeType: {
      control: { type: 'select' },
      options: ['like', 'save', 'share'],
      description: 'Playground: 배지 타입',
    },
    badgeCount: {
      control: { type: 'number' },
      description: 'Playground: 배지 카운트',
    },
  },
  args: {
    imageSrc: 'https://picsum.photos/seed/card/600/520',
    imageAlt: 'card image',
    title: '꿀팁 제목이 들어갑니다',
    className: 'w-[220px]',
    showBadge: true,
    badgeType: 'like',
    badgeCount: 12,
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

function renderCard(args: PlaygroundArgs) {
  const { badgeType, badgeCount, showBadge, ...cardArgs } = args;

  return (
    <Card
      {...(cardArgs as CardProps)}
      showBadge={showBadge}
      badges={showBadge ? [{ type: badgeType, count: badgeCount }] : []}
    />
  );
}

export const Default: Story = {
  render: renderCard,
};

export const WithRouter: Story = {
  args: {
    href: '/tips/1',
  },
  render: renderCard,
  parameters: {
    docs: {
      description: { story: '클릭 시 카드 전체가 링크로 동작합니다.' },
    },
  },
};

export const BadgeHidden: Story = {
  args: {
    showBadge: false,
    badgeType: 'like',
    badgeCount: 99,
  },
  render: renderCard,
};

export const LongTitle: Story = {
  args: {
    title:
      '제목이 아주 길어질 때 줄바꿈 레이아웃이 어떻게 보이는지 확인하는 스토리입니다',
    badgeType: 'like',
    badgeCount: 999,
  },
  render: renderCard,
};
