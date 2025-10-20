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
          <Navbar />
          <div className="flex flex-col md:flex-row">
            {/* <CanvasSearching algorithm={algorithm} vertex={vertex} /> */}
            <div className="flex flex-col gap-4 p-4 m-auto">
              {/* <MenuSetAlgoSearch setAlgorithm={setAlgorithm} /> */}
              {/* <MenuSelectNodeSearch setNode={setNode} /> */}
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
          <Navbar />
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
          <Navbar />
          <SortingVisualizerPage />
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
