"use client";

import { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { OutputDisplay } from './output-display';
import { EditorToolbar } from './editor-toolbar';
import { CODE_SNIPPETS } from './code-snippets';
import {
  InteractiveEditorProps,
  OutputLine,
  FeedbackMessage,
  SupportedLanguage,
} from './types';

export function InteractiveEditor({
  initialCode,
  initialLanguage = 'javascript',
  height = '300px',
  storageKey = 'interactive-editor-state',
  onChange,
}: InteractiveEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState<SupportedLanguage>(
    initialLanguage as SupportedLanguage
  );
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
  const { theme } = useTheme();

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const { code: savedCode, language: savedLanguage } = JSON.parse(savedState);
        setCode(savedCode);
        setLanguage(savedLanguage as SupportedLanguage);
      } catch (error) {
        console.error('Error loading saved editor state:', error);
      }
    }
  }, [storageKey]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ code, language }));
  }, [code, language, storageKey]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput([]);

    try {
      switch (language) {
        case 'python':
          // Extract print statements
          const printStatements = code.match(/print\((.*?)\)/g) || [];
          setOutput(
            printStatements.map((stmt) => {
              try {
                const content = stmt.slice(6, -1);
                return { content, type: 'output' as const };
              } catch (error) {
                return {
                  content: 'Error in print statement',
                  type: 'error' as const,
                };
              }
            })
          );
          break;

        case 'javascript':
        case 'typescript':
          // Capture console.log outputs
          const consoleLogs = code.match(/console\.log\((.*?)\)/g) || [];
          setOutput(
            consoleLogs.map((log) => {
              try {
                const content = log.slice(12, -1);
                return { content, type: 'output' as const };
              } catch (error) {
                return {
                  content: 'Error in console.log statement',
                  type: 'error' as const,
                };
              }
            })
          );
          break;

        default:
          setOutput([
            {
              content: 'Output preview not supported for this language',
              type: 'error',
            },
          ]);
      }
    } catch (error) {
      setOutput([{ content: 'Error: ' + (error as Error).message, type: 'error' }]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput([]);
    localStorage.removeItem(storageKey);
  };

  const handleLoadSnippet = () => {
    const snippet = CODE_SNIPPETS[language];
    if (snippet) {
      setCode(snippet);
      setOutput([]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => showFeedback('Code copied to clipboard!'))
      .catch(() => showFeedback('Failed to copy code', 'error'));
  };

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ text, type });
    setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <EditorToolbar
        language={language}
        onLanguageChange={setLanguage}
        onRun={handleRun}
        onReset={handleReset}
        onLoadSnippet={handleLoadSnippet}
        onCopy={handleCopy}
        isRunning={isRunning}
        showFeedback={showFeedback}
      />

      <div style={{ height }}>
        <Editor
          value={code}
          language={language}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          onChange={(value) => {
            setCode(value || '');
            onChange?.(value || '');
          }}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            padding: { top: 8 },
          }}
        />
      </div>

      <OutputDisplay output={output} language={language} />

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
              feedback.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-green-500 text-white'
            }`}
          >
            {feedback.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 