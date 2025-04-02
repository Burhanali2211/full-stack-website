interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  longDescription?: string;
  createdAt: string;
  technologies?: string[];
  features?: string[];
  prerequisites?: string[];
  author?: {
    name: string;
    avatar: string;
    github?: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Learning Platform",
    description: "An intelligent education platform that adapts to each student's learning style using machine learning algorithms and provides personalized learning paths.",
    longDescription: "This comprehensive learning platform leverages artificial intelligence to create personalized learning experiences. It analyzes student performance, learning patterns, and preferences to generate custom curriculum paths and interactive content. The system includes real-time progress tracking, adaptive assessments, and intelligent content recommendations.",
    image: "/images/projects/project-ai-learning.jpg",
    tags: ["AI", "Machine Learning", "Education", "Personalization"],
    link: "/projects/ai-learning",
    difficulty: "Advanced",
    duration: "8-10 weeks",
    githubUrl: "https://github.com/educational-platform/ai-learning-platform",
    liveUrl: "https://ai-learning-demo.vercel.app",
    docsUrl: "https://docs.ai-learning-demo.com",
    createdAt: "2024-03-15",
    technologies: [
      "Next.js 14", 
      "TensorFlow.js", 
      "TypeScript", 
      "Tailwind CSS", 
      "Supabase", 
      "Vercel AI SDK"
    ],
    features: [
      "Personalized learning paths based on student performance",
      "AI-powered content recommendations",
      "Interactive assessments with real-time feedback",
      "Student progress analytics dashboard",
      "Content management system for educators"
    ],
    prerequisites: [
      "Intermediate knowledge of JavaScript/TypeScript",
      "Understanding of machine learning concepts",
      "Familiarity with Next.js or React"
    ],
    author: {
      name: "Alex Johnson",
      avatar: "/avatars/alex.jpg",
      github: "https://github.com/alexjohnson"
    }
  },
  {
    id: 2,
    title: "Interactive Course Platform",
    description: "A dynamic course platform featuring interactive content, real-time collaboration, and progress tracking.",
    longDescription: "Platform enables educators to create engaging courses with interactive elements like quizzes, discussions, and live sessions. Students can track their progress, collaborate with peers, and receive instant feedback on their work.",
    image: "/images/projects/project-interactive-course.jpg",
    tags: ["Education", "Collaboration", "Interactive Learning"],
    link: "/projects/interactive-course",
    difficulty: "Intermediate",
    duration: "6-8 weeks",
    githubUrl: "https://github.com/educational-platform/interactive-course-platform",
    liveUrl: "https://interactive-courses.vercel.app",
    createdAt: "2024-03-10",
    technologies: [
      "Next.js 14", 
      "React", 
      "TypeScript", 
      "Tailwind CSS", 
      "Prisma", 
      "Socket.io", 
      "PostgreSQL"
    ],
    features: [
      "Interactive course builder with drag-and-drop interface",
      "Real-time collaboration and discussions",
      "In-browser code execution for programming exercises",
      "Course progress tracking and analytics",
      "Assignment submission and grading system"
    ],
    prerequisites: [
      "Basic understanding of JavaScript/TypeScript",
      "Familiarity with React components",
      "Database fundamentals"
    ],
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      github: "https://github.com/sarahchen"
    }
  },
  {
    id: 3,
    title: "Adaptive Learning System",
    description: "An innovative learning system that adjusts difficulty and content based on student performance.",
    longDescription: "This system uses advanced algorithms to adapt content difficulty and presentation based on individual student performance and learning speed. It includes features like dynamic assessment, personalized feedback, and progress analytics.",
    image: "/images/projects/project-adaptive-learning.jpg",
    tags: ["Adaptive Learning", "Education Technology", "Analytics"],
    link: "/projects/adaptive-learning",
    difficulty: "Intermediate",
    duration: "4-6 weeks",
    githubUrl: "https://github.com/educational-platform/adaptive-learning-system",
    liveUrl: "https://adaptive-learning.vercel.app",
    createdAt: "2024-03-05",
    technologies: [
      "React", 
      "Node.js", 
      "Express", 
      "MongoDB", 
      "Chart.js", 
      "Tailwind CSS"
    ],
    features: [
      "Adaptive difficulty based on student performance",
      "Personalized learning recommendations",
      "Spaced repetition learning system",
      "Comprehensive analytics dashboard",
      "Exportable progress reports"
    ],
    prerequisites: [
      "JavaScript fundamentals",
      "Basic understanding of React",
      "Familiarity with RESTful APIs"
    ],
    author: {
      name: "Miguel Rodriguez",
      avatar: "/avatars/miguel.jpg",
      github: "https://github.com/miguelrodriguez"
    }
  },
  {
    id: 4,
    title: "Educational Analytics Dashboard",
    description: "Comprehensive analytics dashboard for tracking student progress and learning patterns.",
    longDescription: "Advanced analytics platform providing insights into student performance, learning patterns, and engagement metrics. Features include customizable dashboards, detailed reports, and predictive analytics for early intervention.",
    image: "/images/projects/project-educational-analytics.jpg",
    tags: ["Analytics", "Dashboard", "Education", "Data Visualization"],
    link: "/projects/educational-analytics",
    difficulty: "Advanced",
    duration: "10-12 weeks",
    githubUrl: "https://github.com/educational-platform/analytics-dashboard",
    docsUrl: "https://docs.analytics-dashboard.com",
    createdAt: "2024-02-28",
    technologies: [
      "Next.js", 
      "TypeScript", 
      "Recharts", 
      "D3.js", 
      "PostgreSQL", 
      "TanStack Query"
    ],
    features: [
      "Real-time data visualization",
      "Customizable dashboard layouts",
      "Exportable reports in multiple formats",
      "Predictive analytics for student outcomes",
      "Automated alert system for at-risk students"
    ],
    prerequisites: [
      "Experience with React or Next.js",
      "Understanding of data visualization principles",
      "Knowledge of SQL queries"
    ],
    author: {
      name: "Aisha Patel",
      avatar: "/avatars/aisha.jpg",
      github: "https://github.com/aishapatel"
    }
  },
  {
    id: 5,
    title: "Design System Library",
    description: "Comprehensive UI component library with dark mode, animations, and accessibility features built for modern web applications.",
    longDescription: "A professionally crafted design system that provides a collection of reusable UI components. The library includes support for themes, animations, and follows accessibility best practices. Comprehensive documentation and interactive examples are provided.",
    image: "/images/projects/project-ai-learning.jpg",
    tags: ["React", "Storybook", "Figma", "Styled Components"],
    link: "/projects/design-system",
    difficulty: "Beginner",
    duration: "3-4 weeks",
    githubUrl: "https://github.com/educational-platform/design-system",
    liveUrl: "https://design-system.vercel.app",
    docsUrl: "https://docs.design-system.vercel.app",
    createdAt: "2024-02-20",
    technologies: [
      "React", 
      "TypeScript", 
      "Storybook", 
      "CSS-in-JS", 
      "Figma", 
      "Jest", 
      "React Testing Library"
    ],
    features: [
      "Theme customization with dark/light mode",
      "Responsive components for all screen sizes",
      "WCAG 2.1 AA compliant components",
      "Animation library with customizable settings",
      "Integrated form validation"
    ],
    prerequisites: [
      "Basic knowledge of React",
      "Understanding of component-based architecture",
      "Familiarity with CSS principles"
    ],
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      github: "https://github.com/sarahchen"
    }
  },
  {
    id: 6,
    title: "Sentiment Analysis Dashboard",
    description: "Real-time social media sentiment analysis tool using natural language processing and machine learning.",
    longDescription: "An advanced sentiment analysis tool that processes social media data in real-time to provide insights about brand perception and customer sentiment. The dashboard includes trend analysis, keyword tracking, and customizable alerts.",
    image: "/images/projects/project-interactive-course.jpg",
    tags: ["Python", "BERT", "FastAPI", "PostgreSQL"],
    link: "/projects/sentiment-analysis",
    difficulty: "Advanced",
    duration: "6-8 weeks",
    githubUrl: "https://github.com/educational-platform/sentiment-analysis",
    liveUrl: "https://sentiment-analysis.vercel.app",
    createdAt: "2024-02-15",
    technologies: [
      "Python 3.10", 
      "PyTorch", 
      "Hugging Face Transformers", 
      "FastAPI", 
      "Next.js", 
      "PostgreSQL", 
      "Redis"
    ],
    features: [
      "Real-time sentiment analysis of social media posts",
      "Trend analysis with historical data comparison",
      "Customizable alerts for sentiment changes",
      "Advanced filtering by keywords, hashtags, and users",
      "Exportable reports in CSV, PDF, and JSON formats"
    ],
    prerequisites: [
      "Python programming experience",
      "Understanding of NLP concepts",
      "Familiarity with RESTful APIs",
      "Basic machine learning knowledge"
    ],
    author: {
      name: "Miguel Rodriguez",
      avatar: "/avatars/miguel.jpg",
      github: "https://github.com/miguelrodriguez"
    }
  }
]; 