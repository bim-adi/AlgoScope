import React from "react";
import { Link } from "react-router-dom";
import { ShortestPathPage } from "./shortestPahAlgo/ShortestPathPage";
import AlgoCard from "./AlgoCard";

export const Home = () => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Welcome to AlgoScope</h1>
      <p className="text-slate-700 mb-6">Choose a module to explore:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <AlgoCard
          title="Sorting Algorithms"
          description="Bubble, Merge, Quick, Heap Sort, etc."
          color="bg-blue-100"
          link="/sort"
        />
        <AlgoCard
          title="Searching Algorithms"
          description="BFS, DFS, Binary Search, Linear Search..."
          color="bg-green-100"
          link="/search"
        />
        <AlgoCard
          title="Graph Algorithms"
          description="Dijkstra, Floyd-Warshall, Topological Sort..."
          color="bg-pink-100"
          link="/spath"
        />
        <AlgoCard
          title="Dynamic Programming"
          description="Knapsack, LCS, Matrix Chain Multiplication..."
          color="bg-purple-100"
          link="/"
        />
      </div>
    </div>
  );
};
