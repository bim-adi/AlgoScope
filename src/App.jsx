import React, { useState } from "react"
import { Navbar } from "./components/Navbar"
import { Canvas } from "./components/Canvas"
import { Menu } from "./components/Menu"

function App() {
  const [algorithm, setAlgorithm] = useState(null)

  return (
    <>
      <Navbar />
      <div className="flex">
        <Canvas algorithm={algorithm} />
        <Menu setAlgorithm={setAlgorithm} />
      </div>
    </>
  )
}

export default App
