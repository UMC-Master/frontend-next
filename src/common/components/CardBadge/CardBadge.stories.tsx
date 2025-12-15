import type { Meta, StoryObj } from '@storybook/nextjs';
import CardBadge from './CardBadge';
import type { CardBadgeProps, CardBadgeType } from './CardBadge';

type PlaygroundArgs = CardBadgeProps & {
  badgeType: CardBadgeType;
  badgeCount?: number;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Card/CardBadge',
  component: CardBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CardBadge는 카드 이미지 위에 표시되는 배지 컴포넌트입니다. ' +
          'type에 따라 아이콘이 바뀌며, count는 선택적으로 표시됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: false },
    count: { control: false },
    className: { control: 'text' },
    onClick: { action: 'clicked' },

    badgeType: {
      control: { type: 'select' },
      options: ['like', 'save', 'share'],
      description: '배지 타입 선택',
    },
    badgeCount: {
      control: { type: 'number' },
      description: '배지 숫자',
    },
  },
  args: {
    badgeType: 'like',
    badgeCount: 12,
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

function renderBadge(args: PlaygroundArgs) {
  const { badgeType, badgeCount, ...rest } = args;

  return (
    <CardBadge
      {...(rest as CardBadgeProps)}
      type={badgeType}
      count={badgeCount}
    />
  );
}

export const Like: Story = {
  args: { badgeType: 'like', badgeCount: 12 },
  render: args => (
    <div className="rounded-xl bg-gray-200 px-100 py-10">
      {renderBadge(args)}
    </div>
  ),
};

export const Save: Story = {
  args: { badgeType: 'save', badgeCount: 3 },
  render: args => (
    <div className="rounded-xl bg-gray-200 px-100 py-10">
      {renderBadge(args)}
    </div>
  ),
};

export const Share: Story = {
  args: { badgeType: 'share', badgeCount: 101 },
  render: args => (
    <div className="rounded-xl bg-gray-200 px-100 py-10">
      {renderBadge(args)}
    </div>
  ),
};
