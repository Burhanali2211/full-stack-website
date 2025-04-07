export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  author: {
    name: string;
    title: string;
  };
  githubUrl?: string;
  demoUrl?: string;
  about: string;
  slug: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "File Converter App",
    description: "A versatile file conversion tool supporting multiple formats",
    category: "Utilities",
    technologies: ["React", "TypeScript", "Node.js", "Express", "FFmpeg"],
    author: {
      name: "Alex Chen",
      title: "Senior Full Stack Developer"
    },
    githubUrl: "https://github.com/example/file-converter",
    demoUrl: "https://file-converter-demo.com",
    about: "A powerful file conversion application that supports various file formats including documents, images, audio, and video. Built with performance and user experience in mind.",
    slug: "file-converter",
    image: "/images/projects/project-interactive-course.jpg"
  },
  {
    id: "2",
    title: "Web Game Platform",
    description: "Interactive multiplayer web games platform",
    category: "Gaming",
    technologies: ["Next.js", "TypeScript", "WebSocket", "MongoDB", "Docker"],
    author: {
      name: "Sarah Johnson",
      title: "Game Developer"
    },
    githubUrl: "https://github.com/example/web-game",
    demoUrl: "https://web-game-demo.com",
    about: "A modern web gaming platform featuring real-time multiplayer games, user authentication, and leaderboards. Built with scalability and performance in mind.",
    slug: "web-game",
    image: "/images/projects/project-ai-learning.jpg"
  },
  {
    id: "3",
    title: "Python Data Converter",
    description: "Data conversion and transformation tool",
    category: "Data Tools",
    technologies: ["Python", "Pandas", "FastAPI", "PostgreSQL", "Docker"],
    author: {
      name: "Mike Zhang",
      title: "Data Engineer"
    },
    githubUrl: "https://github.com/example/python-converter",
    demoUrl: "https://python-converter-demo.com",
    about: "A robust data conversion tool that supports various data formats and provides powerful transformation capabilities. Perfect for data scientists and analysts.",
    slug: "python-converter",
    image: "/images/projects/project-adaptive-learning.jpg"
  },
  {
    id: "4",
    title: "API Dashboard",
    description: "Modern API management and monitoring dashboard",
    category: "Developer Tools",
    technologies: ["React", "TypeScript", "GraphQL", "Node.js", "Redis"],
    author: {
      name: "Emma Wilson",
      title: "Backend Developer"
    },
    githubUrl: "https://github.com/example/api-dashboard",
    demoUrl: "https://api-dashboard-demo.com",
    about: "A comprehensive API management dashboard that helps developers monitor, test, and document their APIs. Features real-time monitoring and analytics.",
    slug: "api-dashboard",
    image: "/images/projects/project-educational-analytics.jpg"
  }
]; 