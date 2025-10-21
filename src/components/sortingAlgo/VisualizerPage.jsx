import React, { useState } from 'react'
import Visualizer from './Visualizer'

export default function VisualizerPage() {
  const [algorithmType, setAlgorithmType] = useState('simple')

  return (
    <div className="max-w-screen bg-slate-50 mx-auto min-h-screen shadow-md rounded-lg">
      <div className="flex justify-center p-4">
        <select
          value={algorithmType}
          onChange={(e) => setAlgorithmType(e.target.value)}
          className="w-full max-w-xs bg-transparent text-slate-800 text-sm border border-slate-600 rounded pl-3 pr-8 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
        >
          <option value="simple">Simple Sorts</option>
          <option value="complex">Complex Sorts</option>
          <option value="integer">Integer Sorts</option>
        </select>
      </div>
      <Visualizer algorithmType={algorithmType} />
    </div>
  )
}
