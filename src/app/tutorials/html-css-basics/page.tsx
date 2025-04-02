"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Clock, 
  Calendar, 
  User, 
  Copy, 
  Check, 
  MessageCircle,
  X,
  Send,
  Heart,
  Bookmark,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorialShare } from "@/components/tutorial-share";
import { TutorialVideo } from "@/components/tutorial-video";

// Define section type
interface Section {
  id: string;
  title: string;
}

// HTML & CSS Basics Tutorial
export default function HtmlCssBasicsTutorial() {
  // State for interactive elements
  const [activeSection, setActiveSection] = useState("intro");
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [userCode, setUserCode] = useState("<!-- Your HTML & CSS code here -->\n\n");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(78);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Define sections
  const sections: Section[] = [
    { id: "intro", title: "Introduction to HTML & CSS" },
    { id: "html", title: "HTML Basics" },
    { id: "css", title: "CSS Fundamentals" },
    { id: "layout", title: "Layout & Responsive Design" },
    { id: "practice", title: "Practice Exercise" },
    { id: "conclusion", title: "Conclusion" }
  ];

  // Function to mark a section as completed
  const completeSection = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      const newCompletedSections = [...completedSections, sectionId];
      setCompletedSections(newCompletedSections);
      const newProgress = (newCompletedSections.length / sections.length) * 100;
      setProgress(newProgress);
    }
  };

  // Handle like functionality
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-950 to-gray-950 text-white overflow-hidden">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full relative">
        {/* Main content area */}
        <div className="flex-grow">
          {/* Header Section */}
          <header className="pt-28 pb-12 px-4 md:px-8 relative">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-900/50 text-cyan-300 border border-cyan-700/30">
                  HTML
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700/30">
                  CSS
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-900/50 text-teal-300 border border-teal-700/30">
                  Beginner
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-500 bg-clip-text text-transparent">
                  HTML & CSS Fundamentals
                </h1>
                
                <div className="flex items-center gap-3 self-start">
                  <Button 
                    onClick={handleLike}
                    variant="ghost" 
                    size="sm"
                    className={`flex items-center gap-1.5 ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                    <span>{likeCount}</span>
                  </Button>
                  
                  <Button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    variant="ghost" 
                    size="sm"
                    className={`flex items-center gap-1.5 ${isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-yellow-500' : ''}`} />
                    <span className="sr-only md:not-sr-only md:inline-block">
                      {isBookmarked ? 'Saved' : 'Save'}
                    </span>
                  </Button>
                  
                  <div className="relative">
                    <TutorialShare
                      title="HTML & CSS Fundamentals"
                      isOpen={isShareOpen}
                      onClose={() => setIsShareOpen(false)}
                    />
                  </div>
                </div>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mb-6">
                Master the building blocks of the web with HTML for structure and CSS for styling
              </p>

              <div className="flex flex-wrap items-center gap-3 gap-y-2 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1.5" />
                  <span>By Emma Clark</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>Updated April 5, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>22 min read</span>
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
              <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            </div>
          </header>

          {/* Main content */}
          <main className="px-4 sm:px-6 md:px-8 pb-20 pt-4 max-w-5xl mx-auto">
            <div className="p-8 rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-800">
              {/* Video Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Introduction to HTML & CSS</h2>
                
                <TutorialVideo
                  videoId="qz0aGYrrlhU"
                  title="HTML & CSS Tutorial for Beginners"
                />
                
                <p className="text-gray-300 mt-4">
                  HTML (HyperText Markup Language) and CSS (Cascading Style Sheets) are the core building blocks of the web. 
                  HTML provides the structure and content, while CSS controls the presentation and styling of that content.
                  Together, they form the foundation of every website you visit.
                </p>

                <Button 
                  className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white"
                  onClick={() => completeSection("intro")}
                >
                  Mark Introduction Complete
                </Button>
              </div>

              {/* HTML Basics Section */}
              <div className="mb-8 pt-6 border-t border-gray-800">
                <h2 className="text-2xl font-bold mb-4">HTML Basics</h2>
                
                <p className="text-gray-300 mb-4">
                  HTML uses elements (tags) to define the structure and content of a web page. Elements are enclosed in angle brackets and often come in pairs with opening and closing tags.
                </p>
                
                {/* HTML Structure Example */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Basic HTML Structure</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4 relative group">
                    <div className="absolute right-3 top-3">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(
                            "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My First Web Page</title>\n</head>\n<body>\n  <header>\n    <h1>Welcome to My Website</h1>\n    <nav>\n      <ul>\n        <li><a href=\"#\">Home</a></li>\n        <li><a href=\"#\">About</a></li>\n        <li><a href=\"#\">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  \n  <main>\n    <section>\n      <h2>About Us</h2>\n      <p>This is a paragraph about our company.</p>\n    </section>\n    \n    <section>\n      <h2>Our Services</h2>\n      <ul>\n        <li>Web Design</li>\n        <li>Development</li>\n        <li>Hosting</li>\n      </ul>\n    </section>\n  </main>\n  \n  <footer>\n    <p>&copy; 2025 My Website. All rights reserved.</p>\n  </footer>\n</body>\n</html>"
                          );
                          setCodeCopied(true);
                          setTimeout(() => setCodeCopied(false), 2000);
                        }} 
                        className="p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400"
                      >
                        {codeCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    <pre className="text-cyan-300 font-mono text-sm overflow-x-auto"><code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section>
      <h2>About Us</h2>
      <p>This is a paragraph about our company.</p>
    </section>
    
    <section>
      <h2>Our Services</h2>
      <ul>
        <li>Web Design</li>
        <li>Development</li>
        <li>Hosting</li>
      </ul>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2025 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    The above example shows a complete HTML document structure with semantic elements like <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">&lt;header&gt;</code>, 
                    <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">&lt;main&gt;</code>, 
                    <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">&lt;section&gt;</code>, and 
                    <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">&lt;footer&gt;</code>.
                  </p>
                </div>
                
                {/* Common HTML Elements */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Common HTML Elements</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <pre className="text-cyan-300 font-mono text-sm overflow-x-auto"><code>{`<!-- Headings -->
<h1>This is a level 1 heading</h1>
<h2>This is a level 2 heading</h2>
<h3>This is a level 3 heading</h3>

<!-- Paragraphs -->
<p>This is a paragraph of text.</p>

<!-- Links -->
<a href="https://example.com">This is a link</a>

<!-- Images -->
<img src="image.jpg" alt="Description of the image">

<!-- Lists -->
<ul>
  <li>Unordered list item 1</li>
  <li>Unordered list item 2</li>
</ul>

<ol>
  <li>Ordered list item 1</li>
  <li>Ordered list item 2</li>
</ol>

<!-- Forms -->
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">
  <button type="submit">Submit</button>
</form>

<!-- Tables -->
<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Row 1, Cell 1</td>
    <td>Row 1, Cell 2</td>
  </tr>
</table>`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    These are some of the most commonly used HTML elements. Each serves a specific purpose in structuring and presenting content on the web.
                  </p>

                  <Button 
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => completeSection("html")}
                  >
                    Mark HTML Basics Complete
                  </Button>
                </div>
              </div>

              {/* CSS Fundamentals Section */}
              <div className="mb-8 pt-6 border-t border-gray-800">
                <h2 className="text-2xl font-bold mb-4">CSS Fundamentals</h2>
                
                <p className="text-gray-300 mb-4">
                  CSS (Cascading Style Sheets) is used to style HTML elements. It controls the look and feel of a website including layout, colors, fonts, and more.
                </p>
                
                {/* CSS Syntax Example */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">CSS Syntax & Selectors</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4 relative group">
                    <div className="absolute right-3 top-3">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(
                            "/* CSS Selector Types */\n\n/* Element Selector */\nbody {\n  font-family: 'Arial', sans-serif;\n  line-height: 1.6;\n  color: #333;\n  background-color: #f4f4f4;\n  margin: 0;\n  padding: 0;\n}\n\nheader {\n  background-color: #35424a;\n  color: white;\n  padding: 20px;\n  text-align: center;\n}\n\n/* ID Selector (use # symbol) */\n#main-content {\n  width: 80%;\n  margin: auto;\n  padding: 20px;\n}\n\n/* Class Selector (use . symbol) */\n.card {\n  background-color: white;\n  border-radius: 5px;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n  padding: 15px;\n  margin-bottom: 20px;\n}\n\n/* Descendant Selector */\n.card h3 {\n  color: #35424a;\n  margin-top: 0;\n}\n\n/* Pseudo-class Selector */\na:hover {\n  color: #e8491d;\n  text-decoration: none;\n}"
                          );
                          setCodeCopied(true);
                          setTimeout(() => setCodeCopied(false), 2000);
                        }} 
                        className="p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400"
                      >
                        {codeCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    <pre className="text-blue-300 font-mono text-sm overflow-x-auto"><code>{`/* CSS Selector Types */

/* Element Selector */
body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

header {
  background-color: #35424a;
  color: white;
  padding: 20px;
  text-align: center;
}

/* ID Selector (use # symbol) */
#main-content {
  width: 80%;
  margin: auto;
  padding: 20px;
}

/* Class Selector (use . symbol) */
.card {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 15px;
  margin-bottom: 20px;
}

/* Descendant Selector */
.card h3 {
  color: #35424a;
  margin-top: 0;
}

/* Pseudo-class Selector */
a:hover {
  color: #e8491d;
  text-decoration: none;
}`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    CSS uses selectors to target HTML elements and apply styles to them. The example above demonstrates different types of selectors 
                    including element selectors, class selectors, ID selectors, and pseudo-class selectors.
                  </p>
                </div>
                
                {/* CSS Box Model */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">The CSS Box Model</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <pre className="text-blue-300 font-mono text-sm overflow-x-auto"><code>{`/* Box Model Properties */

.box {
  /* Content dimensions */
  width: 300px;
  height: 200px;
  
  /* Padding (inner space) */
  padding: 20px;
  
  /* Border */
  border: 2px solid #333;
  border-radius: 10px;
  
  /* Margin (outer space) */
  margin: 30px;
  
  /* Alternative shorthand for each side */
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  
  /* Shorthand notation (top, right, bottom, left) */
  padding: 10px 20px 10px 20px;
  
  /* Box-sizing property changes how width and height are calculated */
  box-sizing: border-box; /* includes padding and border in the element's total width and height */
}`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    The CSS Box Model describes how elements are rendered as rectangular boxes. Each box has content, padding, a border, and margin. 
                    Understanding the box model is crucial for layout and spacing in CSS.
                  </p>

                  <Button 
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => completeSection("css")}
                  >
                    Mark CSS Fundamentals Complete
                  </Button>
                </div>
              </div>

              {/* Layout & Responsive Design Section */}
              <div className="mb-8 pt-6 border-t border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Layout & Responsive Design</h2>
                
                <p className="text-gray-300 mb-4">
                  Creating layouts in CSS has evolved significantly. Modern techniques like Flexbox and CSS Grid make it easier to create 
                  complex layouts that adapt to different screen sizes.
                </p>
                
                {/* Flexbox Example */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Flexbox Layout</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <pre className="text-blue-300 font-mono text-sm overflow-x-auto"><code>{`.flex-container {
  display: flex;
  flex-direction: row; /* default: horizontal layout */
  flex-wrap: wrap; /* allows items to wrap to next line if needed */
  justify-content: space-between; /* horizontal alignment */
  align-items: center; /* vertical alignment */
  gap: 20px; /* spacing between items */
}

.flex-item {
  flex: 1; /* grow and shrink equally */
  /* or set specific flex behavior */
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 200px; /* base width */
}

/* Making a common card layout with flexbox */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 0 1 calc(33.333% - 20px); /* responsive 3-column layout */
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    Flexbox is designed for one-dimensional layouts (rows or columns). It's perfect for navigation bars, card layouts, 
                    centering elements, and creating equally sized columns.
                  </p>
                </div>
                
                {/* CSS Grid Example */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">CSS Grid Layout</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <pre className="text-blue-300 font-mono text-sm overflow-x-auto"><code>{`.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equally sized columns */
  grid-template-rows: auto auto; /* 2 rows, sized according to content */
  gap: 20px; /* spacing between grid items */
}

/* Specific grid item placement */
.header {
  grid-column: 1 / -1; /* span all columns */
}

.sidebar {
  grid-row: 2 / 4; /* span from row 2 to 4 */
}

.main-content {
  grid-column: 2 / 4; /* span from column 2 to 4 */
  grid-row: 2 / 3; /* span from row 2 to 3 */
}

/* Responsive grid with media queries */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* single column on small screens */
  }
  
  .sidebar, .main-content {
    grid-column: 1; /* reset column spans */
    grid-row: auto; /* reset row spans */
  }
}`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    CSS Grid is designed for two-dimensional layouts (rows and columns simultaneously). It's excellent for overall page layouts, 
                    complex grid systems, and placing elements in precise positions.
                  </p>

                  <Button 
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => completeSection("layout")}
                  >
                    Mark Layout Section Complete
                  </Button>
                </div>
              </div>
              
              {/* Practice Section */}
              <div className="mb-8 pt-6 border-t border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Practice Exercise</h2>
                
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-xl font-semibold mb-3">Try It Yourself</h3>
                  
                  <p className="text-gray-300 mb-4">
                    Create a simple product card using HTML and CSS. The card should include a product image, title, description, price, and a "Buy Now" button.
                    Use flexbox for the layout and add hover effects to enhance the user experience.
                  </p>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <textarea
                      className="w-full h-40 bg-transparent text-cyan-300 font-mono text-sm focus:outline-none resize-none"
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="<!-- Write your HTML & CSS code here -->"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      className="bg-cyan-600 hover:bg-cyan-700 text-white"
                      onClick={() => completeSection("practice")}
                    >
                      Run Code
                    </Button>
                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Resources and Next Steps */}
              <div className="pt-6 border-t border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <a 
                    href="https://developer.mozilla.org/en-US/docs/Web/HTML" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-cyan-900/50 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200">MDN HTML Documentation</h4>
                      <p className="text-sm text-gray-400">Mozilla Developer Network</p>
                    </div>
                  </a>
                  
                  <a 
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200">MDN CSS Documentation</h4>
                      <p className="text-sm text-gray-400">Mozilla Developer Network</p>
                    </div>
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/tutorials/javascript-basics" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/70 hover:bg-gray-900 border border-gray-800 rounded-lg transition-colors"
                  >
                    <span>JavaScript Basics</span>
                  </Link>
                  
                  <Link 
                    href="/tutorials/css-flexbox-grid" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/70 hover:bg-gray-900 border border-gray-800 rounded-lg transition-colors"
                  >
                    <span>Advanced CSS: Flexbox & Grid</span>
                  </Link>
                </div>
                
                <Button 
                  className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white"
                  onClick={() => completeSection("conclusion")}
                >
                  Complete Tutorial
                </Button>
              </div>
            </div>
          </main>
        </div>
        
        {/* Sidebar - desktop */}
        <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 p-4">
          <div className="sticky top-24 w-full">
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800/50 rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Table of Contents</h3>
                <div className="w-10 h-10 rounded-full bg-cyan-900/50 border border-cyan-500/30 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium relative"
                    style={{
                      background: `conic-gradient(theme(colors.cyan.500) ${progress}%, transparent 0)`,
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-950 flex items-center justify-center">
                      {Math.round(progress)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <nav className="space-y-1">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left ${
                      activeSection === section.id
                        ? "bg-cyan-900/30 text-cyan-300"
                        : "text-gray-400 hover:text-gray-300"
                    } ${
                      completedSections.includes(section.id)
                        ? "border-l-2 border-green-500"
                        : ""
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </Button>
                ))}
              </nav>
              
              <div className="mt-6 p-3 rounded-lg bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-800/30">
                <h4 className="font-medium text-sm mb-2">Prerequisites</h4>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li className="flex items-start">
                    <Check className="h-3.5 w-3.5 text-cyan-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>Basic computer skills</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3.5 w-3.5 text-cyan-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>Text editor (VSCode recommended)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3.5 w-3.5 text-cyan-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>Understanding of file systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Table of Contents - bottom sheet */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
          <div 
            className={`${
              isMobileNavOpen 
                ? "translate-y-0" 
                : "translate-y-full"
            } transform transition-transform duration-300 ease-in-out`}
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 rounded-t-xl shadow-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Table of Contents</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full h-8 w-8 p-0"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 items-center text-xs text-gray-400">
                  <div className="w-6 h-6 rounded-full bg-cyan-900/50 border border-cyan-500/30 flex items-center justify-center text-xs">
                    {Math.round(progress)}%
                  </div>
                  <span>Complete</span>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                  onClick={() => {
                    const nextSection = sections.find(
                      (s) => !completedSections.includes(s.id)
                    );
                    if (nextSection) setActiveSection(nextSection.id);
                  }}
                >
                  Continue Learning
                </Button>
              </div>
              
              <nav className="grid grid-cols-2 gap-1 max-h-60 overflow-y-auto">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    size="sm"
                    className={`justify-start text-left text-sm ${
                      activeSection === section.id
                        ? "bg-cyan-900/30 text-cyan-300"
                        : "text-gray-400"
                    } ${
                      completedSections.includes(section.id)
                        ? "border-l-2 border-green-500"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMobileNavOpen(false);
                    }}
                  >
                    {section.title}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Mobile Navigation Tab */}
          <Button
            className="mx-auto -mt-3 flex items-center justify-center gap-1 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-full shadow-lg px-4 py-1 text-sm relative z-10"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            <span>Contents</span>
            <div className="w-5 h-5 rounded-full bg-cyan-900/80 border border-cyan-500/30 flex items-center justify-center text-[10px]">
              {Math.round(progress)}%
            </div>
          </Button>
        </div>
      </div>
      
      {/* Chat bubble for mobile */}
      <div className="fixed bottom-16 right-4 z-40">
        <Button
          size="icon"
          className={`h-12 w-12 rounded-full shadow-lg ${
            isChatOpen
              ? "bg-red-600 hover:bg-red-700"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )}
        </Button>
        
        {isChatOpen && (
          <div className="absolute bottom-16 right-0 w-72 sm:w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-3">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-sm">Learning Assistant</h4>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 rounded-full p-0"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            <div className="h-64 overflow-y-auto bg-gray-950 rounded-md p-3 mb-3 text-sm">
              <div className="flex gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-cyan-600 flex-shrink-0 flex items-center justify-center text-xs">
                  AI
                </div>
                <div className="bg-gray-900 rounded-lg p-2 text-gray-300">
                  <p>Hello! I'm your HTML and CSS learning assistant. How can I help you with your web development journey?</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Ask a question..."
                className="w-full bg-gray-950 rounded-md border border-gray-800 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-6 w-6 rounded-md bg-cyan-600"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 