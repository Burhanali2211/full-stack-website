import React from 'react';
import CodePlayground from '@/components/CodePlayground';
import MiniQuiz from '@/components/MiniQuiz';
import Tooltip from '@/components/Tooltip';

const APIFun = () => {
  return (
    <div className="tutorial">
      <h1 className="text-2xl font-semibold text-purple-600">API Fun: Fetch Live Data</h1>
      <ol className="prose text-gray-700 dark:text-gray-300">
        <li>
          <h2 className="text-xl font-bold text-blue-600">Step 1: Choose an API</h2>
          <p>Select a free API like Weather or GitHub. This will be the source of the live data you fetch. Define the API endpoint as a constant.</p>
          <CodePlayground language="javascript" initialCode="const api = 'https://api.openweathermap.org';" />
          <Tooltip text="Run to test!" />
        </li>
        <li>
          <h2 className="text-xl font-bold text-blue-600">Step 2: Fetch data</h2>
          <p>Use JavaScript to fetch data from the API. This involves making an HTTP request to the API endpoint.</p>
          <CodePlayground language="javascript" initialCode="fetch('https://api.github.com/users')" />
          <MiniQuiz questions={[{
            question: 'What does fetch() do?',
            options: ['A) Sends an HTTP request', 'B) Logs data to console'],
            answer: 'A) Sends an HTTP request'
          }]} />
          <Tooltip text="Run to test!" />
        </li>
        <li>
          <h2 className="text-xl font-bold text-blue-600">Step 3: Display data</h2>
          <p>Render the fetched data on your webpage. This step involves processing the response and updating the DOM. Log the response to the console.</p>
          <CodePlayground language="javascript" initialCode=".then(res => console.log(res.json()))" />
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

export default APIFun; 