"use client";

import TutorialLayout from "@/components/tutorial-layout";
import CodeBlock from "@/components/code-block";
import InteractiveEditor from "@/components/interactive-editor";
import { motion } from "framer-motion";

const installCode = `pip install pyinstaller`;

const basicCode = `# script.py
def convert_file(input_path, output_format):
    try:
        # Add your conversion logic here
        print(f"Converting {input_path} to {output_format}")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    success = convert_file("example.txt", "pdf")
    print("Conversion successful!" if success else "Conversion failed.")`;

const pyinstallerCode = `pyinstaller --onefile --windowed script.py`;

const interactiveCode = `print('Converting file...')
# Simulate file conversion
import time
time.sleep(1)
print('File converted successfully!')`;

export default function PythonFileConverterTutorial() {
  return (
    <TutorialLayout
      title="How to Convert Python Files to Apps"
      description="Learn how to transform your Python scripts into standalone executable applications using PyInstaller. Perfect for distributing your tools to non-technical users."
      difficulty="Intermediate"
      duration="2-3 hours"
      githubUrl="https://github.com/yourusername/python-file-converter"
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="mb-6">
          Converting Python scripts into standalone executables is a crucial skill for distributing your applications. 
          In this tutorial, we'll learn how to use PyInstaller to create professional, distributable applications 
          from Python scripts. We'll build a simple file converter that can be shared with users who don't have 
          Python installed.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Try It Out</h2>
        <p className="mb-4">
          Let's start by testing a simple file conversion script. Edit the code below and click "Run" to see it in action:
        </p>
        <InteractiveEditor
          initialCode={interactiveCode}
          initialLanguage="python"
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Python 3.6 or higher installed on your system</li>
          <li>Basic understanding of Python programming</li>
          <li>Familiarity with command line operations</li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Step 1: Installing PyInstaller</h2>
        <p className="mb-4">
          First, we need to install PyInstaller using pip. Open your terminal and run:
        </p>
        <CodeBlock code={installCode} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Step 2: Creating the Python Script</h2>
        <p className="mb-4">
          Let's create a basic file converter script. This example shows the structure of our application:
        </p>
        <CodeBlock code={basicCode} language="python" />
        <p className="mt-4">
          This script provides a basic structure for file conversion. You can extend the convert_file 
          function with your specific conversion logic (e.g., using libraries like python-docx for DOCX 
          files or PyPDF2 for PDF files).
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Step 3: Converting to Executable</h2>
        <p className="mb-4">
          Now that we have our script ready, let's convert it to an executable using PyInstaller:
        </p>
        <CodeBlock code={pyinstallerCode} />
        <p className="mt-4">
          The flags we're using:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>--onefile: Creates a single executable file</li>
          <li>--windowed: Prevents the terminal window from appearing (Windows only)</li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <p className="mb-4">
          To enhance your file converter application, consider:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Adding a graphical user interface using tkinter or PyQt</li>
          <li>Implementing drag-and-drop functionality</li>
          <li>Supporting multiple file formats</li>
          <li>Adding progress bars and error handling</li>
        </ul>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10"
      >
        <h3 className="text-xl font-semibold mb-2">💡 Pro Tip</h3>
        <p>
          When distributing your application, always test it on a clean system without Python installed 
          to ensure all dependencies are properly bundled. Consider using virtual environments during 
          development to keep track of required packages.
        </p>
      </motion.div>
    </TutorialLayout>
  );
} 