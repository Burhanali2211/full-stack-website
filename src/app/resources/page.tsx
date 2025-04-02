import { defaultViewport } from '@/app/metadata';
import { Metadata } from "next";
import { BookOpen, Code, FileText, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Resources - Educational Platform",
  description: "Comprehensive collection of programming and development resources",
};

export const viewport = defaultViewport;

interface Resource {
  title: string;
  description: string;
  icon: JSX.Element;
  items: {
    name: string;
    description: string;
    link: string;
    type: "free" | "premium";
  }[];
}

const resources: Resource[] = [
  {
    title: "Documentation & Guides",
    description: "Official documentation and comprehensive guides for various technologies",
    icon: <BookOpen className="h-6 w-6" />,
    items: [
      {
        name: "Next.js Documentation",
        description: "Official documentation for Next.js framework",
        link: "https://nextjs.org/docs",
        type: "free"
      },
      {
        name: "React Documentation",
        description: "Learn React from its official documentation",
        link: "https://react.dev",
        type: "free"
      },
      {
        name: "TypeScript Handbook",
        description: "Complete guide to TypeScript",
        link: "https://www.typescriptlang.org/docs/",
        type: "free"
      }
    ]
  },
  {
    title: "Interactive Tutorials",
    description: "Learn by doing with these interactive coding tutorials",
    icon: <Code className="h-6 w-6" />,
    items: [
      {
        name: "React Fundamentals",
        description: "Master React basics with hands-on exercises",
        link: "/tutorials/react-fundamentals",
        type: "free"
      },
      {
        name: "TypeScript Mastery",
        description: "Deep dive into TypeScript with practical examples",
        link: "/tutorials/typescript",
        type: "premium"
      },
      {
        name: "Next.js Project Course",
        description: "Build real-world applications with Next.js",
        link: "/tutorials/nextjs-projects",
        type: "premium"
      }
    ]
  },
  {
    title: "Cheatsheets & Quick References",
    description: "Quick reference guides for common programming tasks",
    icon: <FileText className="h-6 w-6" />,
    items: [
      {
        name: "Git Commands",
        description: "Essential Git commands and workflows",
        link: "/resources/cheatsheets/git",
        type: "free"
      },
      {
        name: "React Hooks",
        description: "Complete React Hooks reference",
        link: "/resources/cheatsheets/react-hooks",
        type: "free"
      },
      {
        name: "TypeScript Types",
        description: "Common TypeScript types and patterns",
        link: "/resources/cheatsheets/typescript",
        type: "free"
      }
    ]
  },
  {
    title: "Video Tutorials",
    description: "In-depth video courses and tutorials",
    icon: <Video className="h-6 w-6" />,
    items: [
      {
        name: "Next.js Crash Course",
        description: "Quick introduction to Next.js",
        link: "/resources/videos/nextjs-crash-course",
        type: "free"
      },
      {
        name: "Full Stack Development",
        description: "Complete guide to full stack development",
        link: "/resources/videos/full-stack",
        type: "premium"
      },
      {
        name: "UI/UX Best Practices",
        description: "Learn modern UI/UX design principles",
        link: "/resources/videos/ui-ux",
        type: "premium"
      }
    ]
  }
];

export default function ResourcesPage() {
  return (
    <div className="container py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Learning Resources
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive collection of tutorials, documentation, and tools to help you master modern web development.
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {resources.map((resource) => (
          <div
            key={resource.title}
            className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                {resource.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{resource.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {resource.items.map((item) => (
                <div
                  key={item.name}
                  className="group rounded-md border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <Link
                      href={item.link}
                      className="font-medium hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.type === "premium"
                          ? "bg-primary/10 text-primary"
                          : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" className="group">
                View all
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to start learning?
        </h2>
        <p className="text-muted-foreground mb-8">
          Join our community and get access to premium resources and personalized learning paths.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tutorials">Browse Tutorials</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 