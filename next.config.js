/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "fakestoreapi.com",
      'api.escuelajs.co',
      'api.lorem.space',
      'educacion30.b-cdn.net',
      'empresas.blogthinkbig.com',
      'imgs.search.brave.com',
      'mobimg.b-cdn.net',
      'placeimg.com',
      'unsplash.com'
    ]

  }
}

module.exports = nextConfig
