"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Code, BookOpen, Users, TrendingUp, Sparkles, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A visually stunning and modern hero component for the tutorials page.
 */
const TutorialHero: FC = () => {
  const stats = [
    {
      icon: BookOpen,
      label: "Tutorials",
      value: "100+",
      description: "Comprehensive tutorials",
    },
    {
      icon: Users,
      label: "Students",
      value: "50K+",
      description: "Active learners",
    },
    {
      icon: Trophy,
      label: "Projects",
      value: "200+",
      description: "Hands-on projects",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-8">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />
      
      <div className="relative">
        <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          <Sparkles className="mr-2 h-4 w-4" />
          Interactive Learning
        </div>

        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Master Programming Through Practice
        </h1>
        
        <p className="mt-4 max-w-[600px] text-muted-foreground">
          Learn programming with our comprehensive tutorials and hands-on projects. 
          Perfect for beginners and experienced developers alike.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
            >
              <div className="rounded-lg border bg-background p-2.5">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add the required font styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
};

// Helper component for Stat Cards
interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  gradient: string;
}

const StatCard: FC<StatCardProps> = ({ icon: Icon, value, label, gradient }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
      className={cn(
        "flex items-center space-x-3 p-4 rounded-xl bg-gray-900/60 backdrop-blur-md border border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-indigo-500/20",
        "hover:border-indigo-500/60" // Add subtle border highlight on hover
      )}
    >
      <div className={cn("p-2 rounded-full bg-gradient-to-br text-white", gradient)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-bold text-xl text-white">{value}</div>
        <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
};

export default TutorialHero; 