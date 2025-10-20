import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneDark,
  dracula,
  tomorrow,
  atomDark,
  coldarkDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const codeSnippets = {
  bfs: {
    javascript: `// Graph represented as an adjacency list
const graph = {
  1: [2, 5, 6], 2: [1, 3, 7], 3: [2, 4, 6],
  4: [3, 5, 6], 5: [1, 4, 6, 9], 6: [1, 3, 4, 5],
  7: [2, 8, 9], 8: [7, 9], 9: [5, 7, 8]
};

function bfs(startNode) {
  const visited = new Set();
  const queue = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node); // Process the current node

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
    python: `from collections import deque

# Graph represented as an adjacency list
graph = {
    1: [2, 5, 6], 2: [1, 3, 7], 3: [2, 4, 6],
    4: [3, 5, 6], 5: [1, 4, 6, 9], 6: [1, 3, 4, 5],
    7: [2, 8, 9], 8: [7, 9], 9: [5, 7, 8]
}

def bfs(start_node):
    visited = set()
    queue = deque([start_node])
    visited.add(start_node)

    while queue:
        node = queue.popleft()
        print(node)  # Process the current node

        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <map>
#include <set>

void bfs(const std::map<int, std::vector<int>>& graph, int startNode) {
    std::set<int> visited;
    std::queue<int> q;

    visited.insert(startNode);
    q.push(startNode);

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        std::cout << node << " "; // Process the current node

        if (graph.count(node)) {
            for (int neighbor : graph.at(node)) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
    }
}`,
  },
  dfs: {
    javascript: `// Graph represented as an adjacency list
const graph = {
  1: [2, 5, 6], 2: [1, 3, 7], 3: [2, 4, 6],
  4: [3, 5, 6], 5: [1, 4, 6, 9], 6: [1, 3, 4, 5],
  7: [2, 8, 9], 8: [7, 9], 9: [5, 7, 8]
};

function dfs(startNode) {
    const visited = new Set();

    function traverse(node) {
        if (visited.has(node)) return;
        visited.add(node);
        console.log(node); // Process the current node

        for (const neighbor of graph[node] || []) {
            traverse(neighbor);
        }
    }

    traverse(startNode);
}`,
    python: `# Graph represented as an adjacency list
graph = {
    1: [2, 5, 6], 2: [1, 3, 7], 3: [2, 4, 6],
    4: [3, 5, 6], 5: [1, 4, 6, 9], 6: [1, 3, 4, 5],
    7: [2, 8, 9], 8: [7, 9], 9: [5, 7, 8]
}

def dfs(start_node):
    visited = set()

    def traverse(node):
        if node in visited:
            return
        visited.add(node)
        print(node) # Process the current node

        for neighbor in graph.get(node, []):
            traverse(neighbor)
    
    traverse(start_node)`,
    cpp: `#include <iostream>
#include <vector>
#include <map>
#include <set>

void dfs_recursive(const std::map<int, std::vector<int>>& graph, int node, std::set<int>& visited) {
    if (visited.count(node)) {
        return;
    }
    visited.insert(node);
    std::cout << node << " "; // Process the current node

    if (graph.count(node)) {
        for (int neighbor : graph.at(node)) {
            dfs_recursive(graph, neighbor, visited);
        }
    }
}

void dfs(const std::map<int, std::vector<int>>& graph, int startNode) {
    std::set<int> visited;
    dfs_recursive(graph, startNode, visited);
}`,
  },
};

const themes = {
  vscDarkPlus: { style: vscDarkPlus, name: "VS Code Dark+" },
  oneDark: { style: oneDark, name: "One Dark" },
  dracula: { style: dracula, name: "Dracula" },
  tomorrow: { style: tomorrow, name: "Tomorrow Night" },
  atomDark: { style: atomDark, name: "Atom Dark" },
  coldarkDark: { style: coldarkDark, name: "Coldark Dark" },
};

export const CodeDisplay = ({ algorithm }) => {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vscDarkPlus");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const code = algorithm ? codeSnippets[algorithm][language] : "";

  return (
    <div className="mt-8 mx-8 p-6 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-slate-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 ml-2">
            {algorithm
              ? `${algorithm.toUpperCase()} Implementation`
              : "Code Viewer"}
          </h3>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="flex-1 sm:flex-none bg-slate-700 text-white text-sm rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:bg-slate-600"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="flex-1 sm:flex-none bg-slate-700 text-white text-sm rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-slate-600"
          >
            {Object.entries(themes).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {algorithm ? (
        <div className="rounded-lg overflow-hidden border border-slate-600 shadow-inner">
          <SyntaxHighlighter
            language={language}
            style={themes[theme].style}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              fontSize: "0.95rem",
              lineHeight: "1.6",
            }}
            showLineNumbers={true}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div className="h-[400px] flex flex-col items-center justify-center text-slate-400 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-600">
          <svg
            className="w-16 h-16 mb-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <p className="text-lg font-medium">
            Select an algorithm to view code
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Choose BFS or DFS from the visualization
          </p>
        </div>
      )}
    </div>
  );
};

// Demo App
// function App() {
//   const [selectedAlgorithm, setSelectedAlgorithm] = useState("bfs");
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
//             Modern Code Viewer
//           </h1>
//           <p className="text-slate-400 text-lg">
//             Select an algorithm to view its implementation in multiple languages
//           </p>
//         </div>
//
//         <div className="flex justify-center gap-4 mb-4">
//           <button
//             onClick={() => setSelectedAlgorithm("bfs")}
//             className={`px-6 py-3 rounded-lg font-semibold transition-all ${
//               selectedAlgorithm === "bfs"
//                 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50"
//                 : "bg-slate-700 text-slate-300 hover:bg-slate-600"
//             }`}
//           >
//             BFS Algorithm
//           </button>
//           <button
//             onClick={() => setSelectedAlgorithm("dfs")}
//             className={`px-6 py-3 rounded-lg font-semibold transition-all ${
//               selectedAlgorithm === "dfs"
//                 ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50"
//                 : "bg-slate-700 text-slate-300 hover:bg-slate-600"
//             }`}
//           >
//             DFS Algorithm
//           </button>
//         </div>
//
//         <CodeDisplay algorithm={selectedAlgorithm} />
//       </div>
//     </div>
//   );
// }
