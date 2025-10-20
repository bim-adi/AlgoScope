import React, { useState, useRef, useEffect } from 'react'
import { CodeDisplay } from './CodeDisplay'

const CountArrayDisplay = ({ title, data, barWidth = 20 }) => (
  <div className="flex flex-col items-center">
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <div
      className="flex gap-2 items-end h-[300px] p-4 rounded-xl border-b-black border-2"
      style={{ background: '#DDDEAB' }}
    >
      {data.map((value, idx) => (
        <div
          key={idx}
          className="count-bar rounded transition-all duration-500 border-2 border-b-black"
          style={{
            height: `${value * 20}px`,
            width: `${barWidth}px`,
            background: '#4ECDC4',
            position: 'relative',
          }}
        >
          <div className="count-val">{value}</div>
        </div>
      ))}
    </div>
  </div>
)

export default function Visualizer({ algorithmType }) {
  const [array, setArray] = useState([50, 120, 70, 30, 200, 90, 160])
  const [isSorting, setIsSorting] = useState(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('')
  const [countArray, setCountArray] = useState([])
  const [radixCountArray, setRadixCountArray] = useState([])
  const [currentRadixDigit, setCurrentRadixDigit] = useState(1)
  const barsRef = useRef([])
  const eleRef = useRef([])

  useEffect(() => {
    barsRef.current = document.querySelectorAll('.bar')
    eleRef.current = document.querySelectorAll('.array-ele')
  }, [array])

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  const updateArrayAndVisuals = (newArray, index1, index2) => {
    setArray([...newArray])
    if (barsRef.current[index1] && barsRef.current[index2]) {
      const tempHeight = barsRef.current[index1].style.height
      barsRef.current[index1].style.height =
        barsRef.current[index2].style.height
      barsRef.current[index2].style.height = tempHeight
    }
  }

  const updateElementHeight = (index, value) => {
    if (barsRef.current[index]) {
      barsRef.current[index].style.height = `${value}px`
    }
  }

  const highlight = (i, j, className = 'active') => {
    if (barsRef.current[i]) barsRef.current[i].classList.add(className)
    if (barsRef.current[j]) barsRef.current[j].classList.add(className)
    if (eleRef.current[i]) eleRef.current[i].classList.add(className)
    if (eleRef.current[j]) eleRef.current[j].classList.add(className)
  }

  const dehighlight = (i, j, className = 'active') => {
    if (barsRef.current[i]) barsRef.current[i].classList.remove(className)
    if (barsRef.current[j]) barsRef.current[j].classList.remove(className)
    if (eleRef.current[i]) eleRef.current[i].classList.remove(className)
    if (eleRef.current[j]) eleRef.current[j].classList.remove(className)
  }

  const clearDynamicArrays = () => {
    setCountArray([])
    setRadixCountArray([])
  }

  // --- Sorting Algorithms ---
  const bubbleSort = async () => {
    setIsSorting(true)
    let arr = [...array]
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        highlight(j, j + 1)
        await sleep(400)
        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          updateArrayAndVisuals(arr, j, j + 1)
        }
        dehighlight(j, j + 1)
      }
    }
    setArray(arr)
    setIsSorting(false)
  }

  const selectionSort = async () => {
    setIsSorting(true)
    let arr = [...array]
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i
      highlight(i, i, 'pivot')
      for (let j = i + 1; j < arr.length; j++) {
        highlight(j, j, 'active')
        await sleep(300)
        if (arr[j] < arr[minIdx]) {
          if (minIdx !== i) dehighlight(minIdx, minIdx, 'min')
          minIdx = j
          highlight(minIdx, minIdx, 'min')
        }
        dehighlight(j, j, 'active')
      }
      if (minIdx !== i) {
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        updateArrayAndVisuals(arr, i, minIdx)
      }
      dehighlight(i, i, 'pivot')
      dehighlight(minIdx, minIdx, 'min')
      await sleep(200)
    }
    setIsSorting(false)
  }

  const insertionSort = async () => {
    setIsSorting(true)
    let arr = [...array]
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i]
      let j = i - 1
      highlight(i, i, 'pivot')
      await sleep(300)
      while (j >= 0 && arr[j] > key) {
        highlight(j, j + 1)
        await sleep(300)
        arr[j + 1] = arr[j]
        updateElementHeight(j + 1, arr[j])
        setArray([...arr])
        dehighlight(j, j + 1)
        j--
      }
      arr[j + 1] = key
      updateElementHeight(j + 1, key)
      setArray([...arr])
      dehighlight(i, i, 'pivot')
    }
    setIsSorting(false)
  }

  const quickSort = async (
    arr = [...array],
    low = 0,
    high = arr.length - 1,
    isInitial = true
  ) => {
    if (isInitial) {
      setIsSorting(true)
      arr = [...array]
    }
    if (low < high) {
      let pi = await partition(arr, low, high)
      await quickSort(arr, low, pi - 1, false)
      await quickSort(arr, pi + 1, high, false)
    }
    if (isInitial) setIsSorting(false)
    return arr
  }

  const partition = async (arr, low, high) => {
    let pivot = arr[high]
    let i = low - 1
    if (barsRef.current[high]) barsRef.current[high].classList.add('pivot')
    if (eleRef.current[high]) eleRef.current[high].classList.add('pivot')

    for (let j = low; j < high; j++) {
      if (barsRef.current[j]) barsRef.current[j].classList.add('active')
      if (eleRef.current[j]) eleRef.current[j].classList.add('active')
      await sleep(300)

      if (arr[j] < pivot) {
        i++
        if (i !== j) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          updateArrayAndVisuals(arr, i, j)
        }
      }
      if (barsRef.current[j]) barsRef.current[j].classList.remove('active')
      if (eleRef.current[j]) eleRef.current[j].classList.remove('active')
    }

    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    updateArrayAndVisuals(arr, i + 1, high)

    if (barsRef.current[high]) barsRef.current[high].classList.remove('pivot')
    if (eleRef.current[high]) eleRef.current[high].classList.remove('pivot')
    return i + 1
  }

  const mergeSort = async (
    arr = [...array],
    left = 0,
    right = arr.length - 1,
    isInitial = true
  ) => {
    if (isInitial) {
      setIsSorting(true)
      arr = [...array]
    }
    if (left < right) {
      let mid = Math.floor((left + right) / 2)
      await mergeSort(arr, left, mid, false)
      await mergeSort(arr, mid + 1, right, false)
      await merge(arr, left, mid, right)
    }
    if (isInitial) setIsSorting(false)
    return arr
  }

  const merge = async (arr, left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1)
    let rightArr = arr.slice(mid + 1, right + 1)
    let i = 0,
      j = 0,
      k = left

    while (i < leftArr.length && j < rightArr.length) {
      if (barsRef.current[k]) barsRef.current[k].classList.add('active')
      if (eleRef.current[k]) eleRef.current[k].classList.add('active')
      await sleep(300)

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i]
        i++
      } else {
        arr[k] = rightArr[j]
        j++
      }
      updateElementHeight(k, arr[k])
      setArray([...arr])
      if (barsRef.current[k]) barsRef.current[k].classList.remove('active')
      if (eleRef.current[k]) eleRef.current[k].classList.remove('active')
      k++
    }
    while (i < leftArr.length) {
      /* ... copy rest ... */
    }
    while (j < rightArr.length) {
      /* ... copy rest ... */
    }
  }

  const heapSort = async () => {
    setIsSorting(true)
    let arr = [...array]
    let n = arr.length
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i)
    }
    for (let i = n - 1; i > 0; i--) {
      ;[arr[0], arr[i]] = [arr[i], arr[0]]
      updateArrayAndVisuals(arr, 0, i)
      await sleep(300)
      await heapify(arr, i, 0)
    }
    setIsSorting(false)
  }

  const heapify = async (arr, n, i) => {
    let largest = i
    let left = 2 * i + 1
    let right = 2 * i + 2

    if (barsRef.current[i]) barsRef.current[i].classList.add('pivot')
    if (eleRef.current[i]) eleRef.current[i].classList.add('pivot')

    if (left < n && arr[left] > arr[largest]) largest = left
    if (right < n && arr[right] > arr[largest]) largest = right

    if (largest !== i) {
      if (barsRef.current[largest])
        barsRef.current[largest].classList.add('active')
      if (eleRef.current[largest])
        eleRef.current[largest].classList.add('active')
      await sleep(300)
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
      updateArrayAndVisuals(arr, i, largest)
      if (barsRef.current[largest])
        barsRef.current[largest].classList.remove('active')
      if (eleRef.current[largest])
        eleRef.current[largest].classList.remove('active')
      if (barsRef.current[i]) barsRef.current[i].classList.remove('pivot')
      if (eleRef.current[i]) eleRef.current[i].classList.remove('pivot')
      await heapify(arr, n, largest)
    } else {
      if (barsRef.current[i]) barsRef.current[i].classList.remove('pivot')
      if (eleRef.current[i]) eleRef.current[i].classList.remove('pivot')
    }
  }

  const countingSort = async () => {
    setIsSorting(true)
    clearDynamicArrays()
    let arr = [...array]
    const max = Math.max(...arr)
    const count = new Array(max + 1).fill(0)

    setCountArray([...count])
    await sleep(200)

    for (let i = 0; i < arr.length; i++) {
      if (barsRef.current[i]) barsRef.current[i].classList.add('active')
      if (eleRef.current[i]) eleRef.current[i].classList.add('active')

      count[arr[i]]++
      setCountArray([...count])
      await sleep(300)

      if (barsRef.current[i]) barsRef.current[i].classList.remove('active')
      if (eleRef.current[i]) eleRef.current[i].classList.remove('active')
    }

    for (let i = 1; i <= max; i++) {
      count[i] += count[i - 1]
      setCountArray([...count])
      await sleep(200)
    }

    const output = new Array(arr.length)
    for (let i = arr.length - 1; i >= 0; i--) {
      if (barsRef.current[i]) barsRef.current[i].classList.add('active')
      if (eleRef.current[i]) eleRef.current[i].classList.add('active')

      output[count[arr[i]] - 1] = arr[i]
      count[arr[i]]--
      setCountArray([...count])
      await sleep(300)

      if (barsRef.current[i]) barsRef.current[i].classList.remove('active')
      if (eleRef.current[i]) eleRef.current[i].classList.remove('active')
    }

    for (let i = 0; i < arr.length; i++) {
      if (barsRef.current[i]) barsRef.current[i].classList.add('active')
      if (eleRef.current[i]) eleRef.current[i].classList.add('active')

      arr[i] = output[i]
      updateElementHeight(i, arr[i])
      setArray([...arr])
      await sleep(300)

      if (barsRef.current[i]) barsRef.current[i].classList.remove('active')
      if (eleRef.current[i]) eleRef.current[i].classList.remove('active')
    }

    setTimeout(clearDynamicArrays, 1000)
    setIsSorting(false)
  }

  const radixSort = async () => {
    setIsSorting(true)
    clearDynamicArrays()
    let arr = [...array]
    let max = Math.max(...arr)

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      setCurrentRadixDigit(exp)
      await countingSortForRadix(arr, exp)
    }

    setTimeout(clearDynamicArrays, 500)
    setIsSorting(false)
  }

  const countingSortForRadix = async (arr, exp) => {
    let output = new Array(arr.length)
    let count = new Array(10).fill(0)

    setRadixCountArray([...count])
    await sleep(200)

    for (let i = 0; i < arr.length; i++) {
      if (barsRef.current[i]) barsRef.current[i].classList.add('active')
      if (eleRef.current[i]) eleRef.current[i].classList.add('active')

      const digit = Math.floor(arr[i] / exp) % 10
      count[digit]++
      setRadixCountArray([...count])
      await sleep(200)

      if (barsRef.current[i]) barsRef.current[i].classList.remove('active')
      if (eleRef.current[i]) eleRef.current[i].classList.remove('active')
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1]
      setRadixCountArray([...count])
      await sleep(100)
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      if (barsRef.current[i]) barsRef.current[i].classList.add('active')
      if (eleRef.current[i]) eleRef.current[i].classList.add('active')

      const digit = Math.floor(arr[i] / exp) % 10
      output[count[digit] - 1] = arr[i]
      count[digit]--
      setRadixCountArray([...count])
      await sleep(300)

      if (barsRef.current[i]) barsRef.current[i].classList.remove('active')
      if (eleRef.current[i]) eleRef.current[i].classList.remove('active')
    }

    for (let i = 0; i < arr.length; i++) {
      if (barsRef.current[i]) barsRef.current[i].classList.add('active')
      if (eleRef.current[i]) eleRef.current[i].classList.add('active')

      arr[i] = output[i]
      updateElementHeight(i, arr[i])
      setArray([...arr])
      await sleep(200)

      if (barsRef.current[i]) barsRef.current[i].classList.remove('active')
      if (eleRef.current[i]) eleRef.current[i].classList.remove('active')
    }
  }

  const sortingAlgorithms = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    quick: quickSort,
    merge: mergeSort,
    heap: heapSort,
    counting: countingSort,
    radix: radixSort,
  }

  const algorithmOptions = {
    simple: ['bubble', 'selection', 'insertion'],
    complex: ['quick', 'merge', 'heap'],
    integer: ['counting', 'radix'],
  }

  const handleSort = () => {
    if (selectedAlgorithm && sortingAlgorithms[selectedAlgorithm]) {
      clearDynamicArrays()
      sortingAlgorithms[selectedAlgorithm]()
    }
  }

  const handleReset = () => {
    setSelectedAlgorithm('')
    clearDynamicArrays()
    setArray(
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 200) + 50)
    )
  }

  return (
    <div className="flex flex-col lg:flex-row p-6">
      <div className="w-full lg:w-3/5">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">
            {`${algorithmType.charAt(0).toUpperCase() + algorithmType.slice(1)} Sorting`}
          </h1>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Array</h3>
            <div
              id="container"
              className="flex gap-2 items-end h-[300px] p-4 rounded-xl border-b-black border-2"
              style={{ background: '#DDDEAB' }}
            >
              {array.map((val, idx) => (
                <div
                  key={idx}
                  className="bar rounded transition-all duration-500 border-2 border-b-black"
                  style={{ height: `${val}px`, width: '30px' }}
                >
                  <div className="bar-val">{val}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            id="dynamic-containers"
            className="flex justify-center items-start gap-8 mt-4"
          >
            {countArray.length > 0 && (
              <CountArrayDisplay
                title="Count Array"
                data={countArray}
                barWidth={20}
              />
            )}
            {radixCountArray.length > 0 && (
              <CountArrayDisplay
                title={`Digit ${currentRadixDigit}s Count`}
                data={radixCountArray}
                barWidth={25}
              />
            )}
          </div>

          <div className="next p-4">
            {array.map((item, idx) => (
              <span
                key={idx}
                className="array-ele rounded-lg transition-all duration-500"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">Algorithm</h3>
            <div className="m-auto space-y-2">
              <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative">
                  <select
                    value={selectedAlgorithm}
                    onChange={(e) => setSelectedAlgorithm(e.target.value)}
                    disabled={isSorting}
                    className="w-full bg-transparent text-slate-800 text-sm border border-slate-600 rounded pl-3 pr-8 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="">Choose Algorithm</option>
                    {algorithmOptions[algorithmType].map((alg) => (
                      <option key={alg} value={alg}>
                        {`${alg.charAt(0).toUpperCase() + alg.slice(1)} Sort`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 gap-4 flex">
              <button
                onClick={handleSort}
                disabled={isSorting || !selectedAlgorithm}
                className="w-full text-sm font-medium py-2 px-4 rounded-4xl m-1 transition duration-300 bg-slate-100 text-black"
              >
                {isSorting ? 'Sorting...' : 'Start Sort'}
              </button>
              <button
                onClick={handleReset}
                disabled={isSorting}
                className="w-full text-sm font-medium py-2 px-4 rounded-4xl m-1 transition duration-300 bg-slate-100 text-black"
              >
                Generate New Array
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
        <CodeDisplay algorithm={selectedAlgorithm} />
      </div>

      <style>{`
        .array-ele { border: 2px solid black; padding: 5px; margin: 2px; }
        .bar { background: #D92C54; border: 2px solid black; }
        .bar.active, .array-ele.active { background: #8ABB6C !important; }
        .bar.pivot, .array-ele.pivot { background: #FF6B6B !important; }
        .bar.min, .array-ele.min { background: #4ECDC4 !important; }
        .bar-val { display: flex; justify-content: center; color: #DDDEAB; font-size: small; font-weight: bolder; }
        .count-val {
          display: flex; justify-content: center;
          color: #000; font-size: small; font-weight: bolder;
          position: absolute; bottom: -20px; width: 100%;
        }
      `}</style>
    </div>
  )
}
