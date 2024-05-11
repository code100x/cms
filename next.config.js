/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'app.100xdevs.com', 'app2.100xdevs.com']
    }
  }
};

module.exports = nextConfig;
