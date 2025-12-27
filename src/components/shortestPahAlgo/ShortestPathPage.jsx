import React, { useState } from 'react'
import { CanvasShortestPath } from './CanvasShortestPath'
import { CodeDisplayShortestPath } from './CodeDisplayShortestPath'
import { MenuSelectNodesShortestPath } from './MenuSelectNodesShortestPath'
import { MenuSetAlgoShortestPath } from './MenuSetAlgoShortestPath'
import { motion } from 'framer-motion'
import SpeedSlider from '../SpeedSlider'

export const ShortestPathPage = () => {
  const [algorithm, setAlgorithm] = useState(null)
  const [source, setSource] = useState(null)
  const [target, setTarget] = useState(null)
  const [speed, setSpeed] = useState(1.0)

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue)
  }

  return (
    <motion.div
      className="lg:w-full w-auto flex flex-col lg:flex-row p-6 bg-slate-950/50 min-h-screen rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }} // Start: invisible and 20px down
      animate={{ opacity: 1, y: 0 }} // End: fully visible at original position
      transition={{ duration: 1, ease: 'easeInOut' }} // Animation settings
    >
      {/* Left Panel: Controls */}
      <div className="w-full lg:w-1/4 xl:w-1/5 p-6 space-y-6 bg-slate-900/80 shadow-xl rounded-xl border border-white/5 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-center text-white border-b border-white/10 pb-4 tracking-tight">
          Controls
        </h2>
        <MenuSetAlgoShortestPath setAlgorithm={setAlgorithm} />
        <MenuSelectNodesShortestPath
          setSource={setSource}
          setTarget={setTarget}
        />
        <div className="m-auto w-full">
          <SpeedSlider value={speed} onChange={handleSpeedChange} />
        </div>
      </div>

      {/* Right Panel: Visualization and Code */}
      <div className="w-full lg:w-3/4 xl:w-4/5 mt-4 lg:mt-0 lg:ml-6 flex flex-col gap-6">
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <CanvasShortestPath
            algorithm={algorithm}
            source={source}
            target={target}
            speed={speed}
          />
        </div>
        <CodeDisplayShortestPath algorithm={algorithm} />
      </div>
    </motion.div>
  )
}
