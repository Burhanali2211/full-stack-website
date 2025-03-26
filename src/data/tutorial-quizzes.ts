interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TutorialQuiz {
  tutorialId: string;
  title: string;
  description: string;
  questions: Question[];
}

export const tutorialQuizzes: TutorialQuiz[] = [
  {
    tutorialId: 'modern-react-development-with-nextjs',
    title: 'Next.js Fundamentals Quiz',
    description: 'Test your understanding of Next.js core concepts and features.',
    questions: [
      {
        question: 'What is the main advantage of Server Components in Next.js 13+?',
        options: [
          'They allow for client-side state management',
          'They reduce the JavaScript bundle size by running on the server',
          'They enable WebSocket connections',
          'They provide better SEO by default'
        ],
        correctAnswer: 1,
        explanation: 'Server Components run on the server and send only the HTML to the client, reducing the JavaScript bundle size and improving initial page load performance.'
      },
      {
        question: 'Which directive is used to explicitly mark a component as a Client Component in Next.js?',
        options: [
          "'use client'",
          "'client-side'",
          "'enable-client'",
          "'client-component'"
        ],
        correctAnswer: 0,
        explanation: "The 'use client' directive must be added at the top of the file to mark a component as a Client Component, enabling client-side interactivity."
      },
      {
        question: 'What is the correct way to handle dynamic routes in Next.js 13+ app directory?',
        options: [
          'Create a [param].js file in the pages directory',
          'Create a [param] folder with a page.tsx file inside the app directory',
          'Use the useRouter hook with dynamic routes',
          'Add a routes.config.js file'
        ],
        correctAnswer: 1,
        explanation: 'In the app directory, dynamic routes are created by making a folder with square brackets (e.g., [param]) and placing a page.tsx file inside it.'
      },
      {
        question: 'Which of the following is true about data fetching in Next.js Server Components?',
        options: [
          'They can only fetch data using useEffect',
          'They require special data fetching hooks',
          'They can fetch data directly in the component without hooks',
          'They must use Redux for data fetching'
        ],
        correctAnswer: 2,
        explanation: 'Server Components can fetch data directly in the component without hooks or client-side state management, making data fetching more straightforward.'
      },
      {
        question: 'What is the purpose of the loading.tsx file in Next.js 13+ app directory?',
        options: [
          'To show a loading state while the page JavaScript is downloading',
          'To define loading screens for API calls',
          'To automatically show a loading UI while route segments load',
          'To configure loading preferences'
        ],
        correctAnswer: 2,
        explanation: 'The loading.tsx file creates an instant loading state that is shown while a route segment loads, providing a better user experience with Suspense-based loading.'
      }
    ]
  }
]; 