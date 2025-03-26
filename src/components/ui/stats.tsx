"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, BookOpen, Code, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: <Users className="h-6 w-6" />,
    value: "15,000+",
    label: "Students",
    description: "Active learners worldwide",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    value: "200+",
    label: "Tutorials",
    description: "In-depth learning materials",
  },
  {
    icon: <Code className="h-6 w-6" />,
    value: "100+",
    label: "Projects",
    description: "Hands-on coding exercises",
  },
  {
    icon: <Award className="h-6 w-6" />,
    value: "50+",
    label: "Certifications",
    description: "Industry-recognized awards",
  },
];

interface CounterProps {
  value: string;
  duration?: number;
}

function Counter({ value, duration = 2 }: CounterProps) {
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const hasPlus = value.includes("+");

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="tabular-nums"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: duration, ease: "easeOut" },
        }}
      >
        {numericValue}
        {hasPlus && "+"}
      </motion.span>
    </motion.span>
  );
}

export function Stats() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className={cn(
            "group relative p-6 rounded-xl glass-effect card-shadow hover:card-hover",
            "flex flex-col items-center text-center space-y-4"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
            <div className="relative z-10 p-3 rounded-full bg-primary/10 text-primary">
              {stat.icon}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              <Counter value={stat.value} />
            </div>
            <h3 className="text-lg font-semibold">{stat.label}</h3>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
} 