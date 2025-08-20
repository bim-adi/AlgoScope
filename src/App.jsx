import React, { useState } from "react"
import { Navbar } from "./components/Navbar"
import { Canvas } from "./components/Canvas"
import { Menu } from "./components/Menu"
import MultiCodeViewer from "./components/MultiCodeViewer"

function App() {
  const [algorithm, setAlgorithm] = useState(null)

  return (
    <>
      <Navbar />
      <div className="flex">
        <Canvas algorithm={algorithm} />
        <Menu setAlgorithm={setAlgorithm} />
      </div>
      <MultiCodeViewer />
    </>
  )
}

export default App
