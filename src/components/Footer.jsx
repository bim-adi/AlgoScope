import React from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo2.png'
import githubIcon from '../assets/github-mark-white.svg'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <motion.footer
      className="relative m-auto w-full text-slate-300 overflow-hidden rounded-xl bg-black/40 border-t border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/40 "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
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
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center mr-3 backdrop-blur-sm border border-white/10">
                <img src={logo} alt="" className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                AlgoScope
              </h3>
            </div>
            <p className="text-slate-400 text-sm max-w-xs font-light leading-relaxed">
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
            <h4 className="text-lg font-semibold mb-4 text-white">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {['Sorting', 'Searching', 'Graphs'].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
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
            <h4 className="text-lg font-semibold mb-4 text-white">
              Connect
            </h4>
            <div className="flex flex-col space-y-2">
              <motion.a
                  href="https://github.com/bim-adi/AlgoScope.git"
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={githubIcon} alt="GitHub" className="h-5 w-5 opacity-80 hover:opacity-100" />
                </motion.a>
              <div className="text-sm text-slate-400">
                Maintained by <a className="text-white hover:text-cyan-400 transition-colors" href="https://github.com/Bimbok">bimbok</a> & <a className="text-white hover:text-cyan-400 transition-colors" href="https://github.com/adityapaul26">adityapaul26</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-white/5 bg-black/20 backdrop-blur-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="container mx-auto px-6 py-6 text-center text-xs text-slate-500">
            © 2025 AlgoScope — Open Source Algorithm Visualizer
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
