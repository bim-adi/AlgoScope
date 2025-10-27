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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
      },
    },
  }

  const glowVariants = {
    hover: {
      boxShadow: `0 0 20px 5px ${color.replace('bg-', 'var(--glow-')})`,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      className={`w-full rounded-3xl shadow-lg overflow-hidden border border-white/10 backdrop-blur-sm ${color}`}
      style={{ '--glow-color': 'rgba(255, 255, 255, 0.5)' }}
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-800 text-base">{description}</p>
        {image && (
          <motion.div
            className="mt-4 flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              alt={`${title} visualization`}
              className="max-w-full h-48 w-auto object-contain rounded-lg"
            />
          </motion.div>
        )}
      </div>
      <div
        className={`px-6 py-4 flex justify-end relative bottom-0 bg-white/20`}
      >
        <motion.button
          className="text-base font-semibold text-gray-800 bg-white/80 hover:bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => navigate(link)}
          whileHover={{ scale: 1.1, y: -2, ...glowVariants.hover }}
          whileTap={{ scale: 0.9 }}
          variants={glowVariants}
        >
          Explore Now
        </motion.button>
      </div>
    </motion.div>
  )
}
