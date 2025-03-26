"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ProjectLayout from "@/components/project-layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const GameDemo = () => {
  const [secretNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = useCallback(() => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setMessage("Please enter a valid number between 1 and 100");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (guessNum === secretNumber) {
      setMessage(`Congratulations! You found the number in ${attempts + 1} attempts!`);
      setGameOver(true);
    } else if (guessNum < secretNumber) {
      setMessage("Too low! Try a higher number.");
    } else {
      setMessage("Too high! Try a lower number.");
    }
    setGuess("");
  }, [guess, secretNumber, attempts]);

  const resetGame = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Number Guessing Game</h3>
      <p className="text-muted-foreground mb-4">
        Guess a number between 1 and 100. I&apos;ll tell you if it&apos;s too high or too low!
      </p>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            min={1}
            max={100}
            disabled={gameOver}
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
          />
          <Button onClick={handleGuess} disabled={gameOver}>
            Guess
          </Button>
        </div>

        {message && (
          <Alert variant={gameOver ? "default" : "outline"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Attempts: {attempts}</span>
          <Button variant="ghost" size="sm" onClick={resetGame}>
            <RefreshCw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function WebGameProject() {
  return (
    <ProjectLayout
      title="Number Guessing Game"
      description="An interactive web game built with React and TypeScript, demonstrating state management, user input handling, and modern UI design principles."
    >
      <div className="space-y-8">
        {/* Project Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-muted-foreground">
            This project showcases a simple yet engaging number guessing game that
            demonstrates key concepts in web development, including state management,
            user input validation, and responsive design. The game features a clean
            interface, immediate feedback, and game statistics tracking.
          </p>
        </section>

        {/* Live Demo */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Live Demo</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GameDemo />
          </motion.div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The game generates a random number between 1 and 100 when initialized.
              Players input their guesses, and the game provides feedback on whether
              the guess is too high or too low. The game tracks the number of
              attempts and displays a success message when the correct number is
              guessed.
            </p>
            <h3 className="text-lg font-semibold text-foreground">Key Features:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Random number generation</li>
              <li>Input validation and error handling</li>
              <li>Immediate feedback on guesses</li>
              <li>Attempt tracking</li>
              <li>Game reset functionality</li>
              <li>Responsive design</li>
            </ul>
          </div>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "Radix UI",
              "Next.js",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Implementation Details */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Implementation Details</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The game is implemented using React hooks for state management,
              including useState for game state and useCallback for memoized event
              handlers. TypeScript ensures type safety throughout the application,
              while Tailwind CSS and Radix UI components provide a polished,
              accessible interface.
            </p>
            <p>
              The project demonstrates best practices in React development,
              including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Component composition and reusability</li>
              <li>Proper state management</li>
              <li>Event handling and user input validation</li>
              <li>Accessibility considerations</li>
              <li>Responsive design principles</li>
            </ul>
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
} 