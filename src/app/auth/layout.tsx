import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Educational Platform',
    default: 'Authentication | Educational Platform'
  },
  description: 'Sign in or create an account to access tutorials, courses, and more.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 