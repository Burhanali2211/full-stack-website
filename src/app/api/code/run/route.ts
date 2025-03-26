import { NextResponse } from "next/server";

// Mock execution function for Python code
async function executePython(code: string): Promise<string> {
  // In a real implementation, this would use a sandboxed environment
  // For now, we'll simulate the output
  try {
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a mock output based on the code
    if (code.includes("FileConverter")) {
      if (code.includes("example.pdf") && code.includes("output.txt")) {
        return "Converting example.pdf to output.txt\nConversion successful!";
      }
      return "Class defined successfully. Try creating an instance and converting a file!";
    }
    
    return "Code executed successfully!";
  } catch (error) {
    throw new Error("Error executing Python code");
  }
}

// Mock execution function for JavaScript code
async function executeJavaScript(code: string): Promise<string> {
  try {
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would use a sandboxed environment
    // For now, we'll just return a mock output
    return "JavaScript code execution simulated successfully!";
  } catch (error) {
    throw new Error("Error executing JavaScript code");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, language } = body;

    if (!code) {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      );
    }

    let output: string;
    switch (language.toLowerCase()) {
      case "python":
        output = await executePython(code);
        break;
      case "javascript":
        output = await executeJavaScript(code);
        break;
      default:
        return NextResponse.json(
          { error: "Unsupported language" },
          { status: 400 }
        );
    }

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Code execution error:", error);
    return NextResponse.json(
      { error: "Failed to execute code" },
      { status: 500 }
    );
  }
} 