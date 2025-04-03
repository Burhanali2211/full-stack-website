import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BackToTopButton } from "@/components/ui/back-to-top-button";
import { defaultMetadata, defaultViewport } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Educational Platform",
  description: "A platform for learning and practicing programming",
};

export const viewport = defaultViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={cn(inter.className, 'h-full antialiased')}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pt-16">
                {children}
              </main>
              <BackToTopButton />
              <Footer />
              <Toaster />
            </div>
          </ThemeProvider>
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Loader styles
                const style = document.createElement('style');
                style.textContent = \`
                  .loader-container {
                    width: 100vw;
                    height: 100vh;
                    position: fixed;
                    top: 0;
                    left: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    background-color: var(--background, #fff);
                    transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
                    overflow: hidden;
                  }
                  
                  .loader-container.loaded {
                    opacity: 0;
                    visibility: hidden;
                  }
                  
                  .code-editor {
                    background-color: #1e1e1e;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 600px;
                    overflow: hidden;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    font-family: Consolas, Monaco, monospace;
                    color: #d4d4d4;
                    position: relative;
                  }
                  
                  .editor-header {
                    background-color: #2d2d2d;
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #444;
                  }
                  
                  .window-controls {
                    display: flex;
                    gap: 8px;
                    margin-right: 16px;
                  }
                  
                  .control {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                  }
                  
                  .close { background-color: #ff5f56; }
                  .minimize { background-color: #ffbd2e; }
                  .maximize { background-color: #27c93f; }
                  
                  .file-name {
                    font-size: 14px;
                    opacity: 0.8;
                  }
                  
                  .editor-content {
                    padding: 16px;
                    position: relative;
                    min-height: 200px;
                  }
                  
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                  
                  .cursor {
                    display: inline-block;
                    width: 2px;
                    height: 1.2em;
                    background-color: #d4d4d4;
                    vertical-align: middle;
                    animation: blink 1s step-end infinite;
                    margin-left: 1px;
                  }
                  
                  .line {
                    display: flex;
                    margin-bottom: 6px;
                  }
                  
                  .line-number {
                    color: #858585;
                    text-align: right;
                    padding-right: 16px;
                    user-select: none;
                    min-width: 30px;
                  }
                  
                  .comment { color: #6A9955; }
                  .keyword { color: #569CD6; }
                  .function { color: #DCDCAA; }
                  .variable { color: #9CDCFE; }
                  .string { color: #CE9178; }
                  .number { color: #B5CEA8; }
                  .class-name { color: #4EC9B0; }
                  
                  .logo-text {
                    font-size: 24px;
                    font-weight: bold;
                    margin-top: 24px;
                    color: var(--foreground, #000);
                    opacity: 0;
                    animation: fadeIn 1s ease-in-out forwards;
                    animation-delay: 2.5s;
                  }
                  
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                  
                  @keyframes floatUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                  }
                  
                  .dark .code-editor {
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                  }
                \`;
                document.head.appendChild(style);

                let loaderRemoved = false;
                
                function createLoader() {
                  // Create container
                  const container = document.createElement('div');
                  container.className = 'loader-container';
                  
                  // Create code editor
                  const codeEditor = document.createElement('div');
                  codeEditor.className = 'code-editor';
                  
                  // Create editor header
                  const editorHeader = document.createElement('div');
                  editorHeader.className = 'editor-header';
                  
                  // Window controls
                  const windowControls = document.createElement('div');
                  windowControls.className = 'window-controls';
                  
                  const close = document.createElement('div');
                  close.className = 'control close';
                  const minimize = document.createElement('div');
                  minimize.className = 'control minimize';
                  const maximize = document.createElement('div');
                  maximize.className = 'control maximize';
                  
                  windowControls.appendChild(close);
                  windowControls.appendChild(minimize);
                  windowControls.appendChild(maximize);
                  
                  // File name
                  const fileName = document.createElement('div');
                  fileName.className = 'file-name';
                  fileName.textContent = 'main.tsx';
                  
                  editorHeader.appendChild(windowControls);
                  editorHeader.appendChild(fileName);
                  
                  // Create editor content
                  const editorContent = document.createElement('div');
                  editorContent.className = 'editor-content';
                  
                  codeEditor.appendChild(editorHeader);
                  codeEditor.appendChild(editorContent);
                  
                  // Create logo text
                  const logoText = document.createElement('div');
                  logoText.className = 'logo-text';
                  logoText.textContent = 'Educational Platform';
                  
                  container.appendChild(codeEditor);
                  container.appendChild(logoText);
                  
                  document.body.appendChild(container);
                  
                  // Code to type
                  const codeLines = [
                    { lineNumber: 1, content: [{ type: 'keyword', text: 'import ' }, { type: '', text: '{ ' }, { type: 'variable', text: 'useState' }, { type: '', text: ' } ' }, { type: 'keyword', text: 'from ' }, { type: 'string', text: "'react'" }, { type: '', text: ';' }] },
                    { lineNumber: 2, content: [] },
                    { lineNumber: 3, content: [{ type: 'comment', text: '// Welcome to Educational Platform' }] },
                    { lineNumber: 4, content: [{ type: 'keyword', text: 'export default ' }, { type: 'keyword', text: 'function ' }, { type: 'function', text: 'App' }, { type: '', text: '() {' }] },
                    { lineNumber: 5, content: [{ type: '', text: '  ' }, { type: 'keyword', text: 'const ' }, { type: '', text: '[' }, { type: 'variable', text: 'isLoading' }, { type: '', text: ', ' }, { type: 'variable', text: 'setIsLoading' }, { type: '', text: '] = ' }, { type: 'function', text: 'useState' }, { type: '', text: '(' }, { type: 'keyword', text: 'true' }, { type: '', text: ');' }] },
                    { lineNumber: 6, content: [] },
                    { lineNumber: 7, content: [{ type: '', text: '  ' }, { type: 'keyword', text: 'return ' }, { type: '', text: '(' }] },
                    { lineNumber: 8, content: [{ type: '', text: '    <' }, { type: 'class-name', text: 'EducationalPlatform' }, { type: '' , text: '>' }] },
                    { lineNumber: 9, content: [{ type: '', text: '      ' }, { type: 'comment', text: '/* Loading complete... */' }] },
                    { lineNumber: 10, content: [{ type: '', text: '    </' }, { type: 'class-name', text: 'EducationalPlatform' }, { type: '', text: '>' }] },
                    { lineNumber: 11, content: [{ type: '', text: '  );' }] },
                    { lineNumber: 12, content: [{ type: '', text: '}' }] }
                  ];
                  
                  let currentLineIndex = 0;
                  let currentCharIndex = 0;
                  let currentLine = document.createElement('div');
                  let lineNumber = document.createElement('div');
                  let lineContent = document.createElement('div');
                  let cursor = document.createElement('span');
                  
                  currentLine.className = 'line';
                  lineNumber.className = 'line-number';
                  lineContent.style.display = 'flex';
                  lineContent.style.flexWrap = 'wrap';
                  cursor.className = 'cursor';
                  
                  function initNewLine() {
                    currentLine = document.createElement('div');
                    lineNumber = document.createElement('div');
                    lineContent = document.createElement('div');
                    
                    currentLine.className = 'line';
                    lineNumber.className = 'line-number';
                    lineNumber.textContent = codeLines[currentLineIndex].lineNumber.toString();
                    
                    currentLine.appendChild(lineNumber);
                    currentLine.appendChild(lineContent);
                    editorContent.appendChild(currentLine);
                    
                    currentCharIndex = 0;
                  }
                  
                  function typeNextCharacter() {
                    if (currentLineIndex >= codeLines.length) {
                      setTimeout(() => {
                        if (!loaderRemoved) {
                          container.classList.add('loaded');
                          setTimeout(() => {
                            container.remove();
                            loaderRemoved = true;
                          }, 500);
                        }
                      }, 800);
                      return;
                    }
                    
                    if (currentCharIndex === 0) {
                      initNewLine();
                    }
                    
                    const currentCodeLine = codeLines[currentLineIndex];
                    
                    if (currentCharIndex >= currentCodeLine.content.length) {
                      // Move to next line
                      currentLineIndex++;
                      currentCharIndex = 0;
                      lineContent.appendChild(cursor);
                      setTimeout(typeNextCharacter, 30);
                      return;
                    }
                    
                    const segment = currentCodeLine.content[currentCharIndex];
                    const span = document.createElement('span');
                    span.className = segment.type;
                    span.textContent = segment.text;
                    
                    lineContent.appendChild(span);
                    lineContent.appendChild(cursor);
                    
                    currentCharIndex++;
                    setTimeout(typeNextCharacter, Math.random() * 100 + 20);
                  }
                  
                  setTimeout(typeNextCharacter, 500);
                }
                
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', createLoader);
                } else {
                  createLoader();
                }
                
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    if (!loaderRemoved) {
                      const container = document.querySelector('.loader-container');
                      if (container) {
                        container.classList.add('loaded');
                        setTimeout(() => {
                          container.remove();
                          loaderRemoved = true;
                        }, 500);
                      }
                    }
                  }, 5000); // Fallback removal after 5 seconds
                });
              })();
            `
          }}
        />
      </body>
    </html>
  );
} 