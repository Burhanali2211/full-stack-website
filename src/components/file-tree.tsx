"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { FileNode } from '@/types/ide'

interface FileTreeProps {
  files: FileNode[]
  onFileSelect: (file: FileNode) => void
  selectedFileId?: string
  className?: string
}

interface FileTreeItemProps {
  file: FileNode
  level: number
  onFileSelect: (file: FileNode) => void
  selectedFileId?: string
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({
  file,
  level,
  onFileSelect,
  selectedFileId,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const isDirectory = file.type === 'directory'
  const isSelected = file.id === selectedFileId

  const handleClick = () => {
    if (isDirectory) {
      setIsOpen(!isOpen)
    } else {
      onFileSelect(file)
    }
  }

  const getFileIcon = () => {
    if (isDirectory) {
      return isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
    }
    return <File className="w-4 h-4" />
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'w-full justify-start gap-2 px-2 py-1.5 h-8 hover:bg-muted/50',
          isSelected && 'bg-muted',
          level > 0 && `pl-${level * 4}`
        )}
        onClick={handleClick}
      >
        {getFileIcon()}
        <span className="truncate">{file.name}</span>
      </Button>
      <AnimatePresence>
        {isOpen && file.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {file.children.map((child) => (
              <FileTreeItem
                key={child.id}
                file={child}
                level={level + 1}
                onFileSelect={onFileSelect}
                selectedFileId={selectedFileId}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const FileTree: React.FC<FileTreeProps> = ({
  files,
  onFileSelect,
  selectedFileId,
  className,
}) => {
  return (
    <ScrollArea className={cn('h-full', className)}>
      <div className="p-2">
        {files.map((file) => (
          <FileTreeItem
            key={file.id}
            file={file}
            level={0}
            onFileSelect={onFileSelect}
            selectedFileId={selectedFileId}
          />
        ))}
      </div>
    </ScrollArea>
  )
} 