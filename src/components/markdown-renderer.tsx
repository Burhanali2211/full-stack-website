'use client';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodePlayground from './code-playground';
import { CodeEditor } from './code-editor';
import { Suspense } from 'react';

const components = {
  pre: ({ children }: { children: React.ReactNode }) => <div className="not-prose">{children}</div>,
  code: CodeEditor,
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg leading-relaxed mb-4 text-gray-200">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-lg text-gray-200">{children}</li>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href} className="text-blue-400 hover:text-blue-300 underline">
      {children}
    </a>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-300">
      {children}
    </blockquote>
  ),
  CodePlayground,
};

interface MarkdownRendererProps {
  content: string;
}

async function MDXContent({ content }: { content: string }) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });

  return <MDXRemote {...mdxSource} components={components} />;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <Suspense fallback={<div>Loading content...</div>}>
        <MDXContent content={content} />
      </Suspense>
    </div>
  );
} 