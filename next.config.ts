import nextPWA from 'next-pwa';
import runtimeCache from 'next-pwa/cache';
import { i18n } from './next-i18next.config';

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  runtimeCaching: runtimeCache,
});

export default withPWA({
  i18n,
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Next.js 16 enables Turbopack by default. next-pwa uses webpack,
  // so we declare an empty turbopack config to suppress the conflict error
  // and keep using webpack for the PWA build.
  turbopack: {},
  async rewrites() {
    return [
      {
        source: '/:path((?!manifest|api).+\\.json)',
        destination: '/api/:path',
      },
    ];
  },
});
