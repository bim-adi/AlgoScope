import { useState } from 'react'
import LinearSearch from './LinearSearch'
import BinarySearch from './BinarySearch'
import { CodeDisplay } from './CodeDisplay'
import { motion } from 'framer-motion'

const ArrayVisualizerPage = () => {
  const [algorithm, setAlgorithm] = useState('linearSearch')

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value)
  }

  return (
    <motion.div
      className="lg:w-full w-auto lg:flex-row p-4 bg-slate-50 min-h-screen shadow-md rounded-2xl backdrop-blur supports-[backdrop-filter]:bg-white/60 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center mb-8">
        <select
          value={algorithm}
          onChange={handleAlgorithmChange}
          className="bg-slate-700 text-white text-sm rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:bg-slate-600"
        >
          <option value="linearSearch">Linear Search</option>
          <option value="binarySearch">Binary Search</option>
        </select>
      </div>
      <div className="w-full h-full m-auto">
        {algorithm === 'linearSearch' && <LinearSearch />}
        {algorithm === 'binarySearch' && <BinarySearch />}
        <CodeDisplay algorithm={algorithm} />
      </div>
    </motion.div>
  )
}

export default ArrayVisualizerPage
