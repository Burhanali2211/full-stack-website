"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BookOpen, TrendingUp, Sparkles } from "lucide-react";

interface BlogHeroProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function BlogHero({
  title = "Explore the Future of Tech & Learning",
  subtitle = "Dive into cutting-edge insights on programming, AI, and modern technology",
  className,
}: BlogHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Handle resize
    window.addEventListener("resize", setCanvasDimensions);
    setCanvasDimensions();

    // Particle system with reduced quantity for better performance
    const particles: Particle[] = [];
    const particleCount = 30;
    
    // Store canvas dimensions to avoid null checks
    const getCanvasWidth = () => canvas.offsetWidth;
    const getCanvasHeight = () => canvas.offsetHeight;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      
      constructor() {
        this.x = Math.random() * getCanvasWidth();
        this.y = Math.random() * getCanvasHeight();
        // Smaller particles for subtlety
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5; // Slower motion
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `hsla(${Math.random() * 60 + 210}, 90%, 75%, 1)`;
        this.opacity = Math.random() * 0.4 + 0.2; // More subtle opacity
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > getCanvasWidth() || this.x < 0) this.speedX *= -1;
        if (this.y > getCanvasHeight() || this.y < 0) this.speedY *= -1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Connection lines with reduced distance for cleaner look
    function drawLines() {
      if (!ctx) return;
      const maxDistance = 80;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${opacity * 0.2})`; // More subtle lines
            ctx.lineWidth = 0.3; // Thinner lines
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Update and draw particles
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      drawLines();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  // Text animation variants with more subtle movement
  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-slate-950 to-slate-900 w-full",
        className
      )}
    >
      {/* Background canvas for particle effect */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-80" 
      />
      
      {/* Gradient overlay - more subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
      
      <div className="max-w-screen-xl relative z-10 mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Floating icons - smaller and more subtle */}
          <div className="flex justify-center gap-5 mb-5">
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="bg-primary/10 backdrop-blur-sm p-2.5 rounded-full"
            >
              <BookOpen className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
            </motion.div>
            
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="bg-indigo-500/10 backdrop-blur-sm p-2.5 rounded-full"
            >
              <TrendingUp className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-indigo-400" />
            </motion.div>
            
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="bg-sky-500/10 backdrop-blur-sm p-2.5 rounded-full"
            >
              <Sparkles className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-sky-400" />
            </motion.div>
          </div>
          
          {/* Title - adjusted sizes for better hierarchy */}
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-primary to-indigo-300"
          >
            {title}
          </motion.h1>
          
          {/* Subtitle - cleaner, more readable */}
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-gray-300/90 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </div>
  );
} 