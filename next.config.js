/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
});

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'app.100xdevs.com', 'app2.100xdevs.com']
    }
  }
};

module.exports = withPWA(nextConfig);
