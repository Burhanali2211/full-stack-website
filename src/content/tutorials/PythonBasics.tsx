import React from 'react';
import CodePlayground from '@/components/CodePlayground';
import MiniQuiz from '@/components/MiniQuiz';
import Tooltip from '@/components/Tooltip';
import Chatbot from '@/components/Chatbot';

const PythonBasics = () => {
  return (
    <div className="tutorial">
      <h1 className="text-2xl font-semibold text-purple-600">Python Basics: Build a Calculator</h1>
      <ol className="prose text-gray-700 dark:text-gray-300">
        <li>
          <h2 className="text-xl font-bold text-blue-600">Step 1: Set up your file</h2>
          <p>Create a new Python file named <code>calculator.py</code>. This file will contain all the code for your calculator application.</p>
          <CodePlayground language="python" />
          <Tooltip text="Run to test!" />
        </li>
        <li>
          <h2 className="text-xl font-bold text-blue-600">Step 2: Write the addition function</h2>
          <p>This function takes two numbers and returns their sum. It's a simple yet powerful way to perform addition in Python.</p>
          <CodePlayground language="python" initialCode="def add(a, b):\n    return a + b" />
          <MiniQuiz questions={[{
            question: 'What does def do?',
            options: ['A) Defines a function', 'B) Prints text'],
            answer: 'A) Defines a function'
          }]} />
          <Tooltip text="Pick one!" />
        </li>
        <li>
          <h2 className="text-xl font-bold text-blue-600">Step 3: Implement user input</h2>
          <p>Allow users to input numbers to calculate. This step involves using the <code>input()</code> function to gather user input.</p>
          <CodePlayground language="python" />
          <Tooltip text="Run to test!" />
        </li>
      </ol>
      <Chatbot />
    </div>
  );
};

export default PythonBasics; 