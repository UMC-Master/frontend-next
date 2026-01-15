import type { Meta, StoryObj } from '@storybook/nextjs';
import FilterBar from './FilterBar';
import type { FilterBarProps } from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Components/Filter/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FilterBar는 필터 옵션을 버튼 형태로 제공하는 UI 컴포넌트입니다.\n\n' +
          '- 내부 state로 선택 값을 관리합니다.\n' +
          '- `defaultValue`는 초기 선택 값으로 사용됩니다.\n' +
          '- 버튼 클릭 시 `onChange(value)`가 호출됩니다.\n\n',
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: { type: 'select' },
      options: ['all', 'like', 'save', 'share'],
      description: '초기 선택 값',
      table: {
        type: { summary: `'all' | 'like' | 'save' | 'share'` },
        defaultValue: { summary: 'all' },
      },
    },
    onChange: {
      action: 'change',
      description: '필터 선택 시 호출되는 콜백',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
  },
  args: {
    defaultValue: 'all',
  } satisfies FilterBarProps,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  render: args => <FilterBar key={args.defaultValue} {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          '기본 상태의 FilterBar입니다. Controls에서 defaultValue를 변경하면 ' +
          '컴포넌트가 리마운트되어 선택 상태가 반영됩니다.',
      },
    },
  },
};

export const DefaultLikeSelected: Story = {
  args: { defaultValue: 'like' },
  render: args => <FilterBar key={args.defaultValue} {...args} />,
};

export const DefaultSaveSelected: Story = {
  args: { defaultValue: 'save' },
  render: args => <FilterBar key={args.defaultValue} {...args} />,
};

export const DefaultShareSelected: Story = {
  args: { defaultValue: 'share' },
  render: args => <FilterBar key={args.defaultValue} {...args} />,
};
