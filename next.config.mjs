/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only ignore ESLint during development
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
    dirs: ['src'], // Only lint the src directory
  },
  typescript: {
    // Only ignore TypeScript errors during development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  // Add image domains if you're fetching images from external sources
  images: {
    domains: ['localhost', 'supabase.co'],
  },
  // Improve build performance
  swcMinify: true,
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Specify the output directory
  distDir: '.next',
}

export default nextConfig 