import React from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo2.png'
import githubIcon from '../assets/github-mark-white.svg'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <motion.footer
      className="relative m-auto w-full bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 text-gray-700 overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-7 h-7 bg-gradient-to-br from-purple-200 to-pink-300 rounded flex items-center justify-center mr-3">
                <img src={logo} alt="" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                AlgoScope
              </h3>
            </div>
            <p className="text-gray-900 text-sm max-w-xs">
              Visualize and understand algorithms with smooth, interactive
              animations.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-3 text-purple-900">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {['Sorting', 'Searching', 'Graphs'].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-900 hover:text-purple-800 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
              <h4 className="text-lg font-semibold mb-3 text-purple-900">
                Connect
              </h4>
              <div className="flex flex-col space-x-4">
                {['GitHub'].map((platform, i) => (
                  <motion.a
                    key={platform}
                    href="https://github.com/bim-adi/AlgoScope.git"
                    className="w-9 h-9 bg-black/80 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.1 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <img src={githubIcon} alt="" className="h-5 w-5" />
                  </motion.a>
                ))}
                <a
                  className="font-semibold underline pt-2 pb-2"
                  href="https://github.com/Bimbok"
                >
                  bimbok
                </a>
                <a
                  className="font-semibold underline"
                  href="https://github.com/adityapaul26"
                >
                  adityapaul26
                </a>
                .
              
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-900">
            © 2025 AlgoScope — Made with ❤️ for learners by{' '}
            <a
              className="font-semibold underline"
              href="https://github.com/Bimbok"
            >
              bimbok
            </a>{' '}
            &{' '}
            <a
              className="font-semibold underline"
              href="https://github.com/adityapaul26"
            >
              adityapaul26
            </a>
            .
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
