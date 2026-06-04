import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  devIndicators: {
    position: 'bottom-right',
  },
}

export default nextConfig
