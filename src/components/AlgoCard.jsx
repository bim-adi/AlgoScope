import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AlgoCard({
    title,
    description,
    color = 'bg-yellow-100',
    link,
    time = 1,
    image
}) {
    const navigate = useNavigate()
    return (
        <motion.div
            className={`w-full rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${color} border border-white/20`}
            initial={{ opacity: 0, y: 20 }} // Start: invisible and 20px down
            animate={{ opacity: 1, y: 0 }} // End: fully visible at original position
            transition={{ duration: time, ease: 'easeInOut' }} // Animation settings
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
            <div className={`px-6 py-3 flex justify-end ${color.replace('100', '200')}`}>
                <button
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white/70 hover:bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                    onClick={() => navigate(link)}
                >
                    Explore →
                </button>
            </div>
        </motion.div>
    )
}
