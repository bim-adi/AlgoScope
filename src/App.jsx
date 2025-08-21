import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CanvasSearching } from './components/CanvasSearching'
import { MenuSetAlgoSearch } from './components/MenuSetAlgoSearch'
import { MenuSelectNodeSearch } from './components/MenuSelectNodeSearch'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'

function App() {
  const [algorithm, setAlgorithm] = useState(null)
  const [vertex, setNode] = useState(null)

  const route = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /> <Home /></>
    },
    {
      path: "/search",
      element: <>
        <Navbar />
        <div className='flex flex-col md:flex-row'>
          <CanvasSearching algorithm={algorithm} vertex={vertex} />
          <div className='flex flex-col gap-4 p-4 m-auto'>
            <MenuSetAlgoSearch setAlgorithm={setAlgorithm} />
            <MenuSelectNodeSearch setNode={setNode} />
          </div>
        </div>
      </>
    },
    {
      path: "/spath",
      element: <><Navbar /></>
    },
    {
      path: "/about",
      element: <><Navbar /></>
    },

  ]);
  
  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App