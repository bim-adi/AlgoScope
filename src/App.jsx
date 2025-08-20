import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Canvas } from './components/Canvas'
import { Menu } from './components/Menu'
import { Menu2 } from './components/Menu2'

function App () {
  const [algorithm, setAlgorithm] = useState(null)
  const [vertex, setNode] = useState(null)
  return (
    <>
      <Navbar />
      <div className='flex flex-col md:flex-row'>
        <Canvas algorithm={algorithm} vertex={vertex} />
        <div className='flex flex-col gap-4 p-4 m-auto'>
          <Menu setAlgorithm={setAlgorithm} />
          <Menu2 setNode={setNode} />
        </div>
      </div>
    </>
  )
}

export default App
