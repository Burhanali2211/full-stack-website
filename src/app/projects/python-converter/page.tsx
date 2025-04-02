"use client";

import ProjectLayout from '@/components/project-layout';
import { motion } from 'framer-motion';

export default function PythonConverterProject() {
  return (
    <ProjectLayout
      title="Python File Converter"
      description="A versatile tool for converting files between different formats, built with Python and a modern UI."
      videoId="jNQXAC9IVRw"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Video is now handled by ProjectLayout component */}
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Convert files between multiple formats (PDF, DOCX, TXT, etc.)</li>
            <li>Drag and drop interface for easy file handling</li>
            <li>Batch conversion support</li>
            <li>Progress tracking with detailed status updates</li>
            <li>Error handling and recovery options</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Python', 'PyQt6', 'PyInstaller', 'python-docx', 'PyPDF2'].map((tech) => (
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
            The Python File Converter uses a modular architecture to handle different file formats. 
            Each converter is implemented as a separate module, making it easy to add support for 
            new formats. The PyQt6-based UI provides a smooth user experience with real-time 
            progress updates.
          </p>
          <p>
            Files are processed in a separate thread to keep the UI responsive, and the application 
            uses a queue system for batch processing. Error handling ensures that failed conversions 
            don't affect the rest of the queue.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <div className="p-4 rounded-lg bg-muted">
            <pre className="overflow-x-auto">
              <code>
                {`# Clone the repository
git clone https://github.com/yourusername/python-converter
cd python-converter

# Install dependencies
pip install -r requirements.txt

# Run the application
python main.py`}
              </code>
            </pre>
          </div>
        </section>

        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername/python-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Source
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border hover:bg-accent transition-colors"
          >
            Download App
          </a>
        </div>
      </motion.div>
    </ProjectLayout>
  );
} 