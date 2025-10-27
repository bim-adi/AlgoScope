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
import AboutAlgoScope from './components/about/About'

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
            className={`min-h-screen flex flex-col ${calmDawn} transition-colors duration-700`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className="flex-1 flex flex-col gap-4 p-4">
              <Navbar />
              <AboutAlgoScope />
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
