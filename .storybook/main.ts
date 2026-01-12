/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async config => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    const rules = config.module.rules;

    // 기존 이미지/svg 처리 rule에서 svg 제외
    const imageRule = rules.find((rule: any) => rule?.test?.test?.('.svg'));
    if (imageRule) {
      imageRule.exclude = /\.svg$/i;
    }

    // SVG 처리: 기본은 URL(= next/image에 넣을 수 있음)
    rules.push({
      test: /\.svg$/i,
      oneOf: [
        {
          resourceQuery: /component/, // import Icon from './x.svg?component'
          use: ['@svgr/webpack'],
        },
        {
          type: 'asset/resource', // import url from './x.svg'
        },
      ],
    });

    return config;
  },
};

export default config;
