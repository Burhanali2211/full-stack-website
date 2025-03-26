"use client";

import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';

interface CodePlaygroundProps {
  language: 'python' | 'javascript' | 'html';
  initialCode?: string;
}

export default function CodePlayground({ language, initialCode }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState('');
  const mode = language === 'python' ? python() : language === 'javascript' ? javascript() : html();

  const handleRun = async () => {
    try {
      const res = await fetch('/api/run-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const { output } = await res.json();
      setOutput(output || 'No output');
    } catch (error) {
      setOutput('Error running code');
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
      <CodeMirror
        value={code}
        height="200px"
        extensions={[mode]}
        theme="dark"
        onChange={(value: string) => setCode(value)}
        className="w-full"
      />
      <button
        onClick={handleRun}
        className="btn btn-primary mt-2 hover:scale-105 transition-transform"
      >
        Run
      </button>
      {output && (
        <pre className="text-green-600 dark:text-green-400 p-2 bg-gray-100 dark:bg-gray-800 rounded mt-2">
          {output}
        </pre>
      )}
    </div>
  );
} 