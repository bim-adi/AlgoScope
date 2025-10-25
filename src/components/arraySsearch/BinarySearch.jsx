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
        if(i < left || i > right) {
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
    <div className="p-6 flex flex-col items-center rounded-lg bg-slate-800/50 border border-slate-700 shadow-xl mb-8">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 tracking-wide">
        Binary Search Visualizer
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
          onClick={binarySearch}
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
          transition: all 0.3s ease-in-out;
        }

        .array-ele.active { /* mid */
          background-color: #facc15 !important; /* yellow-400 */
          border-color: #fde047 !important; /* yellow-300 */
          color: #1e293b !important; /* slate-800 */
          transform: scale(1.1);
        }
        
        .array-ele.left {
            background-color: #60a5fa !important; /* blue-400 */
            border-color: #93c5fd !important; /* blue-300 */
        }
        
        .array-ele.right {
            background-color: #f87171 !important; /* red-400 */
            border-color: #fca5a5 !important; /* red-300 */
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

export default BinarySearch