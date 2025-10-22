import React from 'react'

const StatusDisplay = ({ message }) => {
  return (
    <>
      <div className="bg-amber-200 border-2 rounded w-full m-auto p-3 mt-8">
        <div>{message}</div>
      </div>
    </>
  )
}

export default StatusDisplay
