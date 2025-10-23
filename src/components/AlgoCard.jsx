import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AlgoCard({
  title,
  description,
  color = 'bg-yellow-100',
  link,
  time = 1,
}) {
  const navigate = useNavigate()
  return (
    <motion.div
      className={`max-w-sm rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ${color}`}
      initial={{ opacity: 0, y: 20 }} // Start: invisible and 20px down
      animate={{ opacity: 1, y: 0 }} // End: fully visible at original position
      transition={{ duration: time, ease: 'easeInOut' }} // Animation settings
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
      <div className="bg-yellow-200 px-6 py-3 flex justify-end">
        <button
          className="text-sm font-semibold text-yellow-800 hover:text-yellow-900 transition-colors hover:cursor-pointer"
          onClick={() => navigate(link)}
        >
          Explore
        </button>
      </div>
    </motion.div>
  )
}
