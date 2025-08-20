import React, { useState } from "react"
import { Navbar } from "./Components/Navbar"
import { Canvas } from "./Components/Canvas"
import { Menu } from "./Components/Menu"
import MultiCodeViewer from "./Components/CodeView"

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
