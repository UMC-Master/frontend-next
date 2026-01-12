import type { Meta, StoryObj } from '@storybook/nextjs';
import { StepProgressBar } from './StepProgressBar';

const meta = {
  title: 'Components/UI/StepProgressBar',
  component: StepProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: {
        type: 'range',
        min: 1,
        max: 5,
        step: 1,
      },
    },
    totalSteps: {
      control: {
        type: 'range',
        min: 3,
        max: 10,
        step: 1,
      },
    },
  },
} satisfies Meta<typeof StepProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = {
  args: {
    currentStep: 1,
    totalSteps: 5,
  },
};

export const Step3: Story = {
  args: {
    currentStep: 3,
    totalSteps: 5,
  },
};

export const Step5: Story = {
  args: {
    currentStep: 5,
    totalSteps: 5,
  },
};

export const Interactive: Story = {
  args: {
    currentStep: 2,
    totalSteps: 5,
  },
};
