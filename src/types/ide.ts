export type SupportedLanguage = "javascript" | "typescript" | "python" | "html" | "css" | "cpp" | "plaintext";

export type FileType = 'file' | 'directory';

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  content?: string;
  language?: SupportedLanguage;
  children?: FileNode[];
  parentId?: string;
}

export interface Tab {
  id: string;
  fileId: string;
  name: string;
  language: SupportedLanguage;
  content: string;
  isActive: boolean;
  isDirty: boolean;
}

export interface IDESettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  autoComplete: boolean;
  formatOnSave: boolean;
  livePreview: boolean;
  keyboardShortcuts: Record<string, string>;
  panelLayout: {
    explorer: number;
    editor: number;
    preview: number;
  };
}

export interface ExecutionResult {
  status: "success" | "error";
  output: string;
  error?: string;
}

export interface LanguageConfig {
  name: string;
  value: SupportedLanguage;
  icon: string;
  defaultCode: string;
}

export interface KeyboardShortcut {
  key: string;
  command: string;
  description: string;
  scope: 'global' | 'editor' | 'terminal';
}

export interface PreviewConfig {
  url?: string;
  isLoading: boolean;
  error?: string;
  refreshInterval?: number;
  customHead?: string;
}

export interface FileTreeItem {
  id: string;
  name: string;
  type: "file" | "directory";
  language?: SupportedLanguage;
  content?: string;
  children?: FileTreeItem[];
}

export interface EditorState {
  files: FileTreeItem[];
  selectedFileId?: string;
  tabs: Tab[];
  isRunning: boolean;
  output: string;
  error?: string;
} 