"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, X } from "lucide-react";
import Link from "next/link";

// Enhanced responses with step-by-step guidance
const responses = {
  about: {
    text: "This is an educational platform designed to help you learn programming and web development. We offer tutorials, projects, and interactive learning resources.",
    suggestions: ["Tell me about tutorials", "Show me projects", "How do I get started?"],
  },
  projects: {
    text: "We have several exciting projects available:\n1. Python File Converter\n2. Next.js Educational Platform\n3. React Native Learning App\n\nWhich project interests you?",
    suggestions: ["Python File Converter", "Educational Platform", "Learning App"],
  },
  tutorials: {
    text: "Our tutorials cover various topics including:\n- Python Programming\n- Web Development with Next.js\n- Debugging Applications\n\nWould you like to start a tutorial?",
    suggestions: ["Start Python tutorial", "Learn Next.js", "Debug Python apps"],
  },
  "python tutorial": {
    text: "Great choice! Let's start with Python. Here's what we'll cover:\n1. Basic Python concepts\n2. File handling\n3. Building applications\n\nReady to begin Step 1?",
    suggestions: ["Start Step 1", "Show prerequisites", "Skip to projects"],
  },
  "step 1": {
    text: "Step 1: Python Basics\n\nLet's start with fundamental Python concepts:\n- Variables and data types\n- Control structures\n- Functions\n\nWould you like to see an example?",
    suggestions: ["Show example", "Next step", "Try in playground"],
  },
  example: {
    text: "Here's a simple Python example:\n```python\ndef greet(name):\n    return f'Hello, {name}!'\n\nresult = greet('Developer')\nprint(result)\n```\nWant to try it in our Code Playground?",
    suggestions: ["Open playground", "Next example", "Continue tutorial"],
  },
  playground: {
    text: "I've opened the Code Playground for you! Try modifying the code and click 'Run' to see the results. Need help with anything specific?",
    suggestions: ["How to run code", "Show me tips", "Next lesson"],
  },
  debug: {
    text: "Let's learn about debugging in Python:\n1. Using print statements\n2. Python debugger (pdb)\n3. VS Code debugging\n\nWhich method would you like to explore?",
    suggestions: ["Print debugging", "Use pdb", "VS Code tools"],
  },
  contact: {
    text: "You can reach us through:\n1. The Contact form on our website\n2. Our GitHub repository\n3. Community forums\n\nHow can we help you today?",
    suggestions: ["Open contact form", "Visit GitHub", "Join community"],
  },
  default: {
    text: "I'm here to help you learn! You can:\n1. Start a tutorial\n2. Try our projects\n3. Practice coding\n\nWhat would you like to do?",
    suggestions: ["Show tutorials", "Browse projects", "Open playground"],
  },
};

// Function to find the best matching response
const findResponse = (message: string) => {
  const normalizedMessage = message.toLowerCase();
  
  if (normalizedMessage.includes("step 1") || normalizedMessage.includes("start step")) {
    return responses["step 1"];
  }
  
  if (normalizedMessage.includes("example") || normalizedMessage.includes("show me")) {
    return responses.example;
  }
  
  if (normalizedMessage.includes("playground") || normalizedMessage.includes("try it")) {
    return responses.playground;
  }
  
  if (normalizedMessage.includes("debug") || normalizedMessage.includes("fix") || normalizedMessage.includes("error")) {
    return responses.debug;
  }
  
  if (normalizedMessage.includes("python") && normalizedMessage.includes("tutorial")) {
    return responses["python tutorial"];
  }
  
  if (normalizedMessage.includes("about") || normalizedMessage.includes("what is") || normalizedMessage.includes("purpose")) {
    return responses.about;
  }
  
  if (normalizedMessage.includes("project") || normalizedMessage.includes("portfolio")) {
    return responses.projects;
  }
  
  if (normalizedMessage.includes("tutorial") || normalizedMessage.includes("learn") || normalizedMessage.includes("how to")) {
    return responses.tutorials;
  }
  
  if (normalizedMessage.includes("contact") || normalizedMessage.includes("help") || normalizedMessage.includes("support")) {
    return responses.contact;
  }
  
  return responses.default;
};

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  suggestions?: string[];
};

const hints = {
  'python-basics-step1': 'Try `print("Hello")`!',
  // Add more hints as needed
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your coding assistant. How can I help you today?",
      isUser: false,
      suggestions: ["Start tutorial", "Browse projects", "Get help"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | { preventDefault: () => void }) => {
    e.preventDefault();
    
    // Add null check and type guard for inputValue
    if (typeof inputValue !== 'string') return;
    
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: trimmedInput,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate typing
    setIsTyping(true);
    
    // Simulate API delay and get response
    setTimeout(() => {
      const response = findResponse(trimmedInput);
      const botMessage: Message = {
        id: messages.length + 2,
        text: response.text,
        isUser: false,
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!suggestion) return;
    setInputValue(suggestion);
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-primary p-4 text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
      >
        <Bot className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-96 rounded-lg border bg-background shadow-xl"
          >
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Coding Assistant</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`flex ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        } max-w-[80%]`}
                      >
                        <p className="whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                    {!message.isUser && message.suggestions && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-2 flex flex-wrap gap-2"
                      >
                        {message.suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary hover:bg-primary/20 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex space-x-2 rounded-lg bg-muted px-4 py-2">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                        •
                      </span>
                      <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                        •
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="rounded-md bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </form>
            <button className="btn btn-sm btn-warning mt-2 hover:glow" onClick={() => alert(hints['python-basics-step1'] || 'Keep trying!')}>Stuck?</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 