import type { Meta, StoryObj } from '@storybook/nextjs';
import CardStack from './CardStack';
import type { CardStackItem } from './CardStack';

const meta: Meta<typeof CardStack> = {
  title: 'Components/Card/CardStack',
  component: CardStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CardStack은 최대 3장의 카드를 우측 상단 방향으로 겹쳐 보여주는 스택 컴포넌트입니다. ' +
          '상단 카드는 드래그로 넘길 수 있고, 탭(클릭) 시 onCardClick을 호출합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CardStack>;

function makeCards(n: number): CardStackItem[] {
  return Array.from({ length: n }).map((_, i) => ({
    id: `card-${i + 1}`,
    imageUrl: `https://picsum.photos/seed/cardstack-${i + 1}/800/800`,
    alt: `card ${i + 1}`,
  }));
}

export const Default: Story = {
  args: {
    cards: makeCards(3),
    onCardClick: card => console.log('onCardClick:', card.id),
    onIndexChange: idx => console.log('onIndexChange:', idx),
  },
  render: args => (
    <div className="w-[420px]">
      <CardStack {...args} />
    </div>
  ),
};
