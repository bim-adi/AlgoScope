import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { motion } from 'framer-motion'
import { Home } from './components/Home'
import SortingVisualizerPage from './components/sortingAlgo/VisualizerPage'
import { VisualizerPage } from './components/searchAlgo/VisualizerPage'
import { ShortestPathPage } from './components/shortestPahAlgo/ShortestPathPage'

function App() {
  let luxurySunset = 'bg-gradient-to-br from-orange-500 to-purple-500'
  let calmDawn = 'bg-gradient-to-br from-blue-200 via-white to-pink-200'
  let roseIndigo = 'bg-gradient-to-br from-indigo-800 to-rose-500'
  let forestGold = 'bg-gradient-to-br from-green-900 to-yellow-500'
  let arcticRuby = 'bg-gradient-to-br from-sky-400 to-rose-700'
  const route = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <motion.div
            className={`flex flex-col md:flex-row' ${luxurySunset} transition-colors duration-700 max-w-screen`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className="flex flex-col gap-4 p-4 m-auto">
              <Navbar />
              <Home />
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
            className={`flex flex-col md:flex-row ${roseIndigo} transition-colors duration-700 overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* <CanvasSearching algorithm={algorithm} vertex={vertex} /> */}
            <div className="flex flex-col gap-4 p-4 m-auto">
              {/* <MenuSetAlgoSearch setAlgorithm={setAlgorithm} /> */}
              {/* <MenuSelectNodeSearch setNode={setNode} /> */}
              <Navbar />
              <VisualizerPage />
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
            className={`flex flex-col md:flex-row ${forestGold} transition-colors duration-700`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* <CanvasShortestPath */}
            {/*   algorithm={spAlgorithm} */}
            {/*   source={source} */}
            {/*   target={target} */}
            {/* /> */}
            <div className="flex flex-col gap-4 p-4 m-auto">
              {/* <MenuSetAlgoShortestPath setAlgorithm={setSpAlgorithm} /> */}
              {/* <MenuSelectNodesShortestPath */}
              {/*   setSource={setSource} */}
              {/*   setTarget={setTarget} */}
              {/* /> */}
              <Navbar />
              <ShortestPathPage />
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
            className="flex flex-col md:flex-row bg-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className="flex flex-col gap-4 p-4 m-auto">
              <Navbar />
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
            className={`flex flex-col md:flex-row ${arcticRuby} transition-colors duration-700 `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col m-auto gap-4 p-4">
              <Navbar />
              <SortingVisualizerPage />
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
