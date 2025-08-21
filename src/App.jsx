import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CanvasSearching } from './components/CanvasSearching'
import { MenuSetAlgoSearch } from './components/MenuSetAlgoSearch'
import { MenuSelectNodeSearch } from './components/MenuSelectNodeSearch'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { CanvasShortestPath } from './components/CanvasShortestPath'
import { MenuSetAlgoShortestPath } from './components/MenuSetAlgoShortestPath'
import { MenuSelectNodesShortestPath } from './components/MenuSelectNodesShortestPath'
import SortingVisualizer from './components/SortingVisualizer'

function App () {
  const [algorithm, setAlgorithm] = useState(null)
  const [vertex, setNode] = useState(null)
  const [spAlgorithm, setSpAlgorithm] = useState(null)
  const [source, setSource] = useState(null)
  const [target, setTarget] = useState(null)

  const route = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar /> <Home />
        </>
      )
    },
    {
      path: '/search',
      element: (
        <>
          <Navbar />
          <div className='flex flex-col md:flex-row'>
            <CanvasSearching algorithm={algorithm} vertex={vertex} />
            <div className='flex flex-col gap-4 p-4 m-auto'>
              <MenuSetAlgoSearch setAlgorithm={setAlgorithm} />
              <MenuSelectNodeSearch setNode={setNode} />
            </div>
          </div>
        </>
      )
    },
    {
      path: '/spath',
      element: (
        <>
          <Navbar />
          <div className='flex flex-col md:flex-row'>
            <CanvasShortestPath
              algorithm={spAlgorithm}
              source={source}
              target={target}
            />
            <div className='flex flex-col gap-4 p-4 m-auto'>
              <MenuSetAlgoShortestPath setAlgorithm={setSpAlgorithm} />
              <MenuSelectNodesShortestPath
                setSource={setSource}
                setTarget={setTarget}
              />
            </div>
          </div>
        </>
      )
    },
    {
      path: '/about',
      element: (
        <>
          <Navbar />
        </>
      )
    },
    {
      path: '/sort',
      element: (
        <>
          <Navbar />
          <SortingVisualizer />
        </>
      )
    }
  ])

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
