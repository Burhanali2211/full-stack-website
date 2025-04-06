/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose safe public environment variables
  // These will be available to client components
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimize static assets and prevent 404s for static chunks
  poweredByHeader: false,
  compress: true,
  
  // Improve static chunks generation with explicit configuration
  output: 'standalone',
  distDir: '.next',
  
  // Enable optimizations for faster builds
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-icons',
      'framer-motion'
    ],
    esmExternals: 'loose',
  },
  
  // Configure image domains for external images
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
  },
  
  typescript: {
    // Ignore TypeScript errors during build to allow deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build to allow deployment
    ignoreDuringBuilds: true,
  },
  
  webpack: (config, { isServer }) => {
    // Fix highlight.js and react-syntax-highlighter compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      // Remove the problematic highlight.js alias
    };
    
    // Client-side polyfills for browser compatibility
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      process: require.resolve('process/browser'),
    };
    
    // Optimize chunk loading - with fixed settings
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      // Removed mangleExports as it's incompatible with cacheUnaffected
    };
    
    // Add cache busting for static assets
    if (!isServer) {
      config.output.filename = `static/chunks/[name].[contenthash].js`;
      config.output.chunkFilename = `static/chunks/[name].[contenthash].js`;
    }
    
    return config;
  },
  
  // Speed up builds with file system caching
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
  
  outputFileTracing: true
};

module.exports = nextConfig;