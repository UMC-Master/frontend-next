import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import { pretendard } from '../src/lib/fonts/pretendard';

const preview: Preview = {
  decorators: [
    Story => {
      // pretendard 폰트 적용
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add(pretendard.className);
      }

      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
