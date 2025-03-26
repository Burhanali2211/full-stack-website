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
    githubUrl: "#",
    liveUrl: "#",
    docsUrl: "https://docs.ai-learning-demo.com",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    title: "Interactive Course Platform",
    description: "A dynamic course platform featuring interactive content, real-time collaboration, and progress tracking.",
    longDescription: "Platform enables educators to create engaging courses with interactive elements like quizzes, discussions, and live sessions. Students can track their progress, collaborate with peers, and receive instant feedback on their work.",
    image: "/images/projects/project-interactive-course.jpg",
    tags: ["Education", "Collaboration", "Interactive Learning"],
    link: "/",
    difficulty: "Intermediate",
    duration: "6-8 weeks",
    githubUrl: "#",
    liveUrl: "#",
    createdAt: "2024-03-10",
  },
  {
    id: 3,
    title: "Adaptive Learning System",
    description: "An innovative learning system that adjusts difficulty and content based on student performance.",
    longDescription: "This system uses advanced algorithms to adapt content difficulty and presentation based on individual student performance and learning speed. It includes features like dynamic assessment, personalized feedback, and progress analytics.",
    image: "/images/projects/project-adaptive-learning.jpg",
    tags: ["Adaptive Learning", "Education Technology", "Analytics"],
    link: "/projects/smart-home",
    difficulty: "Intermediate",
    duration: "4-6 weeks",
    githubUrl: "#",
    liveUrl: "#",
    createdAt: "2024-03-05",
  },
  {
    id: 4,
    title: "Educational Analytics Dashboard",
    description: "Comprehensive analytics dashboard for tracking student progress and learning patterns.",
    longDescription: "Advanced analytics platform providing insights into student performance, learning patterns, and engagement metrics. Features include customizable dashboards, detailed reports, and predictive analytics for early intervention.",
    image: "/images/projects/project-educational-analytics.jpg",
    tags: ["Analytics", "Dashboard", "Education", "Data Visualization"],
    link: "/projects/ecommerce-backend",
    difficulty: "Advanced",
    duration: "10-12 weeks",
    githubUrl: "#",
    docsUrl: "https://docs.ecommerce-microservices.com",
    createdAt: "2024-02-28",
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
    githubUrl: "https://github.com/example/design-system",
    liveUrl: "https://design-system-demo.com",
    docsUrl: "https://docs.design-system-demo.com",
    createdAt: "2024-02-20",
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
    githubUrl: "https://github.com/example/sentiment-analysis",
    liveUrl: "https://sentiment-analysis-demo.com",
    createdAt: "2024-02-15",
  }
]; 