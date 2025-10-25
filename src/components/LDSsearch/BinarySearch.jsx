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
        dehighlight(i, 'left')
        dehighlight(i, 'right')
        dehighlight(i, 'active')
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
    }

    if (foundIndex === -1) {
      markNotFound()
    }

    await sleep(1000)
    dehighlightAll()
    setIsSearching(false)
  }

  return (
    <div className="p-6 flex flex-col items-center bg-gradient-to-b from-white to-[#f9fafb] min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6 tracking-wide">
        🌸 Binary Search Visualizer
      </h1>

      <div className="flex space-x-3 mb-8">
        {array.map((item, idx) => (
          <span
            key={idx}
            ref={(el) => (eleRef.current[idx] = el)}
            className="array-ele rounded-xl shadow-md border border-gray-200 px-5 py-3 text-lg font-semibold text-gray-700 bg-white transition-all duration-500"
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
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter a number"
        />
        <button
          disabled={isSearching}
          onClick={binarySearch}
          className={`px-6 py-3 rounded-xl font-medium text-white shadow-md transition-all duration-300 ${
            isSearching
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-400 hover:bg-blue-500'
          }`}
        >
          {isSearching ? 'Searching...' : `Start Search`}
        </button>
      </div>
      <style>{`
        .array-ele {
          transform: scale(1);
          transition: all 0.3s ease-in-out;
        }

        .array-ele.active { /* mid */
          background-color: #fff8e1 !important; /* soft yellow */
          border-color: #f6c453 !important;
          transform: scale(1.15);
        }
        
        .array-ele.left {
            background-color: #e0f2fe !important; /* soft blue */
            border-color: #7dd3fc !important;
        }
        
        .array-ele.right {
            background-color: #fee2e2 !important; /* soft red */
            border-color: #fca5a5 !important;
        }

        .array-ele.found {
          background-color: #b5e48c !important; /* soft green */
          border-color: #76c893 !important;
          transform: scale(1.2);
          color: #1b4332;
        }
      `}</style>
    </div>
  )
}

export default BinarySearch