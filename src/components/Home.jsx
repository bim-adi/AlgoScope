import React from 'react'
import { Link } from 'react-router-dom'
import { ShortestPathPage } from './shortestPahAlgo/ShortestPathPage'
import AlgoCard from './AlgoCard'
import SortingImg from '../assets/Picture1.png'
import SearchingImg from '../assets/bfs_dfs.png'
import LinearSearchImg from '../assets/new-arr.png'
import GraphAlgoImg from '../assets/graph.png'
import { motion } from 'framer-motion'

export const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="w-full m-auto px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold mb-4">Welcome to AlgoScope</h1>
          <p className="text-slate-700 mb-6">Choose a module to explore:</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AlgoCard
            title="Sorting Algorithms"
            description="Bubble, Merge, Quick, Heap Sort, etc."
            color="bg-blue-100"
            link="/sort"
            image={SortingImg}
          />
          <AlgoCard
            title="Searching Algorithms"
            description="BFS, DFS..."
            color="bg-green-100"
            link="/search"
            image={SearchingImg}
          />
          <AlgoCard
            title="Graph Algorithms"
            description="Dijkstra, Floyd-Warshall, Topological Sort..."
            color="bg-pink-100"
            link="/spath"
            image={GraphAlgoImg}
          />
          <AlgoCard
            title="Array Searching"
            description="Linear Search, Binary Search..."
            color="bg-purple-100"
            link="/ldssearch"
            image={LinearSearchImg}
          />
          <AlgoCard
            title="Abstract Data Types (beta)"
            description="Stacks, Queues, Linked Lists..."
            color="bg-yellow-100"
            link="/"
            image={LinearSearchImg}
          />
        </motion.div>
      </div>
    </div>
  )
}
