import { Tutorial } from "@/types/tutorial";

export const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "Introduction to AI in Education",
    description: "Learn how artificial intelligence is transforming education through personalized learning experiences.",
    image: "/images/blog/blog-1.jpg",
    difficulty: "beginner",
    category: "AI & Education",
    prerequisites: [
      "Basic understanding of AI concepts",
      "Familiarity with educational technology"
    ],
    duration: 120, // 2 hours in minutes
    chapters: 8,
    students: 1250,
    rating: 4.8,
    publishedAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
    sections: [
      {
        id: "1-1",
        title: "Introduction to AI in Education",
        description: "Understanding the basics of AI in education",
        content: "# Introduction to AI in Education\n\nAI is revolutionizing education by providing personalized learning experiences...",
        isCompleted: false
      },
      {
        id: "1-2",
        title: "Key Applications",
        description: "Exploring how AI is used in education",
        content: "# Key Applications of AI in Education\n\nAI has various applications in education...",
        isCompleted: false
      }
    ],
    whatYouLearn: [
      "Understand AI's role in education",
      "Learn about key AI applications",
      "Explore future trends"
    ],
    hasQuiz: true
  },
  {
    id: "2",
    title: "Building Interactive Learning Platforms",
    description: "Create engaging educational platforms with modern web technologies.",
    image: "/images/blog/blog-2.jpg",
    difficulty: "intermediate",
    category: "Web Development",
    prerequisites: [
      "Basic React knowledge",
      "Understanding of web development"
    ],
    duration: 180, // 3 hours in minutes
    chapters: 12,
    students: 2100,
    rating: 4.9,
    publishedAt: "2024-03-19T09:00:00Z",
    updatedAt: "2024-03-19T09:00:00Z",
    sections: [
      {
        id: "2-1",
        title: "Setting Up Your Development Environment",
        description: "Configure your development environment",
        content: "# Setting Up Your Development Environment\n\nLet's set up your development environment...",
        isCompleted: false
      },
      {
        id: "2-2",
        title: "Building Core Features",
        description: "Implement core platform features",
        content: "# Building Core Features\n\nNow let's implement the core features...",
        isCompleted: false
      }
    ],
    whatYouLearn: [
      "Build interactive learning platforms",
      "Implement user authentication",
      "Create engaging UI/UX"
    ],
    hasQuiz: true
  },
  {
    id: "3",
    title: "Data Analytics in Education",
    description: "Understanding student performance through data analysis and visualization.",
    image: "/images/blog/blog-3.jpg",
    difficulty: "advanced",
    category: "Data Science",
    prerequisites: [
      "Basic Python knowledge",
      "Understanding of data analysis"
    ],
    duration: 240, // 4 hours in minutes
    chapters: 15,
    students: 980,
    rating: 4.7,
    publishedAt: "2024-03-18T08:00:00Z",
    updatedAt: "2024-03-18T08:00:00Z",
    sections: [
      {
        id: "3-1",
        title: "Data Collection and Processing",
        description: "Learn about data collection methods",
        content: "# Data Collection and Processing\n\nUnderstanding how to collect and process educational data...",
        isCompleted: false
      },
      {
        id: "3-2",
        title: "Data Visualization",
        description: "Create meaningful visualizations",
        content: "# Data Visualization\n\nLearn how to create effective visualizations...",
        isCompleted: false
      }
    ],
    whatYouLearn: [
      "Analyze educational data",
      "Create data visualizations",
      "Make data-driven decisions"
    ],
    hasQuiz: true
  },
  {
    id: 4,
    title: "Modern React Development with Next.js",
    description: "Learn how to build scalable web applications using React and Next.js with best practices and modern tooling.",
    category: "Web Development",
    difficulty: "intermediate",
    duration: "4 hours",
    rating: 4.8,
    students: 1250,
    image: "/images/blog/blog-1.jpg",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    chapters: 12,
    slug: "modern-react-development-with-nextjs",
    author: {
      name: "Sarah Johnson",
      image: "/authors/sarah.jpg",
      role: "Senior Frontend Developer"
    },
    date: "2024-03-20",
    publishedAt: "2024-03-20T10:00:00Z",
    prerequisites: [
      "Basic understanding of JavaScript",
      "Familiarity with React concepts",
      "Node.js installed on your machine"
    ],
    objectives: [
      "Set up a Next.js project with TypeScript and Tailwind CSS",
      "Understand Server and Client Components",
      "Implement dynamic routing and data fetching",
      "Deploy your application to production"
    ],
    resources: [
      {
        title: "Next.js Documentation",
        url: "https://nextjs.org/docs",
        type: "documentation"
      },
      {
        title: "Course Repository",
        url: "https://github.com/example/nextjs-course",
        type: "github"
      }
    ],
    sections: [
      {
        title: "Introduction to Next.js",
        description: "Learn the basics of Next.js and its core features",
        duration: "30 minutes",
        content: "# Introduction to Next.js\n\nNext.js is a powerful React framework that enables you to build production-ready applications with built-in features like server-side rendering and static site generation...",
        isCompleted: false
      },
      {
        title: "Setting Up Your Development Environment",
        description: "Configure your development environment for Next.js development",
        duration: "45 minutes",
        content: "# Setting Up Your Development Environment\n\nIn this section, we'll walk through the process of setting up a new Next.js project with TypeScript and Tailwind CSS...",
        isCompleted: false
      },
      {
        title: "Building Your First Next.js Application",
        description: "Create a simple but functional Next.js application from scratch",
        duration: "1.5 hours",
        content: "# Building Your First Next.js Application\n\nNow that we have our environment set up, let's create our first Next.js application. We'll cover the following topics:\n\n- Creating pages and routes\n- Working with components\n- Styling with Tailwind CSS\n- Handling user interactions",
        isCompleted: false
      }
    ]
  },
  {
    id: 5,
    title: "Python for Data Science",
    description: "Master data analysis, visualization, and machine learning using Python's powerful libraries.",
    category: "Data Science",
    difficulty: "beginner",
    duration: "6 hours",
    rating: 4.9,
    students: 2100,
    image: "/images/blog/blog-2.jpg",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib"],
    featured: true,
    chapters: 15,
    slug: "python-for-data-science",
    author: {
      name: "Michael Chen",
      image: "/authors/michael.jpg",
      role: "Data Science Lead"
    },
    date: "2024-03-19",
    publishedAt: "2024-03-19T09:00:00Z",
    prerequisites: [
      "Basic Python knowledge",
      "Understanding of basic mathematics",
      "Python environment setup"
    ],
    objectives: [
      "Master Python data science libraries",
      "Perform data analysis and visualization",
      "Build machine learning models",
      "Work with real-world datasets"
    ],
    resources: [
      {
        title: "Python Data Science Handbook",
        url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
        type: "documentation"
      },
      {
        title: "Course Materials",
        url: "https://github.com/example/python-data-science",
        type: "github"
      }
    ],
    sections: [
      {
        title: "Python Fundamentals for Data Science",
        description: "Learn essential Python concepts for data analysis",
        duration: "1 hour",
        content: "# Python Fundamentals for Data Science\n\nIn this section, we'll cover the essential Python concepts that are particularly relevant for data science work...",
        isCompleted: false
      },
      {
        title: "Working with Pandas",
        description: "Master data manipulation with Pandas library",
        duration: "2 hours",
        content: "# Working with Pandas\n\nPandas is the most popular library for data manipulation in Python. We'll learn how to:\n\n- Load and clean data\n- Perform data transformations\n- Handle missing values\n- Analyze datasets",
        isCompleted: false
      },
      {
        title: "Data Visualization with Matplotlib",
        description: "Create insightful visualizations of your data",
        duration: "1.5 hours",
        content: "# Data Visualization with Matplotlib\n\nLearn how to create various types of plots and customize them to effectively communicate your data insights...",
        isCompleted: false
      }
    ]
  },
  {
    id: 6,
    title: "Flutter Mobile App Development",
    description: "Create beautiful cross-platform mobile applications with Flutter and Dart programming.",
    category: "Mobile",
    difficulty: "intermediate",
    duration: "5 hours",
    rating: 4.7,
    students: 980,
    image: "/images/blog/blog-3.jpg",
    tags: ["Flutter", "Dart", "Mobile", "UI/UX"],
    featured: false,
    chapters: 10,
    slug: "flutter-mobile-app-development",
    author: {
      name: "Emily Rodriguez",
      image: "/authors/emily.jpg",
      role: "Mobile Development Lead"
    },
    date: "2024-03-18",
    sections: [
      {
        title: "Getting Started with Flutter",
        description: "Set up your Flutter development environment"
      },
      {
        title: "Flutter Widgets and UI Components",
        description: "Learn about Flutter's widget system and UI building blocks"
      },
      {
        title: "State Management in Flutter",
        description: "Master different state management approaches in Flutter"
      }
    ]
  },
  {
    id: 7,
    title: "DevOps with Docker & Kubernetes",
    description: "Learn container orchestration and deployment strategies using Docker and Kubernetes.",
    category: "DevOps",
    difficulty: "advanced",
    rating: 4.9,
    duration: "8 hours",
    students: 750,
    image: "/images/blog/blog-1.jpg",
    tags: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    featured: true,
    chapters: 18,
    slug: "devops-with-docker-and-kubernetes",
    author: {
      name: "David Kim",
      image: "/authors/david.jpg",
      role: "DevOps Engineer"
    },
    date: "2024-03-17",
    sections: [
      {
        title: "Docker Fundamentals",
        description: "Learn the basics of containerization with Docker"
      },
      {
        title: "Kubernetes Architecture",
        description: "Understand Kubernetes components and architecture"
      },
      {
        title: "Deploying Applications on Kubernetes",
        description: "Master deployment strategies and scaling in Kubernetes"
      }
    ]
  },
  {
    id: 8,
    title: "JavaScript Algorithms & Data Structures",
    description: "Master common algorithms and data structures with JavaScript implementations.",
    category: "JavaScript",
    difficulty: "advanced",
    duration: "7 hours",
    rating: 4.8,
    students: 1500,
    image: "/images/blog/blog-2.jpg",
    tags: ["JavaScript", "Algorithms", "Data Structures"],
    featured: false,
    chapters: 16,
    slug: "javascript-algorithms-and-data-structures",
    author: {
      name: "Alex Thompson",
      image: "/authors/alex.jpg",
      role: "Software Engineer"
    },
    date: "2024-03-16",
    sections: [
      {
        title: "Basic Data Structures",
        description: "Learn about arrays, linked lists, and hash tables"
      },
      {
        title: "Sorting Algorithms",
        description: "Implement and understand various sorting algorithms"
      },
      {
        title: "Advanced Data Structures",
        description: "Master trees, graphs, and advanced data structures"
      }
    ]
  },
  {
    id: 9,
    title: "Python Automation Scripts",
    description: "Automate repetitive tasks and boost productivity with Python scripting.",
    category: "Python",
    difficulty: "beginner",
    duration: "3 hours",
    rating: 4.6,
    students: 890,
    image: "/images/blog/blog-3.jpg",
    tags: ["Python", "Automation", "Scripting"],
    featured: false,
    chapters: 8,
    slug: "python-automation-scripts",
    author: {
      name: "Lisa Wang",
      image: "/authors/lisa.jpg",
      role: "Python Developer"
    },
    date: "2024-03-15",
    sections: [
      {
        title: "Python Scripting Basics",
        description: "Learn the fundamentals of Python scripting"
      },
      {
        title: "File Operations and Data Processing",
        description: "Master file handling and data manipulation"
      },
      {
        title: "Task Automation Techniques",
        description: "Implement various automation scenarios"
      }
    ]
  }
]; 