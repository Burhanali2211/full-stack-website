"use client";

import TutorialLayout from "@/components/tutorial-layout";
import CodeBlock from "@/components/code-block";
import InteractiveEditor from "@/components/interactive-editor";
import { motion } from "framer-motion";
import Link from "next/link";

const createAppCode = `npx create-next-app@latest my-portfolio
cd my-portfolio`;

const installDepsCode = `npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu framer-motion`;

const navbarCode = `// components/navbar.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}`;

const projectCardCode = `// components/project-card.tsx
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProjectCard({ title, description, image, link }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
      <div className="aspect-video relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center text-primary hover:underline"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
}`;

const interactiveCode = `function App() {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Welcome to My Portfolio</h1>
      <p className="text-lg">I build amazing web experiences!</p>
      <button 
        className="mt-4 px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-50 transition-colors"
        onClick={() => alert('Thanks for visiting!')}
      >
        Say Hello
      </button>
    </div>
  );
}`;

export default function NextjsWebsiteTutorial() {
  return (
    <TutorialLayout
      title="Building a Modern Portfolio Website with Next.js"
      description="Create a stunning portfolio website using Next.js 14, Tailwind CSS, and Framer Motion. Learn modern web development practices and create an impressive online presence."
      difficulty="Intermediate"
      duration="4-5 hours"
      githubUrl="https://github.com/yourusername/nextjs-portfolio"
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="mb-6">
          A well-designed portfolio website is essential for showcasing your work and skills. 
          In this tutorial, we'll build a modern, responsive portfolio website using Next.js 14, 
          enhanced with smooth animations and a clean design. You'll learn about App Router, 
          server components, and modern styling techniques.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Try It Out</h2>
        <p className="mb-4">
          Let's start by creating a simple React component. Edit the code below and see the changes in real-time:
          <Link href="/playground" className="text-primary hover:underline ml-2">
            (or try our full-featured Code Playground)
          </Link>
        </p>
        <InteractiveEditor
          initialCode={interactiveCode}
          initialLanguage="javascript"
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Node.js 18.17 or later installed</li>
          <li>Basic understanding of React and TypeScript</li>
          <li>Familiarity with CSS and Tailwind</li>
          <li>Code editor (VS Code recommended)</li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Step 1: Project Setup</h2>
        <p className="mb-4">
          First, create a new Next.js project with TypeScript and Tailwind CSS:
        </p>
        <CodeBlock code={createAppCode} />
        <p className="mt-4 mb-4">
          Install additional dependencies for UI components and animations:
        </p>
        <CodeBlock code={installDepsCode} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Step 2: Creating the Navigation</h2>
        <p className="mb-4">
          Let's create a responsive navigation bar with smooth transitions:
        </p>
        <CodeBlock code={navbarCode} language="typescript" />
        <p className="mt-4">
          This navigation bar includes a sticky header with backdrop blur, smooth hover effects, 
          and mobile responsiveness. The container class ensures content stays within a reasonable width.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Step 3: Project Card Component</h2>
        <p className="mb-4">
          Create a reusable project card component for showcasing your work:
        </p>
        <CodeBlock code={projectCardCode} language="typescript" />
        <p className="mt-4">
          This component includes hover animations, image optimization using Next.js Image component, 
          and a clean, modern design. The group class enables us to create interactive hover effects 
          that affect child elements.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <p className="mb-4">
          To complete your portfolio website:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Add a hero section with Framer Motion animations</li>
          <li>Implement dark mode using next-themes</li>
          <li>Create a contact form with form validation</li>
          <li>Add a blog section using MDX</li>
          <li>Optimize for SEO using Next.js metadata</li>
        </ul>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10"
      >
        <h3 className="text-xl font-semibold mb-2">💡 Pro Tip</h3>
        <p>
          Use the Next.js App Router's nested layouts feature to create shared UI elements across pages. 
          This reduces code duplication and ensures a consistent user experience throughout your site.
        </p>
      </motion.div>
    </TutorialLayout>
  );
} 