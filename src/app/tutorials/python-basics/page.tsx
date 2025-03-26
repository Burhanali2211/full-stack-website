"use client";

import TutorialLayout from "@/components/tutorial-layout";
import CodeBlock from "@/components/code-block";
import InteractiveEditor from "@/components/interactive-editor";
import { motion } from "framer-motion";
import Link from "next/link";

const helloWorldCode = `# Your first Python program
print("Hello, World!")

# Using variables
name = "Developer"
print(f"Hello, {name}!")`;

const dataTypesCode = `# Numbers
age = 25              # integer
height = 1.75         # float
is_student = True     # boolean

# Strings
name = "Alice"
message = 'Python is fun!'
multiline = """
This is a
multiline string
"""

# Lists
fruits = ["apple", "banana", "orange"]
fruits.append("grape")
print(fruits[0])      # prints "apple"

# Dictionaries
person = {
    "name": "Bob",
    "age": 30,
    "city": "New York"
}
print(person["name"]) # prints "Bob"`;

const controlFlowCode = `# If statements
age = 18
if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# For loops
for fruit in ["apple", "banana", "orange"]:
    print(f"I like {fruit}")

# While loops
count = 0
while count < 5:
    print(count)
    count += 1`;

const functionsCode = `# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameter
def power(base, exponent=2):
    return base ** exponent

# Function with multiple returns
def divide(a, b):
    if b == 0:
        return None, "Cannot divide by zero"
    return a / b, None

# Using the functions
print(greet("Alice"))           # Hello, Alice!
print(power(3))                 # 9 (3^2)
print(power(2, 3))             # 8 (2^3)
result, error = divide(10, 2)   # result = 5, error = None`;

const interactiveCode = `# Try writing your first Python code!
name = input("What&apos;s your name? ")
print(f"Hello, {name}! Welcome to Python!")

# Let&apos;s do some math
number = 42
squared = number ** 2
print(f"The square of {number} is {squared}")`;

export default function PythonBasicsTutorial() {
  return (
    <TutorialLayout
      title="Python Basics for Tech Newbies"
      description="Start your programming journey with Python! Learn the fundamentals of Python programming through simple, practical examples."
      difficulty="Beginner"
      duration="2-3 hours"
      githubUrl="https://github.com/yourusername/python-basics"
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-4">Welcome to Python!</h2>
        <p className="mb-6">
          Python is one of the most popular programming languages, known for its simplicity and 
          readability. It&apos;s perfect for beginners and powerful enough for experts. In this tutorial, 
          we&apos;ll cover the basic concepts you need to start programming in Python.
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
          Let&apos;s write your first Python code! Edit the code below and click "Run" to see what happens:
          <Link href="/playground" className="text-primary hover:underline ml-2">
            (or try our full-featured Code Playground)
          </Link>
        </p>
        <InteractiveEditor
          initialCode={interactiveCode}
          initialLanguage="python"
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Your First Python Program</h2>
        <p className="mb-4">
          Let&apos;s start with the traditional "Hello, World!" program and learn about variables:
        </p>
        <CodeBlock code={helloWorldCode} language="python" />
        <p className="mt-4">
          This simple example shows how to use the print function and create variables. The f-string 
          (formatted string) allows us to embed expressions inside string literals.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Data Types in Python</h2>
        <p className="mb-4">
          Python has several built-in data types. Here are the most common ones:
        </p>
        <CodeBlock code={dataTypesCode} language="python" />
        <p className="mt-4">
          Understanding data types is crucial as they determine what operations you can perform on 
          your data. Python&apos;s dynamic typing means you don&apos;t need to declare variable types explicitly.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Control Flow</h2>
        <p className="mb-4">
          Control flow statements help you control the execution of your code:
        </p>
        <CodeBlock code={controlFlowCode} language="python" />
        <p className="mt-4">
          Control flow statements let you make decisions (if/elif/else) and repeat actions (for/while 
          loops). Python uses indentation to define blocks of code, making it very readable.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Functions</h2>
        <p className="mb-4">
          Functions help you organize and reuse code:
        </p>
        <CodeBlock code={functionsCode} language="python" />
        <p className="mt-4">
          Functions are blocks of reusable code that perform specific tasks. They can take parameters, 
          have default values, and return results. Good function design is key to writing maintainable code.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <p className="mb-4">
          Now that you know the basics, here&apos;s what to learn next:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Object-Oriented Programming in Python</li>
          <li>Working with Files</li>
          <li>Error Handling with try/except</li>
          <li>Python Standard Library</li>
          <li>Installing and Using External Packages</li>
        </ul>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10"
      >
        <h3 className="text-xl font-semibold mb-2">💡 Pro Tip</h3>
        <p>
          Practice is key in programming! Try to modify the examples and experiment with different 
          values. The best way to learn is by writing code and making mistakes. Use online platforms 
          like repl.it to practice without installing anything.
        </p>
      </motion.div>
    </TutorialLayout>
  );
} 