import React from "react";
import { Link } from "react-router-dom";
import { ShortestPathPage } from "./shortestPahAlgo/ShortestPathPage";

export const Home = () => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Welcome to AlgoScope</h1>
      <p className="text-slate-700 mb-6">Choose a module to explore:</p>
      <ul className="space-y-3">
        <li>
          <Link className="text-blue-600 underline" to="/search">
            Graph Search (BFS/DFS)
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 underline" to="/spath">
            Shortest Path (Dijkstra, Bellman-Ford, Floyd–Warshall)
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 underline" to="/sort">
            Sorting Visualizer
          </Link>
        </li>
      </ul>
      <ShortestPathPage />
    </div>
  );
};
