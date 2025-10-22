import React from 'react'

const StatusDisplay = ({ message }) => {
  return (
    <>
    <div className='bg-amber-200 border-2 rounded w-[50vw] ml-10 p-3'>
      <div>{message}</div>
    </div>
    </>
  )
}

export default StatusDisplay
