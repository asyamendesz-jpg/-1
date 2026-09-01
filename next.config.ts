import type { NextConfig } from "next";

const repoName = "-1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_PAGES === "true" ? `/${repoName}` : "",
};

export default nextConfig;
