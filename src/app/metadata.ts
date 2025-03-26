import { Metadata } from 'next';

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return 'http://localhost:3000';
};

export const metadata: Metadata = {
  title: "Developer's Mindset",
  description: 'Learn programming and web development through interactive tutorials and projects.',
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    title: "Developer's Mindset",
    description: 'Learn programming and web development through interactive tutorials and projects.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Developer's Mindset",
    description: 'Learn programming and web development through interactive tutorials and projects.',
  },
}; 