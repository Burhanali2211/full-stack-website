export const CODE_SNIPPETS: Record<string, string> = {
  javascript: `// Example: Simple Todo List
const todos = [];

function addTodo(task) {
  todos.push({ id: Date.now(), task, completed: false });
  console.log(\`Added task: \${task}\`);
  return todos;
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    console.log(\`Toggled task: \${todo.task}\`);
  }
  return todos;
}

// Try it out!
addTodo("Learn JavaScript");
addTodo("Build a project");
console.log("Current todos:", todos);`,

  python: `# Example: Temperature Converter
def celsius_to_fahrenheit(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

def fahrenheit_to_celsius(fahrenheit):
    celsius = (fahrenheit - 32) * 5/9
    return celsius

# Test the conversions
temp_c = 25
temp_f = celsius_to_fahrenheit(temp_c)
print(f"{temp_c}°C is equal to {temp_f}°F")

temp_f = 98.6
temp_c = fahrenheit_to_celsius(temp_f)
print(f"{temp_f}°F is equal to {temp_c}°C")`,

  cpp: `// Example: Fibonacci Sequence
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1)
        return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    cout << "First 10 Fibonacci numbers:" << endl;
    for(int i = 0; i < 10; i++) {
        cout << fibonacci(i) << " ";
    }
    cout << endl;
    return 0;
}`,

  html: `<!-- Example: Modern Card Component -->
<div class="card">
  <img src="https://picsum.photos/300/200" alt="Card image" class="card-image">
  <div class="card-content">
    <h2 class="card-title">Beautiful Card</h2>
    <p class="card-text">
      This is a modern card component with a hover effect.
      Try customizing it!
    </p>
    <button class="card-button">Learn More</button>
  </div>
</div>

<style>
.card {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>`
}; 