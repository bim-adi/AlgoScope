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
  dijkstra: {
    javascript: `function dijkstra(graph, startNode) {
  const distances = {};
  const visited = new Set();
  const pq = [{ node: startNode, distance: 0 }];

  // Initialize distances
  for (const node in graph) {
    distances[node] = Infinity;
  }
  distances[startNode] = 0;

  while (pq.length > 0) {
    // Simple priority queue (for demo)
    pq.sort((a, b) => a.distance - b.distance);
    const { node, distance } = pq.shift();

    if (visited.has(node)) continue;
    visited.add(node);

    for (const neighbor of graph[node]) {
      const newDist = distance + neighbor.weight;
      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        pq.push({ node: neighbor.node, distance: newDist });
      }
    }
  }
  return distances;
}`,
    python: `import heapq

def dijkstra(graph, start_node):
    distances = {node: float('infinity') for node in graph}
    distances[start_node] = 0
    pq = [(0, start_node)]

    while pq:
        current_distance, current_node = heapq.heappop(pq)

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances`,
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <limits>

using namespace std;

void dijkstra(const vector<vector<pair<int, int>>>& adj, int startNode) {
    int n = adj.size();
    vector<int> dist(n, numeric_limits<int>::max());
    dist[startNode] = 0;

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, startNode});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    // 'dist' vector now holds the shortest distances
}`,
  },
  bellmanford: {
    javascript: `function bellmanFord(edges, numVertices, startNode) {
  const distances = {};
  for (let i = 1; i <= numVertices; i++) {
    distances[i] = Infinity;
  }
  distances[startNode] = 0;

  for (let i = 0; i < numVertices - 1; i++) {
    for (const edge of edges) {
      if (distances[edge.from] + edge.weight < distances[edge.to]) {
        distances[edge.to] = distances[edge.from] + edge.weight;
      }
    }
  }

  // Check for negative weight cycles
  for (const edge of edges) {
    if (distances[edge.from] + edge.weight < distances[edge.to]) {
      console.error("Graph contains a negative weight cycle");
      return null;
    }
  }

  return distances;
}`,
    python: `def bellman_ford(edges, num_vertices, start_node):
    distances = {i: float('inf') for i in range(1, num_vertices + 1)}
    distances[start_node] = 0

    for _ in range(num_vertices - 1):
        for u, v, w in edges:
            if distances[u] != float('inf') and distances[u] + w < distances[v]:
                distances[v] = distances[u] + w

    # Check for negative weight cycles
    for u, v, w in edges:
        if distances[u] != float('inf') and distances[u] + w < distances[v]:
            print("Graph contains a negative weight cycle")
            return None
            
    return distances`,
    cpp: `#include <iostream>
#include <vector>
#include <limits>

struct Edge { int from, to, weight; };

void bellmanFord(const std::vector<Edge>& edges, int numVertices, int startNode) {
    std::vector<int> dist(numVertices + 1, std::numeric_limits<int>::max());
    dist[startNode] = 0;

    for (int i = 0; i < numVertices - 1; ++i) {
        for (const auto& edge : edges) {
            if (dist[edge.from] != std::numeric_limits<int>::max() && dist[edge.from] + edge.weight < dist[edge.to]) {
                dist[edge.to] = dist[edge.from] + edge.weight;
            }
        }
    }

    // Check for negative cycles
    for (const auto& edge : edges) {
        if (dist[edge.from] != std::numeric_limits<int>::max() && dist[edge.from] + edge.weight < dist[edge.to]) {
            std::cerr << "Graph contains a negative weight cycle!" << std::endl;
            return;
        }
    }
    // 'dist' vector holds the shortest distances
}`,
  },
  floydwarshall: {
    javascript: `function floydWarshall(graph, numVertices) {
  const dist = Array(numVertices + 1).fill(null).map(() => Array(numVertices + 1).fill(Infinity));

  for (let i = 1; i <= numVertices; i++) {
    dist[i][i] = 0;
  }

  for (const u in graph) {
    for (const edge of graph[u]) {
      dist[u][edge.node] = edge.weight;
    }
  }

  for (let k = 1; k <= numVertices; k++) {
    for (let i = 1; i <= numVertices; i++) {
      for (let j = 1; j <= numVertices; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}`,
    python: `def floyd_warshall(graph, num_vertices):
    V = num_vertices
    dist = [[float('inf')] * (V + 1) for _ in range(V + 1)]

    for i in range(1, V + 1):
        dist[i][i] = 0

    for u in graph:
        for v, weight in graph[u].items():
            dist[u][v] = weight

    for k in range(1, V + 1):
        for i in range(1, V + 1):
            for j in range(1, V + 1):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    
    return dist`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>

const int INF = 1e9;

std::vector<std::vector<int>> floydWarshall(const std::vector<std::vector<std::pair<int, int>>>& adj, int numVertices) {
    std::vector<std::vector<int>> dist(numVertices, std::vector<int>(numVertices, INF));

    for (int i = 0; i < numVertices; ++i) {
        dist[i][i] = 0;
    }

    for (int u = 0; u < numVertices; ++u) {
        for (const auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            dist[u][v] = weight;
        }
    }

    for (int k = 0; k < numVertices; ++k) {
        for (int i = 0; i < numVertices; ++i) {
            for (int j = 0; j < numVertices; ++j) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = std::min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    return dist;
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

export const CodeDisplayShortestPath = ({ algorithm }) => {
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState('vscDarkPlus')

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  const handleThemeChange = (e) => {
    setTheme(e.target.value)
  }

  const code = algorithm ? codeSnippets[algorithm]?.[language] : ''

  const getAlgorithmName = (algo) => {
    const names = {
      dijkstra: "Dijkstra's",
      bellmanford: 'Bellman-Ford',
      floydwarshall: 'Floyd-Warshall',
    }
    return names[algo] || algo
  }

  return (
    <div className="mt-8 m-auto p-6 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-slate-700 w-77 md:w-auto lg:w-auto xl:w-auto 2xl:w-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 ml-2">
            {algorithm
              ? `${getAlgorithmName(algorithm)} Implementation`
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
            {code || 'Code for this language is not available.'}
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
            Choose from Dijkstra, Bellman-Ford, or Floyd-Warshall
          </p>
        </div>
      )}
    </div>
  )
}

// Demo App
function Demo() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Shortest Path Algorithms
          </h1>
          <p className="text-slate-400 text-lg">
            Explore implementations of popular shortest path algorithms
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <button
            onClick={() => setSelectedAlgorithm('dijkstra')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedAlgorithm === 'dijkstra'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Dijkstra's Algorithm
          </button>
          <button
            onClick={() => setSelectedAlgorithm('bellmanford')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedAlgorithm === 'bellmanford'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Bellman-Ford Algorithm
          </button>
          <button
            onClick={() => setSelectedAlgorithm('floydwarshall')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedAlgorithm === 'floydwarshall'
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Floyd-Warshall Algorithm
          </button>
        </div>

        <CodeDisplayShortestPath algorithm={selectedAlgorithm} />
      </div>
    </div>
  )
}
