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
        <style>{`
          .loader {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            background-color: var(--background);
            transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
          }
          .loader.loaded {
            opacity: 0;
            visibility: hidden;
          }
          .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top-color: var(--primary);
            animation: spin 1s ease-in-out infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .dark .loader-spinner {
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top-color: var(--primary);
          }
        `}</style>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const loader = document.createElement('div');
              loader.className = 'loader';
              loader.innerHTML = '<div class="loader-spinner"></div>';
              document.body.appendChild(loader);
              
              window.addEventListener('load', function() {
                setTimeout(function() {
                  loader.classList.add('loaded');
                  setTimeout(function() {
                    loader.remove();
                  }, 300);
                }, 500);
              });
            })();
          `
        }} />
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