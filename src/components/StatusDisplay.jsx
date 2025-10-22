// import React from 'react'
//
// const StatusDisplay = ({ message }) => {
//   return (
//     <>
//       <div className="bg-amber-200 border-2 rounded w-full m-auto p-3 mt-8">
//         <div>{message}</div>
//       </div>
//     </>
//   )
// }
//
// export default StatusDisplay

import React, { useState, useEffect } from 'react'

const StatusDisplay = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false)

  // This triggers the animation once the component is mounted
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <div
        className={`
          flex items-center gap-4 
          w-full max-w-lg m-auto p-4 mt-8 
          rounded-xl border-l-4 border-amber-500 
          bg-gradient-to-r from-amber-100 to-amber-200 
          shadow-xl
          
          {/* --- Animation classes --- */}
          transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        {/* 1. Icon */}
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-amber-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* 2. Message */}
        <div className="font-medium text-amber-900">{message}</div>
      </div>
    </>
  )
}

export default StatusDisplay
