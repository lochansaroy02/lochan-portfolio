import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dist',
        permanent: true, // or true if you want a 308 permanent redirect
      },
    ];
  },
};

module.exports = {
  images: {
    domains: ['m.media-amazon.com'],
  },
};

export default nextConfig;
