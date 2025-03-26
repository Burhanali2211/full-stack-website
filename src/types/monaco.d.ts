declare module "@monaco-editor/react" {
  import * as React from "react";
  import * as monaco from "monaco-editor";

  export interface EditorProps {
    height: string | number;
    width?: string | number;
    value?: string;
    defaultValue?: string;
    language?: string | null;
    theme?: string | null;
    options?: monaco.editor.IStandaloneEditorConstructionOptions;
    overrideServices?: monaco.editor.IEditorOverrideServices;
    onChange?: (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => void;
    onMount?: (editor: monaco.editor.IStandaloneCodeEditor, monaco: typeof monaco) => void;
    beforeMount?: (monaco: typeof monaco) => void;
    onValidate?: (markers: monaco.editor.IMarker[]) => void;
    loading?: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
    keepCurrentModel?: boolean;
  }

  export interface DiffEditorProps {
    original: string;
    modified: string;
    language?: string;
    originalLanguage?: string;
    modifiedLanguage?: string;
    height?: string | number;
    width?: string | number;
    theme?: string;
    options?: monaco.editor.IDiffEditorConstructionOptions;
    onChange?: (value: string) => void;
    onMount?: (editor: monaco.editor.IStandaloneDiffEditor, monaco: typeof monaco) => void;
    beforeMount?: (monaco: typeof monaco) => void;
    loading?: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
  }

  export interface loader {
    config: (params: {
      paths?: {
        vs?: string;
      };
      'vs/nls'?: {
        availableLanguages?: {
          '*'?: string;
        };
      };
      monaco?: string;
    }) => void;
    init: () => Promise<void>;
  }

  export const Editor: React.FC<EditorProps>;
  export const DiffEditor: React.FC<DiffEditorProps>;
  export const loader: loader;
} 