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
            className="bg-slate-900 text-white p-4 md:p-8 rounded-2xl"
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

            {algorithm === 'linearSearch' && <LinearSearch />}
            {algorithm === 'binarySearch' && <BinarySearch />}

            <CodeDisplay algorithm={algorithm} />
        </motion.div>
    )
}

export default ArrayVisualizerPage
