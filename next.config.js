/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["uploads-ssl.webflow.com"],
  },
};

module.exports = nextConfig;
