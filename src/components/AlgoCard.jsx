import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AlgoCard({
  title,
  description,
  color = 'bg-yellow-100',
  link,
  image,
}) {
  const navigate = useNavigate()

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className={`w-full rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden ${color} border border-white/20`}
      variants={cardVariants}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-700 text-sm">{description}</p>
        {image && (
          <div className="mt-4 flex justify-center">
            <img
              src={image}
              alt={`${title} visualization`}
              className="max-w-full h-40 w-auto object-contain rounded-lg"
            />
          </div>
        )}
      </div>
      <div
        className={`px-6 py-3 flex justify-end ${color.replace('100', '200')}`}
      >
        <motion.button
          className="text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white/70 hover:bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-colors duration-200"
          onClick={() => navigate(link)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore →
        </motion.button>
      </div>
    </motion.div>
  )
}
