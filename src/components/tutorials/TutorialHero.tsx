"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Code, BookOpen, Users, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A visually stunning and modern hero component for the tutorials page.
 */
const TutorialHero: FC = () => {
  return (
    <div className="relative overflow-hidden py-24 md:py-32 mb-16 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Enhanced Aurora-like effect */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-radial from-purple-600/40 via-transparent to-transparent blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-radial from-indigo-600/40 via-transparent to-transparent blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-600/20 via-transparent to-transparent blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <div className="inline-flex items-center justify-center py-1 px-4 rounded-full bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-blue-600/20 text-indigo-300 border border-indigo-500/30 shadow-md">
              <Sparkles className="mr-2 h-4 w-4 text-purple-400" />
              <span className="font-medium text-sm tracking-wide">LEVEL UP YOUR SKILLS</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[24px] sm:text-[36px] md:text-[48px] font-bold tracking-[2px] mb-6 text-white leading-tight uppercase"
            style={{
              fontFamily: "'Orbitron', 'Rajdhani', 'Audiowide', sans-serif",
              textShadow: "0 0 15px rgba(167, 139, 250, 0.5)",
            }}
          >
            UNLOCK YOUR POTENTIAL WITH INTERACTIVE TUTORIALS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[14px] sm:text-[16px] md:text-[18px] text-white max-w-3xl mx-auto mb-10"
            style={{
              fontFamily: "'Roboto Mono', monospace",
              textShadow: "0 0 10px rgba(167, 139, 250, 0.4)",
            }}
          >
            Dive into hands-on learning experiences designed to master cutting-edge technologies, from beginner steps to advanced patterns
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 sm:gap-6 justify-center"
          >
            {/* Redesigned Stat Cards */}
            <StatCard icon={BookOpen} value="150+" label="Tutorials" gradient="from-purple-500 to-indigo-500" />
            <StatCard icon={Users} value="25K+" label="Active Learners" gradient="from-indigo-500 to-blue-500" />
            <StatCard icon={TrendingUp} value="12" label="Learning Paths" gradient="from-blue-500 to-cyan-500" />
          </motion.div>
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