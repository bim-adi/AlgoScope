import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import SortingVisualizerPage from './components/sortingAlgo/VisualizerPage'
import { VisualizerPage } from './components/searchAlgo/VisualizerPage'
import { ShortestPathPage } from './components/shortestPahAlgo/ShortestPathPage'

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <div className="flex flex-col md:flex-row bg-purple-100">
            <div className="flex flex-col gap-4 p-4 m-auto">
              <Navbar />
              <Home />
            </div>
          </div>
        </>
      ),
    },
    {
      path: '/search',
      element: (
        <>
          <div className="flex flex-col md:flex-row bg-green-100">
            {/* <CanvasSearching algorithm={algorithm} vertex={vertex} /> */}
            <div className="flex flex-col gap-4 p-4 m-auto">
              {/* <MenuSetAlgoSearch setAlgorithm={setAlgorithm} /> */}
              {/* <MenuSelectNodeSearch setNode={setNode} /> */}
              <Navbar />
              <VisualizerPage />
            </div>
          </div>
        </>
      ),
    },
    {
      path: '/spath',
      element: (
        <>
          <div className="flex flex-col md:flex-row bg-pink-100">
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
          </div>
        </>
      ),
    },
    {
      path: '/about',
      element: (
        <>
          <div className="flex flex-col md:flex-row bg-gray-100">
            <div className="flex flex-col gap-4 p-4 m-auto">
              <Navbar />
            </div>
          </div>
        </>
      ),
    },
    {
      path: '/sort',
      element: (
        <>
          <div className="flex flex-col md:flex-row bg-blue-100">
            <div className="flex flex-col m-auto gap-4 p-4">
              <Navbar />
              <SortingVisualizerPage />
            </div>
          </div>
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
