import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Rewrite rules for the writing domain
  async rewrites() {
    return [
      {
        source: "/writing",
        destination: `${process.env.WRITING_DOMAIN_URL}`,
      },
      {
        source: "/writing/:path+",
        destination: `${process.env.WRITING_DOMAIN_URL}/:path+`,
      },
      {
        source: "/writing/_next/:path+",
        destination: `${process.env.WRITING_DOMAIN_URL}/writing/_next/:path+`,
      },
    ];
  },
};

export default nextConfig;
