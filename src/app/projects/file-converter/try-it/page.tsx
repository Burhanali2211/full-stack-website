"use client";

import MainLayout from "@/components/main-layout";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Upload, 
  FileText, 
  ArrowRight, 
  Check, 
  X, 
  ArrowLeft, 
  AlertCircle,
  Loader2
} from "lucide-react";

export default function TryItPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("pdf");
  const [converting, setConverting] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const acceptedFileTypes = ".pdf,.docx,.txt";
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setCompleted(false);
    setError(null);
    setDownloadUrl(null);
  };
  
  const handleConvert = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }
    
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === outputFormat) {
      setError("Input and output formats cannot be the same");
      return;
    }
    
    try {
      setError(null);
      setConverting(true);
      
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a blob URL for download (in a real app, this would be the converted file)
      const dummyContent = `This is a simulated ${outputFormat.toUpperCase()} file converted from ${fileExtension?.toUpperCase()}`;
      const blob = new Blob([dummyContent], { type: `application/${outputFormat}` });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setCompleted(true);
      setConverting(false);
    } catch (err) {
      setError("Conversion failed. Please try again.");
      setConverting(false);
    }
  };
  
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="text-red-500" />;
      case 'docx':
        return <FileText className="text-blue-500" />;
      case 'txt':
        return <FileText className="text-gray-500" />;
      default:
        return <FileText />;
    }
  };

  return (
    <MainLayout>
      <div className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <Link 
              href="/projects/file-converter"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Upload className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold">File Converter</h1>
          </div>
          
          <div className="p-8 rounded-xl border bg-card shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step 1: Select File */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary w-6 h-6 text-sm mr-2">1</span>
                  Select File
                </h2>
                
                <label 
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors
                    ${selectedFile ? 'border-primary/50 bg-primary/5' : 'border-muted-foreground/20'}
                  `}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {selectedFile ? (
                      <div className="flex items-center gap-2 text-primary">
                        {getFileIcon(selectedFile.name)}
                        <span className="font-medium truncate max-w-[180px]">{selectedFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-1 text-sm text-muted-foreground">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT</p>
                      </>
                    )}
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept={acceptedFileTypes}
                    onChange={handleFileChange}
                  />
                </label>
                
                {selectedFile && (
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Remove file
                  </button>
                )}
              </div>
              
              {/* Step 2: Choose Format */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary w-6 h-6 text-sm mr-2">2</span>
                  Choose Format
                </h2>
                
                <div className="space-y-2">
                  {["pdf", "docx", "txt"].map((format) => (
                    <div key={format} className="flex items-center">
                      <input
                        type="radio"
                        id={format}
                        name="outputFormat"
                        value={format}
                        checked={outputFormat === format}
                        onChange={() => setOutputFormat(format)}
                        className="hidden"
                      />
                      <label
                        htmlFor={format}
                        className={`
                          flex items-center w-full p-3 rounded-md cursor-pointer
                          ${outputFormat === format 
                            ? 'bg-primary/10 text-primary border border-primary/20' 
                            : 'bg-muted hover:bg-accent/50 border border-transparent'
                          }
                          transition-colors
                        `}
                      >
                        <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${
                          outputFormat === format ? 'bg-primary' : 'border-2 border-muted-foreground/50'
                        }`}>
                          {outputFormat === format && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="uppercase">{format}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Step 3: Convert */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary w-6 h-6 text-sm mr-2">3</span>
                  Convert
                </h2>
                
                <div className="flex flex-col h-[calc(100%-32px)] justify-between">
                  <div className="mb-4">
                    <button
                      onClick={handleConvert}
                      disabled={!selectedFile || converting}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-md font-medium
                        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                      {converting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Converting...
                        </>
                      ) : completed ? (
                        <>
                          <Check className="w-4 h-4" />
                          Converted
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4" />
                          Convert Now
                        </>
                      )}
                    </button>
                  </div>
                  
                  {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm p-3 border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900 rounded-md">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                  
                  {completed && downloadUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900 rounded-md p-4 text-center"
                    >
                      <Check className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <h3 className="font-medium text-green-700 dark:text-green-400 mb-2">Conversion Complete!</h3>
                      <a
                        href={downloadUrl}
                        download={`converted.${outputFormat}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md font-medium
                          hover:bg-green-700 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Download File
                      </a>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h2 className="text-lg font-semibold mb-2">About This Demo</h2>
            <p className="text-muted-foreground mb-4">
              This is a simulated file converter that demonstrates the user interface of our Python application.
              In a real environment, the conversion would be handled by the backend code shown in the tutorial.
            </p>
            <Link
              href="/tutorials/file-converter"
              className="inline-flex items-center text-primary hover:underline"
            >
              Learn how to build this →
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
} 