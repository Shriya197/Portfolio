import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/resume.pdf',
        destination: '/resume.pdf', 
      },
    ];
  },
};

export default nextConfig;
