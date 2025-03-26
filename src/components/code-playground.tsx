"use client";

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Play, Copy, Check, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodePlaygroundProps {
  initialCode?: string;
  language?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function CodePlayground({
  initialCode = '',
  language = 'javascript',
  title = 'Code Playground',
  description = 'Try out the code and see the results in real-time.',
  className
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('code');

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      
      const data = await response.json();
      setOutput(data.output || 'No output');
      setActiveTab('output');
    } catch (error) {
      setOutput('Error running code. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <Card className={cn("overflow-hidden border-border/50", className)}>
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/50 dark:bg-card/40">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyCode}
            className="gap-2"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={handleRunCode}
            disabled={isRunning}
            className="gap-2"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Code
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="min-h-[400px]">
        <div className="border-b border-border/50">
          <TabsList className="bg-transparent p-0">
            <TabsTrigger
              value="code"
              className={cn(
                "rounded-none border-b-2 border-transparent px-4 py-2",
                activeTab === "code" && "border-primary"
              )}
            >
              Code Editor
            </TabsTrigger>
            <TabsTrigger
              value="output"
              className={cn(
                "rounded-none border-b-2 border-transparent px-4 py-2",
                activeTab === "output" && "border-primary"
              )}
            >
              Output
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="code" className="p-0 m-0">
          <div className="relative min-h-[400px] bg-muted/50 dark:bg-muted/20">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full min-h-[400px] p-4 font-mono text-sm bg-transparent resize-none focus:outline-none text-foreground"
              placeholder={`Write your ${language} code here...`}
              spellCheck="false"
            />
          </div>
        </TabsContent>

        <TabsContent value="output" className="p-0 m-0">
          <div className="min-h-[400px] bg-muted/50 dark:bg-muted/20 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Terminal className="w-4 h-4" />
              <span>Output:</span>
            </div>
            <pre className="font-mono text-sm whitespace-pre-wrap text-foreground">
              {output || 'Run the code to see the output here.'}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 