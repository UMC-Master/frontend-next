import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Turbopack은 @svgr/webpack과 모듈 interop 이슈가 있어 webpack 사용
  // package.json scripts에 --webpack 플래그 표사
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
