import React, { useState, useEffect } from 'react'

export default function SortingVisualizer () {
  const [array, setArray] = useState([50, 120, 70, 30, 200, 90, 160])
  const [isSorting, setIsSorting] = useState(false)

  // Utility: pause between steps
  const sleep = ms => new Promise(r => setTimeout(r, ms))

  // Bubble Sort Animation
  const bubbleSort = async () => {
    setIsSorting(true)
    let arr = [...array]
    let bars = document.querySelectorAll('.bar')
    let ele = document.querySelectorAll('.array-ele')
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        bars[j].classList.add('active')
        bars[j + 1].classList.add('active')
        ele[j].classList.add('active')
        ele[j + 1].classList.add('active')
        await sleep(400)

        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

          // Swap in DOM
          let tempHeight = bars[j].style.height
          bars[j].style.height = bars[j + 1].style.height
          bars[j + 1].style.height = tempHeight
          setArray([...arr])
        }
        bars[j].classList.remove('active')
        bars[j + 1].classList.remove('active')
        ele[j].classList.remove('active')
        ele[j + 1].classList.remove('active')
      }
    }

    setArray(arr)
    setIsSorting(false)
  }

  return (
    <div className='flex flex-col items-center p-6'>
      <h1 className='text-2xl font-bold mb-4'>Sorting Visualizer</h1>

      {/* Bars */}
      <div
        id='container'
        className='flex gap-2 items-end h-[300px] p-4 rounded-xl border-b-black border-2'
      >
        {array.map((val, idx) => (
          <div
            key={idx}
            className='bar transition-all duration-500 border-2 border-b-black'
            style={{ height: `${val}px`, width: '30px' }}
          ></div>
        ))}
      </div>

      {/* Controls */}
      <div className='mt-4 flex gap-4'>
        <button
          onClick={bubbleSort}
          disabled={isSorting}
          className='border-b-black border-2 w-full bg-stone-950 hover:bg-slate-100 text-white hover:text-black  text-sm font-medium py-2 px-4 rounded-4xl m-1 transition duration-300 disabled:opacity-50 button'
        >
          Bubble Sort
        </button>
        <button
          onClick={() =>
            setArray(
              Array.from(
                { length: 10 },
                () => Math.floor(Math.random() * 200) + 50
              )
            )
          }
          disabled={isSorting}
          className='border-b-black border-2 w-full bg-stone-950 hover:bg-slate-100 text-white hover:text-black  text-sm font-medium py-2 px-4 rounded-4xl m-1 transition duration-300 disabled:opacity-50 button'
        >
          Generate New Array
        </button>
        
        <div className='next p-4'>
          {array.map((item, idx) => (
            <span key={idx} className='array-ele rounded-lg'>
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
      .array-ele{
      border:2px solid black;
      padding:5px;
      margin:2px;
      }
        #container{
          background:#DDDEAB;
        }
        .bar {
          background: #D92C54;
          border:2px solid black;
        }
        .bar.active {
          background: #8ABB6C !important;
      }
          .array-ele.active {
          background: #8ABB6C !important;
      }
      `}</style>
    </div>
  )
}
