import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "libsql"],
  images: { remotePatterns: [] },
  experimental: {},
};

export default nextConfig;
