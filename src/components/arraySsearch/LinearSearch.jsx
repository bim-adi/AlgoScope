import React, { useState, useRef } from 'react'

const LinearSearch = () => {
  const [array, setArray] = useState([
    50, 120, 72, 30, 203, 90, 160, 88, 17, 45, 37, 99, 101, 93, 63,
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
    <div className="p-8 flex flex-col items-center rounded-2xl bg-slate-900/50 border border-white/10 shadow-2xl mb-8 backdrop-blur-sm">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 tracking-wide">
        Linear Search Visualizer
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-10 w-full max-w-5xl">
        {array.map((item, idx) => (
          <span
            key={idx}
            ref={(el) => (eleRef.current[idx] = el)}
            className="array-ele rounded-xl shadow-lg border border-slate-700 px-4 py-3 text-lg font-mono font-medium text-slate-300 bg-slate-800/80 transition-all duration-300"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 w-48 text-center placeholder-slate-500 transition-all"
          placeholder="Target Value"
        />
        <button
          disabled={isSearching}
          onClick={linearSearch}
          className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
            isSearching
              ? 'bg-slate-700 cursor-not-allowed opacity-70'
              : 'bg-cyan-600 hover:bg-cyan-500 hover:shadow-cyan-500/30'
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
          background-color: #06b6d4 !important; /* Cyan-500 */
          border-color: #22d3ee !important; /* Cyan-400 */
          color: white !important;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
        }

        .array-ele.found {
          background-color: #10b981 !important; /* Emerald-500 */
          border-color: #34d399 !important; /* Emerald-400 */
          color: white !important;
          transform: scale(1.15);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  )
}

export default LinearSearch

