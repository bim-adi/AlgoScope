import React, { useState } from 'react'
import { CanvasSearching } from './CanvasSearching'
import { CodeDisplay } from './CodeDisplay'
import { MenuSelectNodeSearch } from './MenuSelectNodeSearch'
import { MenuSelectAlgorithm } from './MenuSelectAlgorithm'

export const VisualizerPage = () => {
  const [node, setNode] = useState(null)
  const [algorithm, setAlgorithm] = useState(null)

  const handleStart = () => {
    if (!algorithm || !node) {
      alert('Please select both an algorithm and a starting node.')
      return
    }
    // This example triggers re-render by passing props,
    // but you could also manage a "run" state here if needed.
    console.log(`Starting ${algorithm} from node ${node}`)
  }

  return (
    <div className="max-w-screen flex flex-col lg:flex-row p-4 bg-slate-50 min-h-screen">
      {/* Left Panel: Controls */}
      <div className="w-full lg:w-1/4 xl:w-1/5 p-4 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-slate-900 border-b pb-2">
          Controls
        </h2>
        <MenuSelectAlgorithm
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
        />
        <MenuSelectNodeSearch setNode={setNode} />
      </div>

      {/* Right Panel: Visualization and Code */}
      <div className="w-full xl:w-4/5 mt-4 lg:mt-0 lg:ml-4">
        <CanvasSearching algorithm={algorithm} vertex={node} />
        <CodeDisplay algorithm={algorithm} />
      </div>
    </div>
  )
}
