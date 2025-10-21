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
          <Navbar /> <Home />
        </>
      ),
    },
    {
      path: '/search',
      element: (
        <>
          <div className="flex flex-col md:flex-row bg-red-100">
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
          <div className="flex flex-col md:flex-row">
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
          <Navbar />
        </>
      ),
    },
    {
      path: '/sort',
      element: (
        <>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col m-auto">
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
