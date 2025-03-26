import { SupportedLanguage, ExecutionResult } from "@/types/playground";
import { loadPyodide } from "pyodide";

let pyodide: any = null;

async function initializePyodide() {
  if (!pyodide) {
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    });
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
  language: SupportedLanguage,
  previewRef?: React.RefObject<HTMLIFrameElement>
): Promise<ExecutionResult> {
  try {
    switch (language) {
      case "javascript":
        return executeJavaScript(code);
      case "python":
        return executePython(code);
      case "html":
      case "css":
        return executeHtmlCss(code, language, previewRef);
      default:
        return {
          status: "error",
          output: "",
          error: `Language ${language} is not supported yet.`,
        };
    }
  } catch (error) {
    return {
      status: "error",
      output: "",
      error: error instanceof Error ? error.message : undefined,
    };
  }
}

async function executeHtmlCss(
  code: string,
  language: "html" | "css",
  previewRef?: React.RefObject<HTMLIFrameElement>
): ExecutionResult {
  if (!previewRef?.current) {
    return {
      status: "error",
      output: "",
      error: "Preview iframe is not available.",
    };
  }

  try {
    const iframe = previewRef.current;
    const doc = iframe.contentDocument;
    if (!doc) {
      return {
        status: "error",
        output: "",
        error: "Could not access preview document.",
      };
    }

    if (language === "html") {
      doc.documentElement.innerHTML = code;
    } else {
      const style = doc.createElement("style");
      style.textContent = code;
      doc.head.appendChild(style);
    }

    return {
      status: "success",
      output: "Preview updated successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      output: "",
      error: error instanceof Error ? error.message : undefined,
    };
  }
}

