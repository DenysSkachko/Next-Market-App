import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack(config, { dev, isServer }) {
    if (dev) {
      config.devtool = 'cheap-module-source-map'
    }
    return config
  },
}

export default nextConfig
