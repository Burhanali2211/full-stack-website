import TutorialDetail from "@/components/tutorials/TutorialDetail";

// Create mock tutorial data
const mockTutorial = {
  id: "react-fundamentals",
  title: "Mastering React Fundamentals",
  description: "Get started with React and learn the core concepts. This comprehensive tutorial takes you from complete beginner to confident React developer. You'll learn how to build modern, interactive user interfaces with the most popular front-end library in the world.",
  category: "React",
  level: "beginner" as const,
  duration: "4h 30m",
  author: {
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    title: "Senior React Developer",
    bio: "Sarah is a seasoned React developer with 8+ years of experience building large-scale applications. She loves teaching and has helped hundreds of developers master React."
  },
  tags: ["React", "JavaScript", "Frontend", "Hooks", "JSX", "Components"],
  image: "/images/tutorials/react.svg",
  progress: 35,
  rating: 4.8,
  likes: 1250,
  comments: 328,
  popularity: 98,
  videoId: "w7ejDZ8SWv8", // Sample YouTube video ID
  sections: [
    {
      title: "Introduction to React",
      lessons: [
        {
          title: "What is React and why should you learn it?",
          duration: "10 min",
          isCompleted: true
        },
        {
          title: "Setting up your development environment",
          duration: "15 min",
          isCompleted: true
        },
        {
          title: "Creating your first React application",
          duration: "20 min",
          isCompleted: true
        }
      ]
    },
    {
      title: "React Components",
      lessons: [
        {
          title: "Understanding components and JSX",
          duration: "25 min",
          isCompleted: true
        },
        {
          title: "Props and component communication",
          duration: "30 min",
          isCompleted: false
        },
        {
          title: "State and lifecycle methods",
          duration: "35 min",
          isCompleted: false
        }
      ]
    },
    {
      title: "Hooks and Modern React",
      lessons: [
        {
          title: "Introduction to useState and useEffect",
          duration: "25 min",
          isCompleted: false
        },
        {
          title: "Custom hooks and advanced patterns",
          duration: "30 min",
          isCompleted: false
        },
        {
          title: "Performance optimization with useMemo and useCallback",
          duration: "20 min",
          isCompleted: false
        }
      ]
    },
    {
      title: "Building a Complete Project",
      lessons: [
        {
          title: "Project setup and planning",
          duration: "15 min",
          isCompleted: false
        },
        {
          title: "Implementing key features",
          duration: "45 min",
          isCompleted: false
        },
        {
          title: "Testing and deployment",
          duration: "30 min",
          isCompleted: false
        }
      ]
    }
  ]
};

export default function TutorialPage({ params }: { params: { id: string } }) {
  return (
    <main className="pt-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <TutorialDetail tutorial={mockTutorial} />
    </main>
  );
} 