export interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

export const featuredProjects: readonly FeaturedProject[] = [
  {
    title: "Modern Blog Platform",
    description: "Build a full-stack blog platform with Next.js, TypeScript, and MongoDB",
    image: "/projects/blog-platform.svg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    link: "/projects/blog-platform",
    difficulty: "Beginner",
    duration: "2-3 hours",
  },
  {
    title: "Real-time Chat App",
    description: "Create a real-time chat application with WebSocket integration",
    image: "/projects/chat-app.svg",
    tags: ["React", "Node.js", "Socket.io", "Express"],
    link: "/projects/chat-app",
    difficulty: "Intermediate",
    duration: "4-5 hours",
  },
  {
    title: "E-commerce Dashboard",
    description: "Develop a comprehensive e-commerce admin dashboard",
    image: "/projects/ecommerce-dashboard.svg",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Chart.js"],
    link: "/projects/ecommerce-dashboard",
    difficulty: "Advanced",
    duration: "8-10 hours",
  },
] as const; 