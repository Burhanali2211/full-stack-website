export type SupportedLanguage = "javascript" | "python" | "html" | "css";

export interface ExecutionResult {
  status: "success" | "error";
  output: string;
  error?: string;
  executionTime?: number;
} 