import { useTheme } from "next-themes";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { githubLight } from '@uiw/codemirror-theme-github';

interface CodeEditorProps {
  code: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: string;
}

export function CodeEditor({ code, onChange, readOnly = false, language = 'javascript' }: CodeEditorProps) {
  const { theme } = useTheme();

  return (
    <CodeMirror
      value={code}
      height="100%"
      theme={theme === 'dark' ? vscodeDark : githubLight}
      extensions={[javascript()]}
      onChange={onChange}
      readOnly={readOnly}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
    />
  );
} 