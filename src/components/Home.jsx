import React from 'react'
import AlgoCard from './AlgoCard'
import SortingImg from '../assets/Picture1.png'
import SearchingImg from '../assets/bfs_dfs.png'
import LinearSearchImg from '../assets/new-arr.png'
import GraphAlgoImg from '../assets/graph.png'
import { motion } from 'framer-motion'
import About from './about/About'

const title = 'Welcome to AlgoScope'
const subtitle = 'Your ultimate guide to algorithm visualization.'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const charVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 90,
    },
  },
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: title.length * 0.08 + 0.6,
      duration: 0.6,
    },
  },
}

export const Home = () => {
  return (
    <div className="min-h-screen w-full bg-white-900 text-white overflow-hidden">
      <div className="text-center p-8 mt-25 mb-15">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 bitcount-grid-single"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0, 0.8, 0.2, 1, 0.9, 1],
            textShadow: [
              '0 0 0px rgba(0,255,255,0)',
              '0 0 5px rgba(0,255,255,0.3)',
              '0 0 0px rgba(0,255,255,0)',
              '0 0 15px rgba(0,255,255,0.5)',
              '0 0 5px rgba(0,255,255,0.2)',
              '0 0 20px rgba(0,255,255,0.4), 0 0 40px rgba(0,255,255,0.3)',
              '0 0 15px rgba(0,255,255,0.3)',
              '0 0 20px rgba(0,255,255,0.4), 0 0 40px rgba(0,255,255,0.3)',
            ],
          }}
          transition={{
            duration: 3.0,
            times: [0, 0.1, 0.2, 0.4, 0.5, 0.7, 0.85, 1],
            ease: 'easeInOut',
          }}
          aria-label={'Welcome to AlgoScope'}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center lg:items-baseline gap-1 sm:gap-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-300 to-purple-400 mx-auto">
            <div className="mx-2">Welcome</div>
            <div className="mx-2">to</div>
            <div className="mx-2">AlgoScope</div>
          </div>
        </motion.h1>
        <motion.p
          className="font-geist text-base sm:text-lg md:text-2xl text-gray-300 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Your ultimate guide to{' '}
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 [text-shadow:_0_0_20px_rgba(34,211,238,0.3)] space-mono-bold-italic tracking-tighter">
            algorithm
          </span>{' '}
          visualization.
        </motion.p>
      </div>
      <div className="w-full m-auto px-10 py-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AlgoCard
              title="Sorting Algorithms"
              description="Bubble, Merge, Quick, Heap Sort, etc."
              color="bg-blue-500/60"
              link="/sort"
              image={SortingImg}
            />
            <AlgoCard
              title="Searching Algorithms"
              description="BFS, DFS..."
              color="bg-green-500/60"
              link="/search"
              image={SearchingImg}
            />
            <AlgoCard
              title="Graph Algorithms"
              description="Dijkstra, Floyd-Warshall, Topological Sort..."
              color="bg-pink-500/60"
              link="/spath"
              image={GraphAlgoImg}
            />
            <AlgoCard
              title="Array Searching"
              description="Linear Search, Binary Search..."
              color="bg-purple-500/60"
              link="/ldssearch"
              image={LinearSearchImg}
            />
            <AlgoCard
              title="Abstract Data Types (beta)"
              description="Stacks, Queues, Linked Lists..."
              color="bg-yellow-500/60"
              link="/"
              image={LinearSearchImg}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
