"use client";

import { motion } from "framer-motion";

export function HeroCodeSnippet() {
  const codeSnippet = `
// Learn Next.js with our step-by-step tutorials
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">{count}</h2>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md"
      >
        Increment
      </button>
    </div>
  );
}`;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-lg shadow-2xl"
    >
      {/* Editor UI */}
      <div className="absolute top-0 inset-x-0 h-10 flex items-center px-4 bg-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-sm text-gray-300">Counter.jsx</div>
      </div>

      {/* Code content */}
      <pre className="pt-12 pb-4 px-4 bg-gray-800 text-gray-200 overflow-auto text-sm sm:text-base font-mono">
        <motion.code
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {codeSnippet}
        </motion.code>
      </pre>

      {/* Typing cursor animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute bottom-8 right-8 w-2 h-4 bg-white"
      />
    </motion.div>
  );
} 