"use client";

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { OutputLine } from './types';

// Import languages
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('css', css);

interface OutputDisplayProps {
  output: OutputLine[];
  language: string;
}

export function OutputDisplay({ output, language }: OutputDisplayProps) {
  const { theme } = useTheme();

  const getOutputLanguage = (line: string): string => {
    try {
      JSON.parse(line);
      return 'json';
    } catch {
      return language === 'typescript' ? 'javascript' : language;
    }
  };

  if (output.length === 0) {
    return (
      <div className="text-muted-foreground text-sm p-4">
        Run the code to see output here
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2 p-4"
    >
      {output.map((line, index) => (
        <div
          key={index}
          className={`rounded-md ${
            line.type === 'error' ? 'bg-red-500/10' : 'bg-green-500/10'
          }`}
        >
          <SyntaxHighlighter
            language={getOutputLanguage(line.content)}
            style={theme === 'dark' ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              padding: '0.5rem',
              background: 'transparent',
            }}
          >
            {line.content}
          </SyntaxHighlighter>
        </div>
      ))}
    </motion.div>
  );
} 