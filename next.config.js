/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',

  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
