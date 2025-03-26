"use client";

import TutorialLayout from "@/components/tutorial-layout";
import CodeBlock from "@/components/code-block";
import InteractiveEditor from "@/components/interactive-editor";
import { motion } from "framer-motion";
import Link from "next/link";

const fetchExample = `// Using fetch
fetch('https://api.github.com/users/yourusername')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using async/await
async function getGithubUser(username) {
  try {
    const response = await fetch(\`https://api.github.com/users/\${username}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`;

const axiosExample = `import axios from 'axios';

// Using axios
axios.get('https://api.github.com/users/yourusername')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));

// Using async/await with axios
async function getGithubUser(username) {
  try {
    const { data } = await axios.get(\`https://api.github.com/users/\${username}\`);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`;

const nextApiExample = `// pages/api/github/[username].ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  try {
    const response = await fetch(\`https://api.github.com/users/\${username}\`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}`;

const interactiveCode = `// Try fetching data from the GitHub API
async function fetchGitHubUser(username) {
  try {
    const response = await fetch(\`https://api.github.com/users/\${username}\`);
    const data = await response.json();
    console.log('User data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function
fetchGitHubUser('octocat');`;

export default function IntroToApisTutorial() {
  return (
    <TutorialLayout
      title="Introduction to APIs for Beginners"
      description="Learn the basics of working with APIs in web development. We'll cover what APIs are, how to make API calls, and best practices for handling responses and errors."
      difficulty="Beginner"
      duration="1-2 hours"
      githubUrl="https://github.com/yourusername/api-examples"
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-4">What are APIs?</h2>
        <p className="mb-6">
          API (Application Programming Interface) is a set of rules and protocols that allows different 
          software applications to communicate with each other. In web development, we often use APIs 
          to fetch data from servers, send data to servers, or integrate third-party services into 
          our applications.
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
          Let's try making an API call to GitHub. Edit the code below and click "Run" to fetch user data:
          <Link href="/playground" className="text-primary hover:underline ml-2">
            (or try our full-featured Code Playground)
          </Link>
        </p>
        <InteractiveEditor
          initialCode={interactiveCode}
          initialLanguage="javascript"
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Making API Calls with Fetch</h2>
        <p className="mb-4">
          The Fetch API is built into modern browsers and provides a simple way to make HTTP requests. 
          Here's how to fetch data from the GitHub API:
        </p>
        <CodeBlock code={fetchExample} language="javascript" />
        <p className="mt-4">
          The fetch function returns a Promise that resolves to the Response object. We need to call 
          .json() to parse the response body as JSON. Using async/await makes the code more readable 
          and easier to handle errors.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Using Axios</h2>
        <p className="mb-4">
          Axios is a popular HTTP client that provides a more powerful interface for making API calls:
        </p>
        <CodeBlock code={axiosExample} language="javascript" />
        <p className="mt-4">
          Axios automatically transforms JSON responses and provides better error handling. It also 
          works in both browser and Node.js environments, making it a versatile choice for API calls.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Creating an API Route in Next.js</h2>
        <p className="mb-4">
          Next.js allows you to create API routes that run on the server. Here's how to create an API 
          endpoint that proxies requests to the GitHub API:
        </p>
        <CodeBlock code={nextApiExample} language="typescript" />
        <p className="mt-4">
          This API route can be accessed at /api/github/[username]. It's a good practice to proxy 
          third-party API calls through your server to hide API keys and add rate limiting.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Always handle errors gracefully</li>
          <li>Use environment variables for API keys</li>
          <li>Implement proper loading and error states in your UI</li>
          <li>Cache responses when appropriate</li>
          <li>Add request timeouts</li>
          <li>Validate API responses</li>
        </ul>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10"
      >
        <h3 className="text-xl font-semibold mb-2">💡 Pro Tip</h3>
        <p>
          When working with APIs, use tools like Postman or Insomnia to test API endpoints before 
          implementing them in your code. This helps you understand the API response structure and 
          catch potential issues early.
        </p>
      </motion.div>
    </TutorialLayout>
  );
} 