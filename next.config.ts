import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "libsql"],
  outputFileTracingIncludes: { "/**/*": ["./data/academy.db"] },
  images: { remotePatterns: [{ protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" }] },
};

export default nextConfig;
