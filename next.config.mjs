/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  typescript: {
    // Only ignore TypeScript errors during development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  // Configure image domains and remote patterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'supabase.co',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**',
      },
    ],
  },
  // Improve build performance
  swcMinify: true,
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Specify the output directory
  distDir: '.next',
}

export default nextConfig 