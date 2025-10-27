import React, { useState } from 'react'
import Visualizer from './Visualizer'
import { motion } from 'framer-motion'

export default function VisualizerPage() {
  const [algorithmType, setAlgorithmType] = useState('simple')

  return (
    <motion.div
      className="lg:w-full w-86 bg-slate-50 mx-auto min-h-screen shadow-lg rounded-2xl  backdrop-blur supports-[backdrop-filter]:bg-white/60 "
      initial={{ opacity: 0, y: 20 }} // Start: invisible and 20px down
      animate={{ opacity: 1, y: 0 }} // End: fully visible at original position
      transition={{ duration: 1, ease: 'easeInOut' }} // Animation settings
    >
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
    </motion.div>
  )
}
