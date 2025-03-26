"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { FileTree } from "@/components/file-tree";
import { Preview } from "@/components/preview";
import { executeCode } from "@/lib/code-execution";
import { cn } from "@/lib/utils";
import { Play, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Editor } from "@monaco-editor/react";
import { IDEHeader } from "@/components/ide/header";
import type { ExecutionResult, SupportedLanguage, FileTreeItem, Tab, EditorState } from "@/types/ide";

export default function IDEPage() {
  const [state, setState] = useState<EditorState>({
    files: [],
    selectedFileId: null,
    tabs: [],
    isRunning: false,
    output: "",
  } as EditorState);

  const previewRef = useRef<HTMLIFrameElement>(null);

  const activeTab = state.tabs.find(tab => tab.isActive);

  const handleFileSelect = useCallback((fileId: string) => {
    // Check if the file is already open in a tab
    const existingTab = state.tabs.find(tab => tab.fileId === fileId);
    if (existingTab) {
      // Activate the existing tab
      setState(prev => ({
        ...prev,
        tabs: prev.tabs.map(tab => ({
          ...tab,
          isActive: tab.id === existingTab.id
        })),
        selectedFileId: fileId,
      }));
    } else {
      // Create a new tab for the file
      const file = state.files.find(f => f.id === fileId);
      if (file && file.type === "file" && file.language && file.content) {
        const newTab: Tab = {
          id: crypto.randomUUID(),
          fileId,
          name: file.name,
          language: file.language,
          content: file.content,
          isActive: true,
          isDirty: false
        };
        setState(prev => ({
          ...prev,
          tabs: prev.tabs.map(tab => ({
            ...tab,
            isActive: false
          })).concat(newTab),
          selectedFileId: fileId,
        }));
      }
    }
  }, [state.files, state.tabs]);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (!activeTab || !value) return;
    setState(prev => ({
      ...prev,
      tabs: prev.tabs.map(tab => 
        tab.id === activeTab.id 
          ? { ...tab, content: value, isDirty: true }
          : tab
      ),
    }));
  }, [activeTab]);

  const handleRunCode = useCallback(async () => {
    if (!activeTab) return;

    setState(prev => ({ ...prev, isRunning: true }));

    try {
      const result = await executeCode(
        activeTab.content,
        activeTab.language,
        ["html", "css"].includes(activeTab.language) ? previewRef : undefined
      );

      setState(prev => ({
        ...prev,
        isRunning: false,
        output: result.output,
        error: result.error,
      }));

      if (result.status === "error" && result.error) {
        toast({
          title: "Execution Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isRunning: false,
        error: error instanceof Error ? error.message : undefined,
      }));

      toast({
        title: "Execution Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  }, [activeTab]);

  const handleSaveFile = useCallback(() => {
    if (!activeTab) return;
    // TODO: Implement file saving logic
    setState(prev => ({
      ...prev,
      tabs: prev.tabs.map(tab => 
        tab.id === activeTab.id 
          ? { ...tab, isDirty: false }
          : tab
      ),
    }));
    toast({
      title: "File Saved",
      description: `${activeTab.name} has been saved successfully.`,
    });
  }, [activeTab]);

  useEffect(() => {
    // TODO: Load files from the backend
    setState(prev => ({
      ...prev,
      files: [
        {
          id: "1",
          name: "index.html",
          type: "file",
          language: "html",
          content: "<h1>Hello, World!</h1>",
        },
        {
          id: "2",
          name: "styles.css",
          type: "file",
          language: "css",
          content: "h1 { color: blue; }",
        },
        {
          id: "3",
          name: "script.js",
          type: "file",
          language: "javascript",
          content: 'console.log("Hello from JavaScript!");',
        },
      ],
    }));
  }, []);

  return (
    <>
      <IDEHeader />
      <div className="flex-1 container mx-auto p-4">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full border rounded-lg p-2">
              <FileTree
                files={state.files}
                selectedFileId={state.selectedFileId}
                onSelect={handleFileSelect}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="h-full flex flex-col border rounded-lg">
              <div className="flex items-center justify-between border-b p-2">
                <div className="flex gap-2">
                  {state.tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={cn(
                        "px-3 py-1 rounded-md text-sm",
                        tab.isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      )}
                      onClick={() => handleFileSelect(tab.fileId)}
                    >
                      {tab.name}
                      {tab.isDirty && "*"}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSaveFile}
                    disabled={!activeTab}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleRunCode}
                    disabled={!activeTab || state.isRunning}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                {activeTab ? (
                  <Editor
                    height="100%"
                    language={activeTab.language === "plaintext" ? undefined : activeTab.language}
                    value={activeTab.content}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Select a file to start editing
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30}>
            <div className="h-full flex flex-col border rounded-lg">
              {activeTab?.language === "html" || activeTab?.language === "css" ? (
                <Preview ref={previewRef} />
              ) : (
                <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-zinc-900 text-zinc-100 rounded-lg">
                  {state.output || "Run your code to see the output"}
                  {state.error && (
                    <div className="mt-2 text-red-400">{state.error}</div>
                  )}
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
} 