import type { Meta, StoryObj } from '@storybook/nextjs';
import AuthPageHeader from './AuthPageHeader';

const meta = {
  title: 'Auth/AuthPageHeader',
  component: AuthPageHeader,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#ffffff' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    title: '로그인',
    onBack: () => {},
  },
};

export const SignUp: Story = {
  args: {
    title: '회원가입',
    onBack: () => {},
  },
};
