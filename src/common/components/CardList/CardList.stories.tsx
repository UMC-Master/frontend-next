import type { Meta, StoryObj } from '@storybook/nextjs';
import CardList from './CardList';
import type { CardListProps, CardListItem } from './CardList';
import { CardBadgeType } from '@/common/components/CardBadge/CardBadge';

type PlaygroundArgs = CardListProps & {
  badgeType: CardBadgeType;
  badgeCount?: number;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Card/CardList',
  component: CardList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CardList는 카드들을 2열 그리드로 렌더링하는 리스트 컴포넌트입니다. `items`로 카드 데이터를 전달하고, `showBadge`로 배지 노출 여부를 제어합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    showBadge: { control: 'boolean' },
    items: { control: false },
    badgeType: {
      control: { type: 'select' },
      options: ['like', 'save', 'share'],
      description: '모든 카드에 적용할 배지 타입',
    },
    badgeCount: {
      control: { type: 'number' },
      description: '모든 카드에 적용할 배지 카운트',
    },
  },
  args: {
    showBadge: true,
    className: 'w-[480px]',
    badgeType: 'like',
    badgeCount: 12,
    items: [
      {
        id: 1,
        imageSrc: 'https://picsum.photos/seed/tip1/600/520',
        imageAlt: 'tip 1',
        title: '꿀팁 1',
        href: '/tips/1',
        badges: [{ type: 'like', count: 12 }],
      },
      {
        id: 2,
        imageSrc: 'https://picsum.photos/seed/tip2/600/520',
        imageAlt: 'tip 2',
        title: '꿀팁 2',
        href: '/tips/2',
        badges: [{ type: 'save', count: 3 }],
      },
      {
        id: 3,
        imageSrc: 'https://picsum.photos/seed/tip3/600/520',
        imageAlt: 'tip 3',
        title: '꿀팁 3',
        href: '/tips/3',
        badges: [{ type: 'share', count: 1 }],
      },
      {
        id: 4,
        imageSrc: 'https://picsum.photos/seed/tip4/600/520',
        imageAlt: 'tip 4',
        title: '제목이 길어질 때 줄바꿈이 어떻게 되는지 확인하는 카드',
        href: '/tips/4',
        badges: [{ type: 'like', count: 999 }],
      },
    ] satisfies CardListItem[],
  } satisfies PlaygroundArgs,
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

function applyUniformBadge(args: PlaygroundArgs): CardListProps {
  const { badgeType, badgeCount, showBadge, items, ...rest } = args;

  const nextItems = (items ?? []).map(item => ({
    ...item,
    badges: showBadge ? [{ type: badgeType, count: badgeCount }] : [],
  }));

  return {
    ...(rest as Omit<CardListProps, 'items' | 'showBadge'>),
    showBadge,
    items: nextItems,
  };
}

export const Default: Story = {
  render: args => <CardList {...applyUniformBadge(args)} />,
};

export const BadgeHidden: Story = {
  args: { showBadge: false },
  render: args => <CardList {...applyUniformBadge(args)} />,
};

export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      imageSrc: `https://picsum.photos/seed/many-${i}/600/520`,
      imageAlt: `many ${i + 1}`,
      title: `꿀팁 ${i + 1}`,
      href: `/tips/${i + 1}`,
      badges: [],
    })),
  },
  render: args => <CardList {...applyUniformBadge(args)} />,
};
