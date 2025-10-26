import React from 'react'
import AlgoCard from './AlgoCard'
import SortingImg from '../assets/Picture1.png'
import SearchingImg from '../assets/bfs_dfs.png'
import LinearSearchImg from '../assets/new-arr.png'
import GraphAlgoImg from '../assets/graph.png'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen w-full bg-white-900 text-white">
      <div className="text-center p-8">
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={title}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">
            {title.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={charVariants}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-300"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {subtitle}
        </motion.p>
      </div>
      <div className="w-full m-auto px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AlgoCard
              title="Sorting Algorithms"
              description="Bubble, Merge, Quick, Heap Sort, etc."
              color="bg-blue-500/30"
              link="/sort"
              image={SortingImg}
            />
            <AlgoCard
              title="Searching Algorithms"
              description="BFS, DFS..."
              color="bg-green-500/30"
              link="/search"
              image={SearchingImg}
            />
            <AlgoCard
              title="Graph Algorithms"
              description="Dijkstra, Floyd-Warshall, Topological Sort..."
              color="bg-pink-500/30"
              link="/spath"
              image={GraphAlgoImg}
            />
            <AlgoCard
              title="Array Searching"
              description="Linear Search, Binary Search..."
              color="bg-purple-500/30"
              link="/ldssearch"
              image={LinearSearchImg}
            />
            <AlgoCard
              title="Abstract Data Types (beta)"
              description="Stacks, Queues, Linked Lists..."
              color="bg-yellow-500/30"
              link="/"
              image={LinearSearchImg}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
