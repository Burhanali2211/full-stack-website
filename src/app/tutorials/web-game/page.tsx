"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import TutorialLayout from "@/components/tutorial-layout";
import CodeBlock from "@/components/code-block";
import InteractiveEditor from "@/components/interactive-editor";

const initialCode = `// Try changing the guess value and click Run!
let number = 5;
let guess = 3;

if (guess === number) {
  console.log('You win!');
} else {
  console.log('Try again!');
}`;

const gameLogicCode = `class NumberGame {
  constructor() {
    this.secretNumber = Math.floor(Math.random() * 100) + 1;
    this.attempts = 0;
  }

  checkGuess(guess) {
    this.attempts++;
    if (guess === this.secretNumber) {
      return \`Congratulations! You found the number in \${this.attempts} attempts!\`;
    }
    return guess < this.secretNumber ? "Too low! Try a higher number." : "Too high! Try a lower number.";
  }
}`;

const uiCode = `function GameUI() {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const game = useRef(new NumberGame());

  const handleGuess = () => {
    const result = game.current.checkGuess(parseInt(guess));
    setMessage(result);
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess}>Guess</button>
      {message && <p>{message}</p>}
    </div>
  );
}`;

export default function WebGameTutorial() {
  return (
    <TutorialLayout
      title="Building a Web Game with JavaScript"
      description="Learn how to create an interactive number guessing game using JavaScript and React. This tutorial covers game logic, state management, and user interface design."
      duration="1-2 hours"
      difficulty="Beginner"
    >
      <div className="space-y-8">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-muted-foreground">
            In this tutorial, we'll create a number guessing game where players try to guess a random number between 1 and 100. We'll learn about:
          </p>
          <ul className="list-disc list-inside mt-2 text-muted-foreground">
            <li>Game logic and state management</li>
            <li>User input handling</li>
            <li>Conditional rendering</li>
            <li>Event handling</li>
          </ul>
        </motion.section>

        {/* Interactive Code Testing */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Try It Out</h2>
          <p className="text-muted-foreground mb-4">
            Let's start with a simple version of the game. Try changing the guess value and see what happens!
          </p>
          <InteractiveEditor
            initialCode={initialCode}
            initialLanguage="javascript"
            height="200px"
          />
        </motion.section>

        {/* Game Logic Implementation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4">Game Logic</h2>
          <p className="text-muted-foreground mb-4">
            Now, let's create a proper game class to handle the game logic:
          </p>
          <CodeBlock code={gameLogicCode} language="javascript" />
        </motion.section>

        {/* User Interface */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">User Interface</h2>
          <p className="text-muted-foreground mb-4">
            Finally, let's create the React component for our game:
          </p>
          <CodeBlock code={uiCode} language="javascript" />
        </motion.section>

        {/* Next Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          <p className="text-muted-foreground">
            Try these enhancements to make the game more engaging:
          </p>
          <ul className="list-disc list-inside mt-2 text-muted-foreground">
            <li>Add a maximum number of attempts</li>
            <li>Include a score system</li>
            <li>Add animations for correct/incorrect guesses</li>
            <li>Implement difficulty levels</li>
            <li>Add sound effects</li>
          </ul>
        </motion.section>
      </div>
    </TutorialLayout>
  );
} 