/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain or any other external image domain
  },
}

module.exports = nextConfig
