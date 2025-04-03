"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Terminal, Code, ArrowRight } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
  runnable?: boolean;
  onRun?: () => void;
}

interface LineProps {
  style?: React.CSSProperties;
  className?: string;
}

export const CodeSnippet = ({
  code,
  language = "javascript",
  fileName = "example.js",
  showLineNumbers = true,
  highlightLines = [],
  className,
  runnable = false,
  onRun,
}: CodeSnippetProps) => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const { theme, resolvedTheme } = useTheme();
  
  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
    setLineCount(code.trim().split('\n').length);
  }, [code]);
  
  // Determine if dark mode is active
  const isDark = mounted ? (theme === "dark" || resolvedTheme === "dark") : false;

  // Simulating typing effect when runnable is clicked but no onRun function is provided
  const simulateTyping = () => {
    if (onRun) return;
    
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine file icon and language display name
  const getLanguageInfo = () => {
    const langMap: Record<string, { icon: React.ReactNode; display: string }> = {
      javascript: { icon: <Code className="h-4 w-4" />, display: "JavaScript" },
      jsx: { icon: <Code className="h-4 w-4" />, display: "JSX" },
      typescript: { icon: <Code className="h-4 w-4" />, display: "TypeScript" },
      tsx: { icon: <Code className="h-4 w-4" />, display: "TSX" },
      bash: { icon: <Terminal className="h-4 w-4" />, display: "Bash" },
      html: { icon: <Code className="h-4 w-4" />, display: "HTML" },
      css: { icon: <Code className="h-4 w-4" />, display: "CSS" },
    };

    return langMap[language] || { icon: <Code className="h-4 w-4" />, display: language };
  };

  const { icon, display } = getLanguageInfo();

  // Return a simpler initial UI until client-side hydration is complete
  if (!mounted) {
    return (
      <div className={cn(
        "relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md",
        className
      )}>
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
            </div>
            <div className="flex items-center ml-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <span className="ml-1.5">{fileName}</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-auto max-h-[400px] p-4 bg-slate-50 dark:bg-slate-900 font-mono text-sm">
            <pre>{code}</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md code-snippet-card",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Terminal blinking cursor animation in the background */}
      {isTyping && (
        <motion.div 
          className="absolute inset-0 z-0 bg-slate-900/5 dark:bg-slate-100/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.05, 0, 0.05, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}
      
      {/* Code header with filename and controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <motion.span 
              className="h-3 w-3 rounded-full bg-red-500"
              whileHover={{ scale: 1.2 }}
            />
            <motion.span 
              className="h-3 w-3 rounded-full bg-yellow-500"
              whileHover={{ scale: 1.2 }}
            />
            <motion.span 
              className="h-3 w-3 rounded-full bg-green-500"
              whileHover={{ scale: 1.2 }}
            />
          </div>
          <div className="flex items-center ml-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
            {icon}
            <span className="ml-1.5">{fileName}</span>
            <span className="ml-2 px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-[10px] uppercase tracking-wider font-semibold">
              {display}
            </span>
          </div>
        </div>
        
        <AnimatePresence>
          {(isHovered || copied) && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <motion.button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Copy code"
              >
                {copied ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </motion.div>
                ) : (
                  <Copy className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                )}
              </motion.button>
              
              {runnable && (
                <motion.button
                  onClick={onRun || simulateTyping}
                  className="ml-2 flex items-center px-2 py-1 text-xs font-medium rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800/60 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Run code"
                >
                  Run
                  <motion.div
                    animate={isTyping ? { x: [0, 3, 0] } : {}}
                    transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
                  >
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </motion.div>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Code content with syntax highlighting */}
      <div className="relative group">
        <div className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          <SyntaxHighlighter
            language={language}
            style={isDark ? oneDark : oneLight}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            lineProps={(lineNumber: number): LineProps => ({
              style: {
                display: "block",
                backgroundColor: highlightLines.includes(lineNumber)
                  ? isDark
                    ? "rgba(99, 102, 241, 0.1)"
                    : "rgba(99, 102, 241, 0.08)"
                  : undefined,
                borderLeft: highlightLines.includes(lineNumber)
                  ? "3px solid rgb(99, 102, 241)"
                  : undefined,
                paddingLeft: highlightLines.includes(lineNumber) ? "1.5rem" : undefined,
              },
              className: highlightLines.includes(lineNumber) ? "code-token-highlight" : "",
            })}
            customStyle={{
              margin: 0,
              padding: "1rem",
              borderRadius: 0,
              fontSize: "0.9rem",
              backgroundColor: isDark ? "#1e293b" : "#f8fafc",
            }}
            codeTagProps={{
              style: {
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "0.9rem",
              },
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>

        {/* Gradient overlay for scrollable content */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent pointer-events-none opacity-0 group-hover:opacity-0 transition-opacity"></div>
      </div>
      
      {/* Visual indicator for cursor position on hover */}
      {isHovered && (
        <motion.div 
          className="absolute bottom-2 right-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
        >
          {lineCount} lines
        </motion.div>
      )}
    </motion.div>
  );
}; 