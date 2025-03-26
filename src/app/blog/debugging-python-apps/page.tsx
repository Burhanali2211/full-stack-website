"use client";

import React from 'react';
import { BlogPost } from '@/components/blog-post';
import BlogInteractiveElements from '@/components/blog-interactive-elements';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const debuggingQuestions: Question[] = [
  {
    id: "debug-q1",
    question: "What is the primary purpose of using a debugger?",
    options: [
      "To make the code run faster",
      "To find and fix errors in code",
      "To format the code",
      "To compile the code",
    ],
    correctAnswer: 1,
    explanation: "A debugger is a tool used to find and fix errors (bugs) in code by allowing developers to pause execution and inspect variables.",
  },
  {
    id: "debug-q2",
    question: "Which Python statement is used to set a breakpoint in code?",
    options: [
      "break()",
      "stop()",
      "breakpoint()",
      "debug()",
    ],
    correctAnswer: 2,
    explanation: "The breakpoint() function is Python's built-in way to set a breakpoint in code for debugging purposes.",
  },
  {
    id: "debug-q3",
    question: "What does pdb stand for in Python?",
    options: [
      "Python Debug Base",
      "Python Database",
      "Python Debugger",
      "Python Development Build",
    ],
    correctAnswer: 2,
    explanation: "pdb stands for Python Debugger, which is Python's built-in interactive source code debugger.",
  },
];

const sampleCode = `def calculate_average(numbers):
    """Calculate the average of a list of numbers."""
    if not numbers:  # Add a check for empty list
        return 0
    
    total = 0
    count = 0
    
    for num in numbers:
        # Add debugging breakpoint
        breakpoint()  # This line will pause execution in debug mode
        total += num
        count += 1
    
    return total / count

# Test the function
test_numbers = [10, 20, 30, 40, 50]
result = calculate_average(test_numbers)
print(f"The average is: {result}")`;

const blogContent = `
<h2 id="introduction">Introduction to Python Debugging</h2>
<p>
  Debugging is an essential skill for any programmer. In this tutorial, we'll explore various
  techniques to debug Python applications effectively. We'll cover print debugging,
  using the Python debugger (pdb), and leveraging modern IDE features.
</p>

<h2 id="print-debugging">Print Debugging</h2>
<p>
  The simplest form of debugging is using print statements to track variable values
  and program flow. While not the most sophisticated method, it's often the quickest
  way to identify issues.
</p>

<h3 id="example">Interactive Example</h3>
<p>
  Let's look at a simple function that calculates the average of a list of numbers.
  We'll add a breakpoint to examine the values during execution.
</p>

<h2 id="using-pdb">Using the Python Debugger (pdb)</h2>
<p>
  Python's built-in debugger, pdb, provides a command-line interface for debugging
  Python programs. Here are some essential pdb commands:
</p>
<ul>
  <li><code>n</code> (next) - Execute the next line</li>
  <li><code>s</code> (step) - Step into a function call</li>
  <li><code>c</code> (continue) - Continue execution until the next breakpoint</li>
  <li><code>p variable</code> - Print the value of a variable</li>
  <li><code>l</code> - List the current location in the code</li>
</ul>

<h2 id="ide-debugging">Modern IDE Debugging</h2>
<p>
  Modern IDEs like VS Code provide powerful debugging features with a graphical interface:
</p>
<ul>
  <li>Breakpoint management</li>
  <li>Variable inspection</li>
  <li>Call stack navigation</li>
  <li>Conditional breakpoints</li>
</ul>

<h2 id="best-practices">Debugging Best Practices</h2>
<p>
  Follow these best practices for effective debugging:
</p>
<ol>
  <li>Use descriptive variable names</li>
  <li>Add meaningful comments</li>
  <li>Write testable code</li>
  <li>Use logging instead of print statements in production</li>
  <li>Learn your debugging tools well</li>
</ol>

<h2 id="quiz">Test Your Knowledge</h2>
<p>
  Let's test your understanding of Python debugging concepts with a quick quiz!
</p>
`;

export default function DebuggingPythonPage() {
  return (
    <div className="space-y-8">
      <BlogPost
        title="Mastering Python Debugging: A Comprehensive Guide"
        author={{
          name: "John Developer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        }}
        date="2024-03-15"
        content={blogContent}
        tags={["Python", "Debugging", "Tutorial", "Programming"]}
        estimatedReadTime={10}
      />
      
      <BlogInteractiveElements
        code={sampleCode}
        language="python"
        questions={debuggingQuestions}
        tutorialId="python-debugging"
      />
    </div>
  );
} 