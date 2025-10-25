import React, { useState } from 'react'
import LinearSearch from './LinearSearch'
import BinarySearch from './BinarySearch'
import { CodeDisplay } from './CodeDisplay'

const VisualizerPage = () => {
  const [algorithm, setAlgorithm] = useState('linearSearch')

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value)
  }

  return (
    <>
      <div className="p-4 flex justify-center">
        <select
          value={algorithm}
          onChange={handleAlgorithmChange}
          className="bg-slate-700 text-white text-sm rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:bg-slate-600"
        >
          <option value="linearSearch">Linear Search</option>
          <option value="binarySearch">Binary Search</option>
        </select>
      </div>

      {algorithm === 'linearSearch' && <LinearSearch />}
      {algorithm === 'binarySearch' && <BinarySearch />}

      <CodeDisplay algorithm={algorithm} />
    </>
  )
}

export default VisualizerPage