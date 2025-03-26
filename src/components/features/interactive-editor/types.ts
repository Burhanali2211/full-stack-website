export interface InteractiveEditorProps {
  initialCode: string;
  initialLanguage?: string;
  height?: string;
  storageKey?: string;
  onChange?: (value: string) => void;
}

export interface OutputLine {
  content: string;
  type: 'output' | 'error';
}

export interface FeedbackMessage {
  text: string;
  type: 'success' | 'error';
}

export const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['value']; 