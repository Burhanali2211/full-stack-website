import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BackToTopButton } from "@/components/ui/back-to-top-button";
import { defaultMetadata, defaultViewport } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Educational Platform",
  description: "A platform for learning and practicing programming",
};

export const viewport = defaultViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn(inter.className, 'h-full antialiased')}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pt-16">
                {children}
              </main>
              <BackToTopButton />
              <Footer />
              <Toaster />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 