import type { Meta, StoryObj } from '@storybook/nextjs';
import SignUpHeader from './SignUpHeader';

const meta = {
  title: 'Auth/SignUp/SignUpHeader',
  component: SignUpHeader,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'black',
          value: '#000000',
        },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignUpHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
