import React from 'react'

export const Menu2 = ({ setNode }) => {
  const handleChange = e => {
    setNode(e.target.value)
  }

  const handleReset = () => {
    setNode(null)
  }

  return (
    <div className='space-y-3'>
      <h3 className='text-lg font-semibold text-slate-800'>Starting Node</h3>
      <form className='m-auto'>
        <div className='w-full max-w-sm min-w-[200px]'>
          <div className='relative'>
            <select
              onChange={handleChange}
              className='w-full bg-transparent placeholder:text-slate-500 text-slate-800 text-sm border border-slate-600 rounded pl-3 pr-8 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
            >
              <option value=''>Choose a Starting Node</option>
              {Array.from({ length: 9 }, (_, i) => i + 1).map(element => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.2'
              stroke='currentColor'
              className='h-5 w-5 ml-1 absolute top-2.5 right-5 text-slate-700'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
              />
            </svg>
          </div>
        </div>
      </form>
      <button
        onClick={handleReset}
        className='border-b-black border-2 w-full bg-stone-950 hover:bg-slate-100 text-white hover:text-black text-sm font-medium py-2 px-4 rounded transition duration-300'      >
        Reset
      </button>
    </div>
  )
}
