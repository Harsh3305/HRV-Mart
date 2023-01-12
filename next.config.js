/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "fakestoreapi.com", ,
      "api.lorem.space",
      "lh3.googleusercontent.com"
  ]
  }
}

module.exports = nextConfig
