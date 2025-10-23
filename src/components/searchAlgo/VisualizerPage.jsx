import React, { useState } from 'react'
import { CanvasSearching } from './CanvasSearching'
import { CodeDisplay } from './CodeDisplay'
import { MenuSelectNodeSearch } from './MenuSelectNodeSearch'
import { MenuSelectAlgorithm } from './MenuSelectAlgorithm'
import StatusDisplay from '../StatusDisplay'
import { motion } from 'framer-motion'
import Footer from '../Footer'
import SpeedSlider from '../SpeedSlider'

export const VisualizerPage = () => {
  const [node, setNode] = useState(null)
  const [algorithm, setAlgorithm] = useState(null)
  const [speed, setSpeed] = useState(1.0)

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue)
  }

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
    <>
      <motion.div
        className="lg:w-full w-auto flex flex-col lg:flex-row p-4 bg-slate-50 min-h-screen shadow-md rounded-lg backdrop-blur supports-[backdrop-filter]:bg-white/60 "
        initial={{ opacity: 0, y: 20 }} // Start: invisible and 20px down
        animate={{ opacity: 1, y: 0 }} // End: fully visible at original position
        transition={{ duration: 1, ease: 'easeInOut' }} // Animation settings
      >
        {/* Left Panel: Controls */}
        <div className="w-full lg:w-1/4 xl:w-1/5 p-4 space-y-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-slate-900 border-b pb-2">
            Controls
          </h2>
          <MenuSelectAlgorithm
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
          />
          <MenuSelectNodeSearch setNode={setNode} />
          <SpeedSlider value={speed} onChange={handleSpeedChange} />
        </div>

        {/* Right Panel: Visualization and Code */}
        <div className="w-full xl:w-4/5 mt-4 lg:mt-0 lg:ml-4">
          <CanvasSearching algorithm={algorithm} vertex={node} speed={speed} />
          <CodeDisplay algorithm={algorithm} />
        </div>
      </motion.div>
    </>
  )
}
