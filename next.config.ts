import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@prisma/client'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'utfs.io',
        pathname: '**'
      }
    ]
  }
};

export default nextConfig;
