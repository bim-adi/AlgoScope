import React, { useState, useRef } from 'react'

const LinearSearch = () => {
  const [array, setArray] = useState([50, 120, 72, 30, 203, 90, 160, 88, 17, 45, 37, 99, 101])
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

  const linearSearch = async (target) => {
    setIsSearching(true)
    let arr = [...array]
    let foundIndex = -1

    for (let i = 0; i < arr.length; i++) {
      highlight(i)
      await sleep(400)

      if (arr[i] === target) {
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
    <div className="p-6 flex flex-col items-center bg-gradient-to-b from-white to-[#f9fafb] min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6 tracking-wide">
        🌸 Linear Search Visualizer
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

      <button
        disabled={isSearching}
        onClick={() => linearSearch(30)}
        className={`px-6 py-3 rounded-xl font-medium text-white shadow-md transition-all duration-300 ${
          isSearching
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-400 hover:bg-blue-500'
        }`}
      >
        {isSearching ? 'Searching...' : 'Start Search (30)'}
      </button>

      <style>{`
        .array-ele {
          transform: scale(1);
        }

        .array-ele.active {
          background-color: #fff8e1 !important; /* soft yellow */
          border-color: #f6c453 !important;
          transform: scale(1.15);
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

export default LinearSearch
