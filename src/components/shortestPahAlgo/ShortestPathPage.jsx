import React, { useState } from "react";
import { CanvasShortestPath } from "./CanvasShortestPath";
import { CodeDisplayShortestPath } from "./CodeDisplayShortestPath";
import { MenuSelectNodesShortestPath } from "./MenuSelectNodesShortestPath";
import { MenuSetAlgoShortestPath } from "./MenuSetAlgoShortestPath";

export const ShortestPathPage = () => {
  const [algorithm, setAlgorithm] = useState(null);
  const [source, setSource] = useState(null);
  const [target, setTarget] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row p-4 bg-slate-50 min-h-screen">
      {/* Left Panel: Controls */}
      <div className="w-full lg:w-1/4 xl:w-1/5 p-4 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-slate-900 border-b pb-2">
          Controls
        </h2>
        <MenuSetAlgoShortestPath setAlgorithm={setAlgorithm} />
        <MenuSelectNodesShortestPath
          setSource={setSource}
          setTarget={setTarget}
        />
      </div>

      {/* Right Panel: Visualization and Code */}
      <div className="w-full lg:w-3/4 xl:w-4/5 mt-4 lg:mt-0 lg:ml-4">
        <CanvasShortestPath
          algorithm={algorithm}
          source={source}
          target={target}
        />
        <CodeDisplayShortestPath algorithm={algorithm} />
      </div>
    </div>
  );
};
