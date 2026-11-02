import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "witchr.com",
          },
        ],
        destination: "https://www.witchr.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
