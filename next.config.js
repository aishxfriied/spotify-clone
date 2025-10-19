/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co'],
    unoptimized: true, // Required for static export
  },
  output: 'export', // Enable static export
  trailingSlash: true, // Required for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/spotify-clone' : '', // Adjust for your repo name
}

module.exports = nextConfig
