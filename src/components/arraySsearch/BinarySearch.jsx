import React, { useState, useRef, useEffect } from 'react'

const BinarySearch = () => {
  const [array, setArray] = useState([
    17, 30, 37, 45, 50, 72, 88, 90, 99, 101, 120, 160, 203,
  ])
  const [target, setTarget] = useState(37)
  const [isSearching, setIsSearching] = useState(false)
  const eleRef = useRef([])
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  useEffect(() => {
    eleRef.current = eleRef.current.slice(0, array.length)
  }, [array])

  const highlight = (i, className) => {
    if (eleRef.current[i]) eleRef.current[i].classList.add(className)
  }

  const dehighlight = (i, className) => {
    if (eleRef.current[i]) eleRef.current[i].classList.remove(className)
  }

  const dehighlightAll = () => {
    for (let i = 0; i < array.length; i++) {
      if (eleRef.current[i]) {
        eleRef.current[i].classList.remove('active', 'left', 'right', 'found')
      }
    }
  }

  const markFound = (i) => {
    if (eleRef.current[i]) {
      eleRef.current[i].classList.remove('active', 'left', 'right')
      eleRef.current[i].classList.add('found')
    }
  }

  const markNotFound = () => {
    alert('❌ Element not found!')
  }

  const binarySearch = async () => {
    setIsSearching(true)
    dehighlightAll()
    let arr = [...array]
    let left = 0
    let right = arr.length - 1
    let foundIndex = -1
    const numericTarget = parseInt(target, 10)

    if (isNaN(numericTarget)) {
      alert('Please enter a valid number to search.')
      setIsSearching(false)
      return
    }

    while (left <= right) {
      for (let i = 0; i < arr.length; i++) {
        if (i < left || i > right) {
          dehighlight(i, 'left')
          dehighlight(i, 'right')
        }
      }
      highlight(left, 'left')
      highlight(right, 'right')

      let mid = Math.floor((left + right) / 2)
      highlight(mid, 'active')
      await sleep(1200)

      if (arr[mid] === numericTarget) {
        foundIndex = mid
        markFound(mid)
        await sleep(1000)
        break
      } else if (arr[mid] < numericTarget) {
        left = mid + 1
      } else {
        right = mid - 1
      }
      dehighlight(mid, 'active')
    }

    if (foundIndex === -1) {
      markNotFound()
    }

    await sleep(1000)
    dehighlightAll()
    setIsSearching(false)
  }

  return (
    <div className="p-8 flex flex-col items-center rounded-2xl bg-slate-900/50 border border-white/10 shadow-2xl mb-8 backdrop-blur-sm">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 tracking-wide">
        Binary Search Visualizer
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
          onClick={binarySearch}
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
          transition: all 0.3s ease-in-out;
        }

        .array-ele.active { /* mid */
          background-color: #facc15 !important; /* yellow-400 */
          border-color: #fde047 !important; /* yellow-300 */
          color: #0f172a !important; /* slate-900 */
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(250, 204, 21, 0.4);
        }
        
        .array-ele.left {
            background-color: #06b6d4 !important; /* cyan-500 */
            border-color: #22d3ee !important; /* cyan-400 */
            color: white !important;
        }
        
        .array-ele.right {
            background-color: #f43f5e !important; /* rose-500 */
            border-color: #fb7185 !important; /* rose-400 */
            color: white !important;
        }

        .array-ele.found {
          background-color: #10b981 !important; /* emerald-500 */
          border-color: #34d399 !important; /* emerald-400 */
          color: white !important;
          transform: scale(1.15);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  )
}

export default BinarySearch

