import { NextResponse } from 'next/server';

// Whitelist of safe built-in functions and objects
const SAFE_GLOBALS = new Set([
  'Array',
  'Boolean',
  'Date',
  'Error',
  'JSON',
  'Math',
  'Number',
  'Object',
  'RegExp',
  'String',
  'parseInt',
  'parseFloat',
  'isNaN',
  'isFinite',
]);

interface CodeRunnerResponse {
  output: string;
  error: string | null;
  exitCode: number;
}

interface CodeRunnerRequest {
  code: string;
  language: string;
}

export async function POST(req: Request): Promise<NextResponse<CodeRunnerResponse>> {
  try {
    const { code, language }: CodeRunnerRequest = await req.json();

    // Basic input validation
    if (!code || typeof code !== 'string') {
      return NextResponse.json({
        output: "",
        error: 'Invalid code provided',
        exitCode: 1
      });
    }

    if (!language || typeof language !== 'string') {
      return NextResponse.json({
        output: "",
        error: 'Invalid language provided',
        exitCode: 1
      });
    }

    // Currently only supporting JavaScript
    if (language.toLowerCase() !== 'javascript') {
      return NextResponse.json({
        output: "",
        error: 'Only JavaScript is currently supported',
        exitCode: 1
      });
    }

    // Capture console output
    const output: string[] = [];
    const customConsole = {
      log: (...args: any[]) => output.push(args.map(String).join(' ')),
      error: (...args: any[]) => output.push(`Error: ${args.map(String).join(' ')}`),
      warn: (...args: any[]) => output.push(`Warning: ${args.map(String).join(' ')}`),
    };

    // Create a secure context with only whitelisted globals
    const context: Record<string, any> = {
      console: customConsole,
    };

    // Add safe globals to context
    Array.from(SAFE_GLOBALS).forEach(global => {
      const value = (globalThis as any)[global];
      if (typeof value === 'function') {
        context[global] = value.bind(undefined);
      } else {
        context[global] = value;
      }
    });

    // Wrap code in a function to provide limited scope
    const wrappedCode = `
      with (context) {
        ${code}
      }
    `;

    // Execute the code with a timeout
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Execution timeout')), 5000);
      });

      const executionPromise = new Promise((resolve) => {
        const func = new Function('context', wrappedCode);
        resolve(func(context));
      });

      await Promise.race([executionPromise, timeoutPromise]);
      const response: CodeRunnerResponse = {
        output: output.join('\n'),
        error: null,
        exitCode: 0
      };
      return NextResponse.json(response);
    } catch (error) {
      const errorResponse: CodeRunnerResponse = {
        output: "",
        error: error instanceof Error ? error.message : "An unknown error occurred",
        exitCode: 1
      };
      return NextResponse.json(errorResponse, { status: 200 });
    }
  } catch (error) {
    console.error('API Error:', error);
    const errorResponse: CodeRunnerResponse = {
      output: "",
      error: error instanceof Error ? error.message : "An unknown error occurred",
      exitCode: 1
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
} 