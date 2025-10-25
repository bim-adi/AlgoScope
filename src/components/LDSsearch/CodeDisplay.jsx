import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  vscDarkPlus,
  oneDark,
  dracula,
  tomorrow,
  atomDark,
  coldarkDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

const codeSnippets = {
  linearSearch: {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    console.log("Checking index:", i);
    if (arr[i] === target) {
      console.log("Found at index:", i);
      return i;
    }
  }
  console.log("Not found");
  return -1;
}

// Example:
linearSearch([3, 5, 2, 8, 4], 8);`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        print("Checking index:", i)
        if arr[i] == target:
            print("Found at index:", i)
            return i
    print("Not found")
    return -1

# Example:
linear_search([3, 5, 2, 8, 4], 8)`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); ++i) {
        cout << "Checking index: " << i << endl;
        if (arr[i] == target) {
            cout << "Found at index: " << i << endl;
            return i;
        }
    }
    cout << "Not found" << endl;
    return -1;
}

// Example:
int main() {
    vector<int> arr = {3, 5, 2, 8, 4};
    linearSearch(arr, 8);
    return 0;
}`,
  },

  binarySearch: {
    javascript: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    console.log("Checking middle index:", mid);

    if (arr[mid] === target) {
      console.log("Found at index:", mid);
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  console.log("Not found");
  return -1;
}

// Example (sorted array required):
binarySearch([1, 2, 3, 4, 5, 6, 7], 5);`,
    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        print("Checking middle index:", mid)

        if arr[mid] == target:
            print("Found at index:", mid)
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    print("Not found")
    return -1

# Example (sorted array required):
binary_search([1, 2, 3, 4, 5, 6, 7], 5)`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        cout << "Checking middle index: " << mid << endl;

        if (arr[mid] == target) {
            cout << "Found at index: " << mid << endl;
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    cout << "Not found" << endl;
    return -1;
}

// Example (sorted array required):
int main() {
    vector<int> arr = {1, 2, 3, 4, 5, 6, 7};
    binarySearch(arr, 5);
    return 0;
}`,
  },
}

const themes = {
  vscDarkPlus: { style: vscDarkPlus, name: 'VS Code Dark+' },
  oneDark: { style: oneDark, name: 'One Dark' },
  dracula: { style: dracula, name: 'Dracula' },
  tomorrow: { style: tomorrow, name: 'Tomorrow Night' },
  atomDark: { style: atomDark, name: 'Atom Dark' },
  coldarkDark: { style: coldarkDark, name: 'Coldark Dark' },
}

export const CodeDisplay = ({ algorithm }) => {
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState('vscDarkPlus')

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  const handleThemeChange = (e) => {
    setTheme(e.target.value)
  }

  const code = algorithm ? codeSnippets[algorithm][language] : ''

  return (
    <div className="mt-8 m-auto p-6 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-slate-700 w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 ml-2">
            {algorithm
              ? `${algorithm.toUpperCase()} Implementation`
              : 'Code Viewer'}
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
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
              padding: '1.5rem',
              fontSize: '0.95rem',
              lineHeight: '1.6',
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
            Choose Linear Search or Binary Search from the visualization
          </p>
        </div>
      )}
    </div>
  )
}
