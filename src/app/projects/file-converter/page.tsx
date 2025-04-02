"use client";

import ProjectLayout from '@/components/project-layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';

export default function FileConverterProject() {
  return (
    <ProjectLayout
      title="Web-Based File Converter"
      description="A modern file converter application built with Next.js and React, featuring a drag-and-drop interface and real-time conversion status."
      videoId="dQw4w9WgXcQ"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >        
        <section>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Drag and drop interface for easy file uploads</li>
            <li>Support for multiple file formats (PDF, DOCX, TXT)</li>
            <li>Real-time conversion status with progress indicators</li>
            <li>Responsive design that works on mobile and desktop</li>
            <li>Secure client-side file handling</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
              <div
                key={tech}
                className="p-4 rounded-lg border bg-card text-center hover:border-primary/50 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="mb-4">
            The file converter uses a modern React architecture with Next.js for server-side 
            rendering and API routes. Files are processed client-side using Web APIs when possible, 
            with a fallback to server processing for more complex conversions.
          </p>
          <p>
            The application features an intuitive drag-and-drop interface with real-time feedback 
            on conversion progress. Error handling is robust, providing clear messages to users 
            when issues occur.
          </p>
        </section>

        <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FileText className="h-10 w-10 text-primary mr-4" />
            <div>
              <h3 className="text-xl font-bold">Try It Out</h3>
              <p className="text-muted-foreground">Test the converter with your own files</p>
            </div>
          </div>
          <Link
            href="/projects/file-converter/try-it"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Launch Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">Implementation Highlights</h2>
          <div className="p-4 rounded-lg bg-muted">
            <pre className="overflow-x-auto">
              <code>
                {`// File conversion handler
const convertFile = async (file, outputFormat) => {
  // Validate input
  if (!isValidFileType(file.type)) {
    throw new Error('Unsupported file type');
  }
  
  // Set up progress tracking
  const progress = new Subject();
  
  // Process file based on type
  const result = await processFileByType(
    file,
    outputFormat,
    (percent) => progress.next(percent)
  );
  
  return { result, progress: progress.asObservable() };
};`}
              </code>
            </pre>
          </div>
        </section>

        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername/file-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Source
          </a>
        </div>
      </motion.div>
    </ProjectLayout>
  );
} 