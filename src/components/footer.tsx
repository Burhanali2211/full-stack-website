"use client";

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-12 bg-background/80 backdrop-blur-sm">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Educational Platform</h3>
          <p className="text-muted-foreground text-sm max-w-[42rem]">
            Learn programming with hands-on projects and interactive exercises.
          </p>
          <div className="flex items-center mt-4 space-x-4">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link href="mailto:info@example.com" aria-label="Email">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Resources</h3>
          <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/playground" className="text-muted-foreground hover:text-foreground transition-colors">
            Playground
          </Link>
          <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
            Resources
          </Link>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Community</h3>
          <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
            Forums
          </Link>
          <Link href="/community/discord" className="text-muted-foreground hover:text-foreground transition-colors">
            Discord
          </Link>
          <Link href="/community/events" className="text-muted-foreground hover:text-foreground transition-colors">
            Events
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Legal</h3>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
      
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-muted-foreground">
          © {currentYear} Educational Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 