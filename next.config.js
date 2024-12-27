/** @type {import('next').NextConfig} */
const nextConfig = {


  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
