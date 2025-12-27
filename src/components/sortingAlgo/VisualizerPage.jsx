import React, { useState } from 'react'
import Visualizer from './Visualizer'
import { motion } from 'framer-motion'

export default function VisualizerPage() {
  const [algorithmType, setAlgorithmType] = useState('simple')

  return (
    <motion.div
      className="lg:w-full w-full bg-slate-950/50 mx-auto min-h-screen shadow-2xl rounded-2xl border border-white/10 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }} // Start: invisible and 20px down
      animate={{ opacity: 1, y: 0 }} // End: fully visible at original position
      transition={{ duration: 1, ease: 'easeInOut' }} // Animation settings
    >
      <div className="flex justify-center p-6 border-b border-white/5">
        <select
          value={algorithmType}
          onChange={(e) => setAlgorithmType(e.target.value)}
          className="w-full max-w-xs bg-slate-900 text-slate-200 text-sm border border-slate-700 rounded-xl pl-4 pr-10 py-3 transition duration-300 focus:outline-none focus:border-cyan-500 hover:border-slate-600 shadow-lg focus:shadow-cyan-500/20 appearance-none cursor-pointer"
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
