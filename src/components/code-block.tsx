"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden">
      <div className="absolute right-4 top-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-primary" />
          )}
        </motion.button>
      </div>
      <pre className="!mt-0 !mb-0 overflow-x-auto p-4 bg-muted/50 backdrop-blur supports-[backdrop-filter]:bg-muted/10">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/10" />
    </div>
  );
} 