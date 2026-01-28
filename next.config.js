/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'app.100xdevs.com',
        'app2.100xdevs.com',
      ],
    },
  },
  swcMinify: true,
  // webpack: (config) => {
  //   // Enable polling based on env variable being set
  //   if (process.env.NEXT_WEBPACK_USEPOLLING) {
  //     config.watchOptions = {
  //       poll: 500,
  //       aggregateTimeout: 300,
  //     };
  //   }
  //   return config;
  // },
  output: 'standalone',
};

module.exports = nextConfig;
