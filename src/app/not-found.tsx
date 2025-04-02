"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Terminal, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function NotFound() {
  const [count, setCount] = useState(10);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  
  // Generate random error code
  useEffect(() => {
    const hexChars = "0123456789ABCDEF";
    let code = "0x";
    for (let i = 0; i < 8; i++) {
      code += hexChars[Math.floor(Math.random() * 16)];
    }
    setErrorCode(code);
    
    // Terminal animation effect
    const messages = [
      "> Initializing system diagnostics...",
      "> ERROR: Page not found",
      `> Error code: ${code}`,
      "> Running recovery protocol...",
      "> Checking system paths...",
      "> Path validation failed",
      "> Generating navigation options...",
      "> System ready",
    ];
    
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < messages.length) {
        setTerminalLines(prev => [...prev, messages[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  // Countdown timer
  useEffect((): (() => void) => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
    // Redirect to home page when countdown reaches zero
    window.location.href = '/';
    return () => {}; // Return empty cleanup function for else case
  }, [count]);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Tech-inspired background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5"></div>
        
        {/* Binary data streams */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-[10px] font-mono text-primary/10 whitespace-nowrap"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.1,
                transform: `rotate(${Math.random() * 90 - 45}deg)`,
                animation: `floatBinary ${10 + Math.random() * 20}s linear infinite`,
              }}
            >
              {Array.from({ length: 30 }).map(() => Math.round(Math.random())).join('')}
            </div>
          ))}
        </div>
        
        {/* Circular gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08)_0,rgba(var(--primary-rgb),0)_60%)]"></div>
        
        {/* Circuit lines */}
        <div className="absolute h-[1px] left-0 right-0 top-1/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute h-[1px] left-0 right-0 bottom-1/3 bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
        <div className="absolute w-[1px] top-0 bottom-0 left-1/3 bg-gradient-to-b from-transparent via-primary/15 to-transparent"></div>
        <div className="absolute w-[1px] top-0 bottom-0 right-1/3 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
      </div>
      
      <div className="container max-w-4xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center"
        >
          {/* Left side - Error code and terminal */}
          <div className="w-full md:w-1/2">
            <motion.div 
              variants={item}
              className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 px-3 py-1.5 rounded-full text-primary text-xs font-mono mb-6 w-fit"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>ERROR_404::PAGE_NOT_FOUND</span>
            </motion.div>
            
            <motion.h1 
              variants={item}
              className="text-6xl font-bold font-tech mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-violet-500"
            >
              404
            </motion.h1>
            
            <motion.h2 
              variants={item}
              className="text-2xl font-bold font-tech mb-4"
            >
              Connection Terminated
              <span className="animate-blink font-tech text-primary">|</span>
            </motion.h2>
            
            <motion.p 
              variants={item}
              className="text-muted-foreground mb-8"
            >
              The requested URL has been disconnected from the main network. 
              System suggests returning to a known access point.
            </motion.p>
            
            <motion.div
              variants={item}
              className="space-y-4"
            >
              <div className="flex gap-3">
                <Link href="/" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto group" size="lg">
                    <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Return to Home
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-primary/20 group"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Go Back
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Auto-redirect in {count} seconds...
              </p>
            </motion.div>
          </div>
          
          {/* Right side - Terminal visualization */}
          <motion.div
            variants={item}
            className="w-full md:w-1/2"
          >
            <div className="relative group">
              {/* Glow effect border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-blue-500/30 to-violet-500/30 rounded-lg opacity-30 group-hover:opacity-100 blur transition duration-300"></div>
              
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                {/* Terminal header */}
                <div className="bg-black/50 backdrop-blur-sm p-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    <span className="text-xs font-mono font-medium">system-recovery.exe</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                </div>
                
                {/* Terminal content */}
                <div className="bg-black/80 backdrop-blur-sm p-4 h-64 overflow-y-auto font-mono text-xs space-y-1">
                  <AnimatePresence>
                    {terminalLines.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={
                          typeof line === 'string'
                            ? line.includes("ERROR")
                              ? "text-red-400"
                              : line.includes("Error code")
                              ? "text-amber-400"
                              : "text-green-400"
                            : "text-green-400"
                        }
                      >
                        {line}
                        {index === terminalLines.length - 1 && (
                          <span className="animate-blink inline-block h-4 w-2 bg-green-400 ml-1"></span>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {/* Error code display */}
                <div className="bg-black/50 backdrop-blur-sm border-t border-white/10 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      MEMORY_ADDRESS:
                      <span className="text-primary ml-2">{errorCode}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-3.5 w-3.5 text-primary animate-spin-slow" />
                      <span className="text-xs font-mono text-muted-foreground">
                        Diagnosing...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Circuit board footer */}
        <motion.div 
          variants={item}
          className="mt-10 mx-auto max-w-3xl"
        >
          <div className="h-[2px] w-full bg-primary/10 rounded-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary/80 via-blue-500/80 to-violet-500/80"
              initial={{ width: "0%" }}
              animate={{ width: `${(10 - count) * 10}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1.2s infinite;
        }
        
        @keyframes floatBinary {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 