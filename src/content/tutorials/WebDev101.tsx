import React from 'react';
import CodePlayground from '@/components/CodePlayground';
import MiniQuiz from '@/components/MiniQuiz';
import Tooltip from '@/components/Tooltip';

const WebDev101 = () => {
  return (
    <div className="tutorial">
      <h1 className="text-2xl font-semibold text-purple-600">Web Dev 101: Create a Mini-Site</h1>
      <ol className="prose text-gray-700 dark:text-gray-300">
        <li>
          <h2 className="text-xl font-bold text-blue-600">Step 1: Set up your HTML file</h2>
          <p>Create an <code>index.html</code> file with basic structure. This file will serve as the entry point for your mini-site.</p>
          <CodePlayground language="html" initialCode="<h1>Hello World</h1>" />
          <MiniQuiz questions={[{
            question: 'What does <h1> do?',
            options: ['A) Creates a heading', 'B) Adds a paragraph'],
            answer: 'A) Creates a heading'
          }]} />
          <Tooltip text="Run to test!" />
        </li>
        <li>
          <h2 className="text-xl font-bold text-blue-600">Step 2: Style with CSS</h2>
          <p>Add styles to your site using a <code>styles.css</code> file. This will enhance the visual appeal of your site. Start by setting a background color for the body.</p>
          <CodePlayground language="css" initialCode="body { background: lightblue; }" />
          <MiniQuiz questions={[{
            question: 'What does CSS stand for?',
            options: ['A) Cascading Style Sheets', 'B) Computer Style System'],
            answer: 'A) Cascading Style Sheets'
          }]} />
          <Tooltip text="Run to test!" />
        </li>
        <li>
          <h2 className="text-xl font-bold text-blue-600">Step 3: Add interactivity with JavaScript</h2>
          <p>Use JavaScript to add dynamic behavior to your site, making it more engaging for users. Change the color of the heading using JavaScript.</p>
          <CodePlayground language="javascript" initialCode="document.querySelector('h1').style.color = 'red';" />
          <MiniQuiz questions={[{
            question: 'What does .then() do?',
            options: ['A) Handles promises', 'B) Loops data'],
            answer: 'A) Handles promises'
          }]} />
          <Tooltip text="Run to test!" />
        </li>
      </ol>
    </div>
  );
};

export default WebDev101; 