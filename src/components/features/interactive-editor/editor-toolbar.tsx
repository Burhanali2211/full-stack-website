"use client";

import { Button } from '@/components/ui/button';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Copy, Code } from 'lucide-react';

interface EditorToolbarProps {
  language: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  onRun: () => void;
  onReset: () => void;
  onLoadSnippet: () => void;
  onCopy: () => void;
  isRunning: boolean;
  showFeedback: (message: string, type: 'success' | 'error') => void;
}

export function EditorToolbar({
  language,
  onLanguageChange,
  onRun,
  onReset,
  onLoadSnippet,
  onCopy,
  isRunning,
  showFeedback,
}: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-border/50">
      <div className="flex items-center space-x-2">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
          className="bg-background text-foreground border border-border/50 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          variant="outline"
          onClick={onLoadSnippet}
          className="gap-1"
        >
          <Code className="w-4 h-4" />
          Load Example
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onReset}
          className="gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCopy}
          className="gap-1"
        >
          <Copy className="w-4 h-4" />
          Copy
        </Button>
        <Button
          size="sm"
          onClick={onRun}
          disabled={isRunning}
          className="gap-1"
        >
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {/* Feedback message animation will be handled by the parent component */}
      </AnimatePresence>
    </div>
  );
} 