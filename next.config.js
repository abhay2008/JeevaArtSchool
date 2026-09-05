/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  transpilePackages: ["animejs"],
  async rewrites() {
    const owner = process.env.GITHUB_OWNER || "abhay2008";
    const repo = process.env.GITHUB_REPO || "jeeva-art-school-admin";
    const branch = process.env.GITHUB_BRANCH || "main";
    return {
      fallback: [
        {
          source: "/uploads/:path*",
          destination: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public/uploads/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
