import React, { useState, useRef, useEffect } from "react";

export default function Sorting() {
  const [array, setArray] = useState([50, 120, 70, 30, 200, 90, 160]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const barsRef = useRef([]);
  const eleRef = useRef([]);

  // Update refs when array changes
  useEffect(() => {
    barsRef.current = document.querySelectorAll(".bar");
    eleRef.current = document.querySelectorAll(".array-ele");
  }, [array]);

  // Utility: pause between steps
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Utility: update both array state and visual elements
  const updateArrayAndVisuals = (newArray, index1, index2) => {
    setArray([...newArray]);

    // Update visual heights
    if (barsRef.current[index1] && barsRef.current[index2]) {
      const tempHeight = barsRef.current[index1].style.height;
      barsRef.current[index1].style.height =
        barsRef.current[index2].style.height;
      barsRef.current[index2].style.height = tempHeight;
    }
  };

  // Utility: update single element height
  const updateElementHeight = (index, value) => {
    if (barsRef.current[index]) {
      barsRef.current[index].style.height = `${value}px`;
    }
  };

  // Utility: clear existing count arrays
  const clearCountArrays = () => {
    const dynamicContainer = document.getElementById("dynamic-containers");
    if (dynamicContainer) {
      dynamicContainer.innerHTML = "";
    }
  };

  // Bubble Sort Animation
  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (barsRef.current[j] && barsRef.current[j + 1]) {
          barsRef.current[j].classList.add("active");
          barsRef.current[j + 1].classList.add("active");
        }
        if (eleRef.current[j] && eleRef.current[j + 1]) {
          eleRef.current[j].classList.add("active");
          eleRef.current[j + 1].classList.add("active");
        }
        await sleep(400);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          updateArrayAndVisuals(arr, j, j + 1);
        }

        if (barsRef.current[j] && barsRef.current[j + 1]) {
          barsRef.current[j].classList.remove("active");
          barsRef.current[j + 1].classList.remove("active");
        }
        if (eleRef.current[j] && eleRef.current[j + 1]) {
          eleRef.current[j].classList.remove("active");
          eleRef.current[j + 1].classList.remove("active");
        }
      }
    }
    setArray(arr);
    setIsSorting(false);
  };

  // Selection Sort Animation
  const selectionSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      if (barsRef.current[i]) barsRef.current[i].classList.add("pivot");
      if (eleRef.current[i]) eleRef.current[i].classList.add("pivot");

      for (let j = i + 1; j < arr.length; j++) {
        if (barsRef.current[j]) barsRef.current[j].classList.add("active");
        if (eleRef.current[j]) eleRef.current[j].classList.add("active");
        await sleep(300);

        if (arr[j] < arr[minIdx]) {
          if (minIdx !== i) {
            if (barsRef.current[minIdx])
              barsRef.current[minIdx].classList.remove("min");
            if (eleRef.current[minIdx])
              eleRef.current[minIdx].classList.remove("min");
          }
          minIdx = j;
          if (barsRef.current[minIdx])
            barsRef.current[minIdx].classList.add("min");
          if (eleRef.current[minIdx])
            eleRef.current[minIdx].classList.add("min");
        }

        if (barsRef.current[j]) barsRef.current[j].classList.remove("active");
        if (eleRef.current[j]) eleRef.current[j].classList.remove("active");
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        updateArrayAndVisuals(arr, i, minIdx);
      }

      if (barsRef.current[i]) barsRef.current[i].classList.remove("pivot");
      if (barsRef.current[minIdx])
        barsRef.current[minIdx].classList.remove("min");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("pivot");
      if (eleRef.current[minIdx])
        eleRef.current[minIdx].classList.remove("min");
      await sleep(200);
    }
    setIsSorting(false);
  };

  // Insertion Sort Animation
  const insertionSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      if (barsRef.current[i]) barsRef.current[i].classList.add("pivot");
      if (eleRef.current[i]) eleRef.current[i].classList.add("pivot");
      await sleep(300);

      while (j >= 0 && arr[j] > key) {
        if (barsRef.current[j] && barsRef.current[j + 1]) {
          barsRef.current[j].classList.add("active");
          barsRef.current[j + 1].classList.add("active");
        }
        if (eleRef.current[j] && eleRef.current[j + 1]) {
          eleRef.current[j].classList.add("active");
          eleRef.current[j + 1].classList.add("active");
        }
        await sleep(300);

        arr[j + 1] = arr[j];
        updateElementHeight(j + 1, arr[j]);
        setArray([...arr]);

        if (barsRef.current[j] && barsRef.current[j + 1]) {
          barsRef.current[j].classList.remove("active");
          barsRef.current[j + 1].classList.remove("active");
        }
        if (eleRef.current[j] && eleRef.current[j + 1]) {
          eleRef.current[j].classList.remove("active");
          eleRef.current[j + 1].classList.remove("active");
        }
        j--;
      }

      arr[j + 1] = key;
      updateElementHeight(j + 1, key);
      setArray([...arr]);

      if (barsRef.current[i]) barsRef.current[i].classList.remove("pivot");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("pivot");
    }
    setIsSorting(false);
  };

  // Quick Sort Animation
  const quickSort = async (
    arr = [...array],
    low = 0,
    high = arr.length - 1,
    isInitial = true,
  ) => {
    if (isInitial) {
      setIsSorting(true);
      arr = [...array];
    }

    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1, false);
      await quickSort(arr, pi + 1, high, false);
    }

    if (isInitial) {
      setIsSorting(false);
    }
    return arr;
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    if (barsRef.current[high]) barsRef.current[high].classList.add("pivot");
    if (eleRef.current[high]) eleRef.current[high].classList.add("pivot");

    for (let j = low; j < high; j++) {
      if (barsRef.current[j]) barsRef.current[j].classList.add("active");
      if (eleRef.current[j]) eleRef.current[j].classList.add("active");
      await sleep(300);

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          updateArrayAndVisuals(arr, i, j);
        }
      }
      if (barsRef.current[j]) barsRef.current[j].classList.remove("active");
      if (eleRef.current[j]) eleRef.current[j].classList.remove("active");
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    updateArrayAndVisuals(arr, i + 1, high);

    if (barsRef.current[high]) barsRef.current[high].classList.remove("pivot");
    if (eleRef.current[high]) eleRef.current[high].classList.remove("pivot");
    return i + 1;
  };

  // Merge Sort Animation
  const mergeSort = async (
    arr = [...array],
    left = 0,
    right = arr.length - 1,
    isInitial = true,
  ) => {
    if (isInitial) {
      setIsSorting(true);
      arr = [...array];
    }

    if (left < right) {
      let mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid, false);
      await mergeSort(arr, mid + 1, right, false);
      await merge(arr, left, mid, right);
    }

    if (isInitial) {
      setIsSorting(false);
    }
    return arr;
  };

  const merge = async (arr, left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (barsRef.current[k]) barsRef.current[k].classList.add("active");
      if (eleRef.current[k]) eleRef.current[k].classList.add("active");
      await sleep(300);

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      updateElementHeight(k, arr[k]);
      setArray([...arr]);
      if (barsRef.current[k]) barsRef.current[k].classList.remove("active");
      if (eleRef.current[k]) eleRef.current[k].classList.remove("active");
      k++;
    }

    while (i < leftArr.length) {
      if (barsRef.current[k]) barsRef.current[k].classList.add("active");
      if (eleRef.current[k]) eleRef.current[k].classList.add("active");
      arr[k] = leftArr[i];
      updateElementHeight(k, arr[k]);
      setArray([...arr]);
      await sleep(200);
      if (barsRef.current[k]) barsRef.current[k].classList.remove("active");
      if (eleRef.current[k]) eleRef.current[k].classList.remove("active");
      i++;
      k++;
    }

    while (j < rightArr.length) {
      if (barsRef.current[k]) barsRef.current[k].classList.add("active");
      if (eleRef.current[k]) eleRef.current[k].classList.add("active");
      arr[k] = rightArr[j];
      updateElementHeight(k, arr[k]);
      setArray([...arr]);
      await sleep(200);
      if (barsRef.current[k]) barsRef.current[k].classList.remove("active");
      if (eleRef.current[k]) eleRef.current[k].classList.remove("active");
      j++;
      k++;
    }
  };

  // Heap Sort Animation
  const heapSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]];
      updateArrayAndVisuals(arr, 0, i);
      await sleep(300);

      // Call heapify on the reduced heap
      await heapify(arr, i, 0);
    }
    setIsSorting(false);
  };

  const heapify = async (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (barsRef.current[i]) barsRef.current[i].classList.add("pivot");
    if (eleRef.current[i]) eleRef.current[i].classList.add("pivot");

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      if (barsRef.current[largest])
        barsRef.current[largest].classList.add("active");
      if (eleRef.current[largest])
        eleRef.current[largest].classList.add("active");
      await sleep(300);

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      updateArrayAndVisuals(arr, i, largest);

      if (barsRef.current[largest])
        barsRef.current[largest].classList.remove("active");
      if (eleRef.current[largest])
        eleRef.current[largest].classList.remove("active");
      if (barsRef.current[i]) barsRef.current[i].classList.remove("pivot");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("pivot");

      await heapify(arr, n, largest);
    } else {
      if (barsRef.current[i]) barsRef.current[i].classList.remove("pivot");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("pivot");
    }
  };

  // Counting Sort Animation
  const countingSort = async () => {
    setIsSorting(true);
    clearCountArrays();
    let arr = [...array];

    // Create count array visualization
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);

    // Add count array visualization to DOM
    const dynamicContainer = document.getElementById("dynamic-containers");
    const countContainer = document.createElement("div");
    countContainer.id = "count-container";
    countContainer.className = "flex flex-col items-center";

    // Add title
    const title = document.createElement("h3");
    title.className = "text-lg font-semibold text-slate-800 mb-2";
    title.textContent = "Count Array";
    countContainer.appendChild(title);

    // Add bars container
    const barsContainer = document.createElement("div");
    barsContainer.className =
      "flex gap-2 items-end h-[300px] p-4 rounded-xl border-b-black border-2";
    barsContainer.style.background = "#DDDEAB";
    countContainer.appendChild(barsContainer);

    // Create count bars
    for (let i = 0; i <= max; i++) {
      const countBar = document.createElement("div");
      countBar.className =
        "count-bar rounded transition-all duration-500 border-2 border-b-black";
      countBar.style.height = "0px";
      countBar.style.width = "20px";
      countBar.innerHTML = `<div class="count-val">0</div>`;
      barsContainer.appendChild(countBar);
    }

    dynamicContainer.appendChild(countContainer);

    // Count occurrences with visualization
    for (let i = 0; i < arr.length; i++) {
      if (barsRef.current[i]) barsRef.current[i].classList.add("active");
      if (eleRef.current[i]) eleRef.current[i].classList.add("active");

      count[arr[i]]++;

      // Update count bar visualization
      const countBar = barsContainer.children[arr[i]];
      if (countBar) {
        countBar.style.height = `${count[arr[i]] * 20}px`;
        countBar.querySelector(".count-val").textContent = count[arr[i]];
      }

      await sleep(300);

      if (barsRef.current[i]) barsRef.current[i].classList.remove("active");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("active");
    }

    // Modify count array (cumulative sum)
    for (let i = 1; i <= max; i++) {
      count[i] += count[i - 1];

      // Update count bar heights
      const countBar = barsContainer.children[i];
      if (countBar) {
        countBar.style.height = `${count[i] * 20}px`;
        countBar.querySelector(".count-val").textContent = count[i];
      }

      await sleep(200);
    }

    // Build output array
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
      if (barsRef.current[i]) barsRef.current[i].classList.add("active");
      if (eleRef.current[i]) eleRef.current[i].classList.add("active");

      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;

      // Update count bar
      const countBar = barsContainer.children[arr[i]];
      if (countBar) {
        countBar.style.height = `${count[arr[i]] * 20}px`;
        countBar.querySelector(".count-val").textContent = count[arr[i]];
      }

      await sleep(300);

      if (barsRef.current[i]) barsRef.current[i].classList.remove("active");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("active");
    }

    // Copy back to original array with animation
    for (let i = 0; i < arr.length; i++) {
      if (barsRef.current[i]) barsRef.current[i].classList.add("active");
      if (eleRef.current[i]) eleRef.current[i].classList.add("active");

      arr[i] = output[i];
      updateElementHeight(i, arr[i]);
      setArray([...arr]);

      await sleep(300);

      if (barsRef.current[i]) barsRef.current[i].classList.remove("active");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("active");
    }

    // Remove count container after sorting
    setTimeout(() => {
      if (countContainer.parentNode) {
        countContainer.parentNode.removeChild(countContainer);
      }
    }, 1000);

    setIsSorting(false);
  };

  // Radix Sort Animation
  const radixSort = async () => {
    setIsSorting(true);
    clearCountArrays();
    let arr = [...array];
    let max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSortForRadix(arr, exp);
    }

    setIsSorting(false);
  };

  const countingSortForRadix = async (arr, exp) => {
    let output = new Array(arr.length);
    let count = new Array(10).fill(0);

    // Create count array visualization for current digit
    const dynamicContainer = document.getElementById("dynamic-containers");
    const countContainer = document.createElement("div");
    countContainer.id = "radix-count-container";
    countContainer.className = "flex flex-col items-center";

    // Add title
    const title = document.createElement("h3");
    title.className = "text-lg font-semibold text-slate-800 mb-2";
    title.textContent = `Digit ${exp} Count Array`;
    countContainer.appendChild(title);

    // Add bars container
    const barsContainer = document.createElement("div");
    barsContainer.className =
      "flex gap-2 items-end h-[300px] p-4 rounded-xl border-b-black border-2";
    barsContainer.style.background = "#DDDEAB";
    countContainer.appendChild(barsContainer);

    // Create count bars for digits 0-9
    for (let i = 0; i < 10; i++) {
      const countBar = document.createElement("div");
      countBar.className =
        "radix-count-bar rounded transition-all duration-500 border-2 border-b-black";
      countBar.style.height = "0px";
      countBar.style.width = "25px";
      countBar.innerHTML = `<div class="radix-count-val">0</div>`;
      barsContainer.appendChild(countBar);
    }

    dynamicContainer.appendChild(countContainer);

    // Count occurrences for current digit
    for (let i = 0; i < arr.length; i++) {
      if (barsRef.current[i]) barsRef.current[i].classList.add("active");
      if (eleRef.current[i]) eleRef.current[i].classList.add("active");

      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;

      // Update count bar visualization
      const countBar = barsContainer.children[digit];
      if (countBar) {
        countBar.style.height = `${count[digit] * 20}px`;
        countBar.querySelector(".radix-count-val").textContent = count[digit];
      }

      await sleep(200);

      if (barsRef.current[i]) barsRef.current[i].classList.remove("active");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("active");
    }

    // Modify count array (cumulative sum)
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];

      // Update count bar heights
      const countBar = barsContainer.children[i];
      if (countBar) {
        countBar.style.height = `${count[i] * 20}px`;
        countBar.querySelector(".radix-count-val").textContent = count[i];
      }

      await sleep(100);
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
      if (barsRef.current[i]) barsRef.current[i].classList.add("active");
      if (eleRef.current[i]) eleRef.current[i].classList.add("active");

      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;

      // Update count bar
      const countBar = barsContainer.children[digit];
      if (countBar) {
        countBar.style.height = `${count[digit] * 20}px`;
        countBar.querySelector(".radix-count-val").textContent = count[digit];
      }

      await sleep(300);

      if (barsRef.current[i]) barsRef.current[i].classList.remove("active");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("active");
    }

    // Copy back to original array with animation
    for (let i = 0; i < arr.length; i++) {
      if (barsRef.current[i]) barsRef.current[i].classList.add("active");
      if (eleRef.current[i]) eleRef.current[i].classList.add("active");

      arr[i] = output[i];
      updateElementHeight(i, arr[i]);
      setArray([...arr]);

      await sleep(200);

      if (barsRef.current[i]) barsRef.current[i].classList.remove("active");
      if (eleRef.current[i]) eleRef.current[i].classList.remove("active");
    }

    // Remove count container after this digit is processed
    setTimeout(() => {
      if (countContainer.parentNode) {
        countContainer.parentNode.removeChild(countContainer);
      }
    }, 500);
  };

  const sortingAlgorithms = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    quick: quickSort,
    merge: mergeSort,
    heap: heapSort,
    counting: countingSort,
    radix: radixSort,
  };

  const handleSort = () => {
    if (selectedAlgorithm && sortingAlgorithms[selectedAlgorithm]) {
      // Clear any existing count arrays when starting a new sort
      if (selectedAlgorithm === "counting" || selectedAlgorithm === "radix") {
        clearCountArrays();
      }
      sortingAlgorithms[selectedAlgorithm]();
    }
  };

  const handleReset = () => {
    setSelectedAlgorithm("");
    clearCountArrays();
    setArray(
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 200) + 50),
    );
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Sorting Visualizer</h1>

      {/* Bars */}
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          Original Array
        </h3>
        <div
          id="container"
          className="flex gap-2 items-end h-[300px] p-4 rounded-xl border-b-black border-2"
        >
          {array.map((val, idx) => (
            <div
              key={idx}
              className="bar rounded transition-all duration-500 border-2 border-b-black"
              style={{ height: `${val}px`, width: "30px" }}
            >
              <div className="bar-val">{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic count arrays will be inserted here */}
      <div
        id="dynamic-containers"
        className="flex justify-center items-start gap-8 mt-4"
      ></div>

      {/* Controls */}
      <div className="mt-4 space-y-3">
        <h3 className="text-lg font-semibold text-slate-800">
          Sorting Algorithm
        </h3>
        <div className="m-auto space-y-2">
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative">
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                disabled={isSorting}
                className="w-full bg-transparent placeholder:text-slate-500 text-slate-800 text-sm border border-slate-600 rounded pl-3 pr-8 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer disabled:opacity-50"
              >
                <option value="">Choose Algorithm</option>
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="heap">Heap Sort</option>
                <option value="counting">Counting Sort (beta)</option>
                <option value="radix">Radix Sort (beta)</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                stroke="currentColor"
                className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-4 gap-4 flex flex-col md:flex-row">
          <div className="flex gap-2 m-2">
            <button
              onClick={handleSort}
              disabled={isSorting || !selectedAlgorithm}
              className="border-b-black border-2 bg-stone-950 hover:bg-slate-100 text-white hover:text-black text-sm font-medium py-2 px-4 rounded-4xl transition duration-300 disabled:opacity-50"
            >
              {isSorting ? "Sorting..." : "Start Sort"}
            </button>

            <button
              onClick={handleReset}
              disabled={isSorting}
              className="border-b-black border-2 bg-stone-950 hover:bg-slate-100 text-white hover:text-black text-sm font-medium py-2 px-4 rounded-4xl transition duration-300 disabled:opacity-50"
            >
              Generate New Array
            </button>
          </div>
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
      </div>

      <style>{`
        .array-ele {
          border: 2px solid black;
          padding: 5px;
          margin: 2px;
        }
        #container {
          background: #DDDEAB;
        }
        .bar {
          background: #D92C54;
          border: 2px solid black;
        }
        .bar.active {
          background: #8ABB6C !important;
        }
        .bar.pivot {
          background: #FF6B6B !important;
        }
        .bar.min {
          background: #4ECDC4 !important;
        }
        .array-ele.active {
          background: #8ABB6C !important;
        }
        .array-ele.pivot {
          background: #FF6B6B !important;
        }
        .array-ele.min {
          background: #4ECDC4 !important;
        }
        .bar-val {
          display: flex; 
          justify-content: center;
          color: #DDDEAB;
          font-size: small;
          font-weight: bolder;
        }
        .count-bar, .radix-count-bar {
          background: #4ECDC4;
          border: 2px solid black;
        }
        .count-val, .radix-count-val {
          display: flex; 
          justify-content: center;
          color: #DDDEAB;
          font-size: small;
          font-weight: bolder;
          position: absolute;
          bottom: -25px;
          width: 100%;
        }
        #count-container, #radix-count-container {
          position: relative;
        }
      `}</style>
    </div>
  );
}

