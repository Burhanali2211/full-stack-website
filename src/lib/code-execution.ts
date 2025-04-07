import { ExecutionResult } from "@/types/playground";
import { SupportedLanguage } from "@/types/ide";
import type { PyodideInterface } from "pyodide";

declare global {
  interface Window {
    loadPyodide: () => Promise<PyodideInterface>;
  }
}

let pyodide: PyodideInterface | null = null;

async function initializePyodide() {
  if (!pyodide) {
    // Load pyodide script dynamically
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
    document.head.appendChild(script);

    // Wait for script to load
    await new Promise((resolve) => {
      script.onload = resolve;
    });

    // Initialize pyodide
    pyodide = await window.loadPyodide();
  }
  return pyodide;
}

async function executePython(code: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  try {
    const py = await initializePyodide();
    const output = await py.runPythonAsync(code);
    const executionTime = performance.now() - startTime;
    return {
      output: String(output),
      executionTime,
      status: "success",
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;
    return {
      output: "",
      error: error instanceof Error ? error.message : "An unknown error occurred",
      executionTime,
      status: "error",
    };
  }
}

async function executeJavaScript(code: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  try {
    const output: string[] = [];
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      output.push(args.map(arg => String(arg)).join(" "));
    };

    const result = await eval(code);
    console.log = originalConsoleLog;

    const executionTime = performance.now() - startTime;
    return {
      status: "success",
      output: output.join("\n") + (result !== undefined ? `\n${result}` : ""),
      executionTime,
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;
    return {
      status: "error",
      output: "",
      error: error instanceof Error ? error.message : undefined,
      executionTime,
    };
  }
}

function executeHTML(code: string, previewRef: React.RefObject<HTMLIFrameElement>): Promise<ExecutionResult> {
  const startTime = performance.now();
  return new Promise((resolve) => {
    try {
      if (!previewRef.current) {
        throw new Error("Preview iframe not found");
      }

      const iframe = previewRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (!iframeDoc) {
        throw new Error("Cannot access iframe document");
      }

      iframeDoc.open();
      iframeDoc.write(code);
      iframeDoc.close();

      const executionTime = performance.now() - startTime;
      resolve({
        output: "HTML rendered in preview",
        executionTime,
        status: "success",
      });
    } catch (error) {
      const executionTime = performance.now() - startTime;
      resolve({
        output: "",
        error: error instanceof Error ? error.message : "An unknown error occurred",
        executionTime,
        status: "error",
      });
    }
  });
}

function executeCSS(code: string, previewRef: React.RefObject<HTMLIFrameElement>): Promise<ExecutionResult> {
  const startTime = performance.now();
  return new Promise((resolve) => {
    try {
      if (!previewRef.current) {
        throw new Error("Preview iframe not found");
      }

      const iframe = previewRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (!iframeDoc) {
        throw new Error("Cannot access iframe document");
      }

      // Create or update the style element
      let styleElement = iframeDoc.getElementById("dynamic-css");
      if (!styleElement) {
        styleElement = iframeDoc.createElement("style");
        styleElement.id = "dynamic-css";
        iframeDoc.head.appendChild(styleElement);
      }
      styleElement.textContent = code;

      const executionTime = performance.now() - startTime;
      resolve({
        output: "CSS applied in preview",
        executionTime,
        status: "success",
      });
    } catch (error) {
      const executionTime = performance.now() - startTime;
      resolve({
        output: "",
        error: error instanceof Error ? error.message : "An unknown error occurred",
        executionTime,
        status: "error",
      });
    }
  });
}

export async function executeCode(
  code: string,
  language: string,
  previewRef?: React.RefObject<HTMLIFrameElement>
): Promise<ExecutionResult> {
  try {
    switch (language) {
      case "html":
      case "css":
        if (!previewRef?.current) {
          throw new Error("Preview iframe not available");
        }
        updatePreview(previewRef.current, code, language);
        return { status: "success", output: "Preview updated" };

      case "javascript":
        // Execute JavaScript in a safe way
        const result = await executeJavaScript(code);
        return { status: "success", output: result };

      case "python":
        return executePython(code);
      case "cpp":
      case "plaintext":
        return Promise.resolve({
          status: "error",
          output: "",
          error: `Language ${language} is not supported in the playground yet.`,
        });
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  } catch (error) {
    return {
      status: "error",
      output: "",
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

function updatePreview(iframe: HTMLIFrameElement, code: string, language: string) {
  const doc = iframe.contentDocument;
  if (!doc) return;

  if (language === "html") {
    doc.documentElement.innerHTML = code;
  } else if (language === "css") {
    let style = doc.getElementById("injected-styles");
    if (!style) {
      style = doc.createElement("style");
      style.id = "injected-styles";
      doc.head.appendChild(style);
    }
    style.textContent = code;
  }
}

