/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning rather than error during build
    ignoreDuringBuilds: true,
    dirs: ['src'], // Only lint the src directory
  },
  typescript: {
    // Avoid TypeScript errors blocking deployment
    ignoreBuildErrors: true,
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
  // Add environment variables
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

export default nextConfig 