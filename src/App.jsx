import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { motion } from 'framer-motion'
import { Home } from './components/Home'
import SortingVisualizerPage from './components/sortingAlgo/VisualizerPage'
import { VisualizerPage } from './components/searchAlgo/VisualizerPage'
import { ShortestPathPage } from './components/shortestPahAlgo/ShortestPathPage'
import Footer from './components/Footer'
import ArrayVisualizerPage from './components/arraySsearch/VisualizerPage'

function App() {
  let luxurySunset = 'bg-gradient-to-br from-orange-500 to-purple-500'
  let calmDawn = 'bg-gradient-to-br from-rose-300 to-slate-400'
  let roseIndigo = 'bg-gradient-to-br from-indigo-800 to-rose-500'
  let forestGold = 'bg-gradient-to-br from-green-900 to-yellow-500'
  let arcticRuby = 'bg-gradient-to-br from-sky-400 to-rose-700'
  const route = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <motion.div
            className={`min-h-screen flex flex-col ${luxurySunset} transition-colors duration-700`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className="flex-1 flex flex-col gap-4 p-4">
              <Navbar />
              <Home />
              <Footer />
            </div>
          </motion.div>
        </>
      ),
    },
    {
      path: '/search',
      element: (
        <>
          <motion.div
            className={`min-h-screen flex flex-col ${roseIndigo} transition-colors duration-700 overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* <CanvasSearching algorithm={algorithm} vertex={vertex} /> */}
            <div className="flex-1 flex flex-col gap-4 p-4">
              {/* <MenuSetAlgoSearch setAlgorithm={setAlgorithm} /> */}
              {/* <MenuSelectNodeSearch setNode={setNode} /> */}
              <Navbar />
              <VisualizerPage />
              <Footer />
            </div>
          </motion.div>
        </>
      ),
    },
    {
      path: '/spath',
      element: (
        <>
          <motion.div
            className={`min-h-screen flex flex-col ${forestGold} transition-colors duration-700`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className="flex-1 flex flex-col gap-4 p-4">
              <Navbar />
              <ShortestPathPage />
              <Footer />
            </div>
          </motion.div>
        </>
      ),
    },
    {
      path: '/about',
      element: (
        <>
          <motion.div
            className={`min-h-screen flex flex-col ${calmDawn}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className="flex-1 flex flex-col gap-4 p-4">
              <Navbar />
              <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                  About AlgoScope
                </h1>
                <div className="prose prose-lg text-gray-700">
                  <p className="mb-4">
                    AlgoScope is an interactive web application built to help
                    learners visualize algorithms in an intuitive and engaging
                    way. Whether you're a beginner exploring how sorting works
                    or an advanced student analyzing graph traversal, AlgoScope
                    transforms abstract code into dynamic, step-by-step
                    animations that make complex logic easier to grasp.
                  </p>
                  <p className="mb-4">
                    Our goal is simple — to make Data Structures and Algorithms
                    (DSA) learning more visual, hands-on, and fun. Instead of
                    reading static pseudocode, users can watch how each
                    algorithm behaves in real time, adjust input data, and
                    compare performance across different techniques.
                  </p>
                  <p className="mb-6">
                    Built with modern web technologies like React, Vite, and
                    Tailwind CSS, AlgoScope is designed for speed, clarity, and
                    smooth interaction — perfect for both students and
                    educators.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    ✨ Features
                  </h2>
                  <ul className="list-disc list-inside mb-6 space-y-2">
                    <li>
                      Visualize sorting and searching algorithms in real time
                    </li>
                    <li>Step-by-step animation with adjustable speed</li>
                    <li>Graph traversal (BFS, DFS) visualizations</li>
                    <li>Responsive and minimal UI built with Tailwind CSS</li>
                    <li>
                      Interactive controls for input size and execution speed
                    </li>
                  </ul>

                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    👩‍💻 Our Vision
                  </h2>
                  <p>
                    Learning algorithms shouldn't be about memorizing code — it
                    should be about understanding how they work. AlgoScope
                    bridges that gap by turning logic into motion, empowering
                    learners to see the flow behind every operation.
                  </p>
                </div>
              </div>
              <Footer />
            </div>
          </motion.div>
        </>
      ),
    },
    {
      path: '/sort',
      element: (
        <>
          <motion.div
            className={`min-h-screen flex flex-col ${arcticRuby} transition-colors duration-700`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex-1 flex flex-col gap-4 p-4">
              <Navbar />
              <SortingVisualizerPage />
              <Footer />
            </div>
          </motion.div>
        </>
      ),
    },
    {
      path: '/ldssearch',
      element: (
        <>
          <motion.div
            className={`min-h-screen flex flex-col ${arcticRuby} transition-colors duration-700`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex-1 flex flex-col gap-4 p-4">
              <Navbar />
              <ArrayVisualizerPage />
              <Footer />
            </div>
          </motion.div>
        </>
      ),
    },
  ])

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
