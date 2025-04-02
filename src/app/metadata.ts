import { Metadata, Viewport } from 'next';

// Configure the base URL based on environment
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Default viewport settings for the site
export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Default metadata for the site
export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Educational Platform | Learn Programming & Web Development",
    template: "%s | Educational Platform"
  },
  description: "Interactive educational platform for learning programming, web development, and other tech skills with hands-on tutorials and projects.",
  keywords: ["programming", "web development", "learning", "tutorials", "coding", "JavaScript", "Python", "Next.js", "React"],
  authors: [
    { name: "Educational Platform Team" }
  ],
  creator: "Educational Platform",
  publisher: "Educational Platform",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Educational Platform",
    title: "Educational Platform | Learn Programming & Web Development",
    description: "Interactive educational platform for learning programming, web development, and other tech skills with hands-on tutorials and projects.",
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Educational Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Educational Platform | Learn Programming & Web Development",
    description: "Interactive educational platform for learning programming, web development, and other tech skills with hands-on tutorials and projects.",
    images: [`${baseUrl}/images/twitter-image.jpg`],
    creator: "@eduplatform"
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      }
    ]
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code when available
  },
  category: "education"
}; 