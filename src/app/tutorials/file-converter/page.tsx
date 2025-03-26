"use client";

import MainLayout from "@/components/main-layout"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import MDXCodeBlock from "@/components/mdx-code-block"
import CodePlayground from "@/components/code-playground"

const sections = [
  {
    id: "prerequisites",
    title: "Prerequisites",
    content: `Before starting this tutorial, make sure you have:
- Python 3.8 or higher installed
- Basic understanding of Python programming
- Familiarity with virtual environments
- A code editor (VS Code recommended)`,
  },
  {
    id: "project-setup",
    title: "Project Setup",
    content: `Let's start by setting up our project environment:

1. Create a new directory for your project
2. Set up a virtual environment
3. Install required packages`,
    code: `# Create project directory
mkdir python-file-converter
cd python-file-converter

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\\venv\\Scripts\\activate

# Activate virtual environment (macOS/Linux)
source venv/bin/activate

# Install required packages
pip install PyQt6 python-docx PyPDF2`,
  },
  {
    id: "core-functionality",
    title: "Core Functionality",
    content: `Let's implement the core file conversion functionality. We'll create a FileConverter class that handles different file formats:`,
    code: `import os
from PyPDF2 import PdfReader, PdfWriter
from docx import Document

class FileConverter:
    def __init__(self):
        self.supported_formats = ['pdf', 'docx', 'txt']
    
    def convert_file(self, input_path, output_path):
        input_ext = input_path.split('.')[-1].lower()
        output_ext = output_path.split('.')[-1].lower()
        
        if input_ext not in self.supported_formats:
            raise ValueError(f"Unsupported input format: {input_ext}")
        
        if output_ext not in self.supported_formats:
            raise ValueError(f"Unsupported output format: {output_ext}")
        
        print(f"Converting {input_path} to {output_path}")
        return True

# Create an instance and try it
converter = FileConverter()
try:
    result = converter.convert_file("example.pdf", "output.txt")
    print("Conversion successful!" if result else "Conversion failed.")
except ValueError as e:
    print(f"Error: {e}")`,
  },
  {
    id: "gui-implementation",
    title: "GUI Implementation",
    content: `Now let's create a user-friendly interface using PyQt6:`,
    code: `import sys
from PyQt6.QtWidgets import (QApplication, QMainWindow, QPushButton,
                           QFileDialog, QComboBox, QVBoxLayout, QWidget,
                           QLabel, QProgressBar)
from PyQt6.QtCore import Qt

class FileConverterGUI(QMainWindow):
    def __init__(self):
        super().__init__()
        self.converter = FileConverter()
        self.init_ui()
    
    def init_ui(self):
        self.setWindowTitle('File Converter')
        self.setGeometry(100, 100, 400, 300)
        
        # Create central widget and layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        
        # Add widgets
        self.file_label = QLabel('No file selected')
        layout.addWidget(self.file_label)
        
        select_btn = QPushButton('Select File')
        select_btn.clicked.connect(self.select_file)
        layout.addWidget(select_btn)
        
        self.format_combo = QComboBox()
        self.format_combo.addItems(['pdf', 'docx', 'txt'])
        layout.addWidget(self.format_combo)
        
        convert_btn = QPushButton('Convert')
        convert_btn.clicked.connect(self.convert_file)
        layout.addWidget(convert_btn)
        
        self.progress = QProgressBar()
        layout.addWidget(self.progress)
    
    def select_file(self):
        file_name, _ = QFileDialog.getOpenFileName(
            self,
            'Select File',
            '',
            'All Files (*.pdf *.docx *.txt)'
        )
        if file_name:
            self.file_label.setText(file_name)
    
    def convert_file(self):
        if self.file_label.text() == 'No file selected':
            return
        
        input_path = self.file_label.text()
        output_format = self.format_combo.currentText()
        output_path, _ = QFileDialog.getSaveFileName(
            self,
            'Save File',
            '',
            f'*.{output_format}'
        )
        
        if output_path:
            try:
                self.progress.setValue(0)
                self.converter.convert_file(input_path, output_path)
                self.progress.setValue(100)
            except Exception as e:
                self.progress.setValue(0)
                print(f"Error: {e}")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = FileConverterGUI()
    window.show()
    sys.exit(app.exec())`,
  },
  {
    id: "testing",
    title: "Testing",
    content: `Let's add some basic tests to ensure our converter works correctly:`,
    code: `import unittest
import os

class TestFileConverter(unittest.TestCase):
    def setUp(self):
        self.converter = FileConverter()
        self.test_pdf = 'test.pdf'
        self.test_txt = 'test.txt'
        
    def test_pdf_to_txt(self):
        result = self.converter.convert_file(self.test_pdf, self.test_txt)
        self.assertTrue(result)
        self.assertTrue(os.path.exists(self.test_txt))
        
    def test_invalid_format(self):
        with self.assertRaises(ValueError):
            self.converter.convert_file('test.pdf', 'test.invalid')
            
if __name__ == '__main__':
    unittest.main()`,
  },
  {
    id: "packaging",
    title: "Packaging",
    content: `Finally, let's package our application for distribution:`,
    code: `# setup.py
from setuptools import setup, find_packages

setup(
    name="python-file-converter",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        'PyQt6',
        'python-docx',
        'PyPDF2',
    ],
    entry_points={
        'console_scripts': [
            'file-converter=file_converter.gui:main',
        ],
    },
)`,
  },
];

export default function TutorialPage() {
  return (
    <MainLayout>
      <div className="container py-8 px-4 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tutorials"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tutorials
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Python File Converter Tutorial
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn how to build a file converter application with Python and PyQt6
            </p>
          </motion.div>
        </div>

        {/* Interactive Code Playground */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Try it yourself</h2>
          <CodePlayground
            language="python"
            initialCode={`# Python File Converter Example
class FileConverter:
    def __init__(self):
        self.supported_formats = ['pdf', 'docx', 'txt']
    
    def convert_file(self, input_path, output_path):
        input_ext = input_path.split('.')[-1].lower()
        output_ext = output_path.split('.')[-1].lower()
        
        if input_ext not in self.supported_formats:
            raise ValueError(f"Unsupported input format: {input_ext}")
        
        if output_ext not in self.supported_formats:
            raise ValueError(f"Unsupported output format: {output_ext}")
        
        print(f"Converting {input_path} to {output_path}")
        return True

# Create an instance and try it
converter = FileConverter()
try:
    result = converter.convert_file("example.pdf", "output.txt")
    print("Conversion successful!" if result else "Conversion failed.")
except ValueError as e:
    print(f"Error: {e}")`}
          />
        </div>

        {/* Tutorial Sections */}
        <div className="max-w-3xl">
          {sections.map((section) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-4" id={section.id}>
                {section.title}
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                {section.content}
              </div>
              {section.code && (
                <MDXCodeBlock className="language-python">
                  {section.code}
                </MDXCodeBlock>
              )}
            </motion.section>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 