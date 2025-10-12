import React from "react";

export const MenuSelectAlgorithm = ({ algorithm, setAlgorithm }) => {
  const handleSelect = (algo) => {
    setAlgorithm(algo);
  };

  const getButtonClass = (algo) => {
    return `w-full text-sm font-medium py-2 px-4 rounded-4xl m-1 transition duration-300 ${
      algorithm === algo
        ? "bg-slate-100 text-black"
        : "bg-stone-950 text-white hover:bg-slate-700"
    }`;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-800">Algorithm</h3>
      <div className="flex flex-col">
        <button
          onClick={() => handleSelect("bfs")}
          className={getButtonClass("bfs")}
        >
          Breadth-First Search (BFS)
        </button>
        <button
          onClick={() => handleSelect("dfs")}
          className={getButtonClass("dfs")}
        >
          Depth-First Search (DFS)
        </button>
      </div>
    </div>
  );
};
