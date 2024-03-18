/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'app.100xdevs.com',
        'app2.100xdevs.com',
      ],
    },
  },
};

module.exports = nextConfig;
