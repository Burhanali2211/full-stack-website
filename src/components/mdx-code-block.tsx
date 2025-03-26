"use client";

import React from "react";
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Edit2, Check, Code, X, Save } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MDXCodeBlockProps {
  children: string
  className?: string
  filename?: string
  live?: boolean
}

export default function MDXCodeBlock({ children, className, filename, live = false }: MDXCodeBlockProps) {
  const [code, setCode] = useState(children.trim())
  const [isEditing, setIsEditing] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  
  const language = className ? className.replace(/language-/, "") : "javascript"
  
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [isCopied])
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
  }
  
  const handleEdit = () => {
    setIsEditing(prev => !prev)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg overflow-hidden border border-border"
    >
      {filename && (
        <div className="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{filename}</span>
          </div>
          
          <div className="flex items-center gap-1">
            {live && (
              <button
                onClick={handleEdit}
                className="p-1 rounded-md hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isEditing ? "Stop editing" : "Edit code"}
              >
                {isEditing ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Edit2 className="w-4 h-4" />
                )}
              </button>
            )}
            
            <button
              onClick={handleCopy}
              className="p-1 rounded-md hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy code"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
      
      {isEditing ? (
        <div className="relative">
          <textarea
            value={code}
            onChange={handleChange}
            className="w-full p-4 bg-[#1E1E1E] text-[#D4D4D4] font-mono text-sm focus:outline-none resize-none border-none min-h-[200px]"
            spellCheck="false"
            style={{ 
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              lineHeight: 1.5,
              tabSize: 2
            }}
          />
        </div>
      ) : (
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: "14px",
              lineHeight: 1.5,
            }}
            lineNumberStyle={{
              color: "#6e7681",
              fontSize: "12px",
            }}
          >
            {code}
          </SyntaxHighlighter>
          
          {!filename && (
            <div className="absolute top-2 right-2 flex items-center gap-1">
              {live && (
                <button
                  onClick={handleEdit}
                  className="p-1 rounded-md bg-muted/80 hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isEditing ? "Stop editing" : "Edit code"}
                >
                  {isEditing ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Edit2 className="w-4 h-4" />
                  )}
                </button>
              )}
              
              <button
                onClick={handleCopy}
                className="p-1 rounded-md bg-muted/80 hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Copy code"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
} 