"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Book, Code, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { TechStack } from "@/components/ui/tech-stack";
import { Stats } from "@/components/ui/stats";
import Footer from "@/components/footer";

// Define types for better type safety
interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
}

interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

// Static data
const featuredProjects: FeaturedProject[] = [
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
];

const features: Feature[] = [
  {
    icon: <Book className="h-8 w-8 text-primary" />,
    title: "Structured Learning Path",
    description: "Follow our carefully designed curriculum that takes you from basics to advanced concepts systematically."
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Hands-on Experience",
    description: "Build real-world projects that you can add to your portfolio while learning practical skills."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Community Support",
    description: "Join our active community of developers to get help, share knowledge, and grow together."
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "Tech Corp",
    image: "/testimonials/sarah.svg",
    content: "This platform transformed my learning journey. The project-based approach helped me land my dream job!"
  },
  {
    name: "Michael Chen",
    role: "Full Stack Developer",
    company: "StartUp Inc",
    image: "/testimonials/michael.svg",
    content: "The structured learning path and hands-on projects gave me the confidence to build complex applications."
  },
  {
    name: "Emily Rodriguez",
    role: "Software Engineer",
    company: "Innovation Labs",
    image: "/testimonials/emily.svg",
    content: "The community support is amazing. I always got help when stuck, and now I help others grow!"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Particles className="absolute inset-0" />
        </div>
        <div className="container relative z-10 mx-auto flex flex-col items-center justify-center gap-8 text-center px-4">
          <motion.h1 
            className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Learn to Code with
            <br />
            <span className="text-primary">Next.js</span>
          </motion.h1>
          <motion.p 
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join our platform to learn modern web development through hands-on
            projects. Master the latest technologies and build real-world
            applications.
          </motion.p>
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/projects" className="gap-2 inline-flex items-center">
                Start Learning <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
          <div className="relative h-[200px] w-full max-w-[600px] mt-8">
            <TechStack />
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-gradient-to-b from-background to-background/95">
        <div className="container px-4">
          <Stats />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="w-full py-16 bg-gradient-to-b from-background/95 to-background/90">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <motion.h2 
              className="mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Start your journey with these carefully curated projects
            </motion.p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="w-full project-card"
              >
                <Link href={project.link}>
                  <div className="group relative rounded-lg border p-6 hover:border-primary/50 transition-colors bg-card shadow-sm">
                    <div className="mb-4">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{project.duration}</span>
                      <span className={
                        project.difficulty === "Beginner" ? "text-green-500" :
                        project.difficulty === "Intermediate" ? "text-yellow-500" :
                        "text-red-500"
                      }>
                        {project.difficulty}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button variant="outline" asChild>
                <Link href="/projects" className="gap-2 inline-flex items-center">
                  View All Projects <ArrowRight size={18} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-gradient-to-b from-background/90 to-background/95">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <motion.h2 
              className="mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose Us?
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our platform offers a unique learning experience that combines structured learning,
              hands-on practice, and community support.
            </motion.p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative p-6 rounded-lg bg-card hover:bg-card/80 transition-colors shadow-sm"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 bg-gradient-to-b from-background/95 to-background">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <motion.h2 
              className="mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Success Stories
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hear from our community members and how they transformed their careers
            </motion.p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative p-6 rounded-lg bg-card border hover:shadow-md transition-all"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-16 bg-primary/5">
        <div className="container px-4">
          <motion.div 
            className="rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 p-8 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers learning and building with us. Start your journey today with hands-on projects and expert guidance.
            </p>
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/auth/signup" className="gap-2 inline-flex items-center">
                Get Started <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
