"use client";

import { File, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FileNode } from "@/types/ide";

interface FileTreeProps {
  files: FileNode[];
  selectedFileId?: string;
  onFileSelect: (file: FileNode) => void;
}

export function FileTree({ files, selectedFileId, onFileSelect }: FileTreeProps) {
  return (
    <div className="space-y-1">
      {files.map((file) => (
        <button
          key={file.id}
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:bg-muted",
            selectedFileId === file.id && "bg-muted"
          )}
          onClick={() => onFileSelect(file)}
        >
          {file.type === "file" ? (
            <File className="h-4 w-4" />
          ) : (
            <Folder className="h-4 w-4" />
          )}
          <span>{file.name}</span>
        </button>
      ))}
    </div>
  );
} 