import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: "/writing",

  // Rewrite rules for the writing domain
  async rewrites() {
    return [
      {
        source: "/writing",
        destination: `${process.env.WRITING_DOMAIN_URL}`,
      },
      {
        source: '/writing/docs/:path+',
        destination: `${process.env.WRITING_DOMAIN_URL}/docs/:path+`,
      },
      {
        source: '/writing/blog/:path+',
        destination: `${process.env.WRITING_DOMAIN_URL}/blog/:path+`,
      }
    ];
  },
};

export default nextConfig;
