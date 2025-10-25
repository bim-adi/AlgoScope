import React, { useState, useRef } from 'react'

const LinearSearch = () => {
  const [array, setArray] = useState([
    50, 120, 72, 30, 203, 90, 160, 88, 17, 45, 37, 99, 101, 93, 63
  ])
  const [target, setTarget] = useState(30)
  const [isSearching, setIsSearching] = useState(false)
  const eleRef = useRef([])
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  const highlight = (i) => {
    if (eleRef.current[i]) eleRef.current[i].classList.add('active')
  }

  const dehighlight = (i) => {
    if (eleRef.current[i]) eleRef.current[i].classList.remove('active')
  }

  const markFound = (i) => {
    if (eleRef.current[i]) eleRef.current[i].classList.add('found')
  }

  const markNotFound = () => {
    alert('❌ Element not found!')
  }

  const linearSearch = async () => {
    setIsSearching(true)
    let arr = [...array]
    let foundIndex = -1
    const numericTarget = parseInt(target, 10)

    if (isNaN(numericTarget)) {
      alert('Please enter a valid number to search.')
      setIsSearching(false)
      return
    }

    for (let i = 0; i < arr.length; i++) {
      highlight(i)
      await sleep(400)

      if (arr[i] === numericTarget) {
        foundIndex = i
        markFound(i)
        await sleep(800)
        break
      }

      dehighlight(i)
    }

    if (foundIndex === -1) markNotFound()

    setIsSearching(false)
    return foundIndex
  }

  return (
    <div className="p-6 flex flex-col items-center rounded-lg bg-slate-800/50 border border-slate-700 shadow-xl mb-8">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 tracking-wide">
        Linear Search Visualizer
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {array.map((item, idx) => (
          <span
            key={idx}
            ref={(el) => (eleRef.current[idx] = el)}
            className="array-ele rounded-lg shadow-md border border-slate-600 px-4 py-2 text-lg font-semibold text-slate-100 bg-slate-700 transition-all duration-300"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-4 mb-8">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a number"
        />
        <button
          disabled={isSearching}
          onClick={linearSearch}
          className={`px-6 py-2 rounded-lg font-medium text-white shadow-md transition-all duration-300 ${
            isSearching
              ? 'bg-slate-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSearching ? 'Searching...' : 'Start Search'}
        </button>
      </div>
      <style>{`
        .array-ele {
          transform: scale(1);
        }

        .array-ele.active {
          background-color: #facc15 !important; /* yellow-400 */
          border-color: #fde047 !important; /* yellow-300 */
          color: #1e293b !important; /* slate-800 */
          transform: scale(1.1);
        }

        .array-ele.found {
          background-color: #4ade80 !important; /* green-400 */
          border-color: #86efac !important; /* green-300 */
          color: #1e293b !important; /* slate-800 */
          transform: scale(1.15);
        }
      `}</style>
    </div>
  )
}

export default LinearSearch