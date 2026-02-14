import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/event",
        destination: "https://analytics.ayris.tech/api/event",
      },
    ];
  },
};

export default nextConfig;
