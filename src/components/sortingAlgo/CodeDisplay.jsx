import React, { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism'

const codeSnippets = {
  bubble: {
    javascript: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      highlight(j, j + 1);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapVisuals(j, j + 1);
      }
      dehighlight(j, j + 1);
    }
  }
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            highlight(j, j + 1)
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swap_visuals(j, j + 1)
            dehighlight(j, j + 1)`,
    java: `public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            highlight(j, j + 1);
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapVisuals(j, j + 1);
            }
            dehighlight(j, j + 1);
        }
    }
}`,
    cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            highlight(j, j + 1);
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapVisuals(j, j + 1);
            }
            dehighlight(j, j + 1);
        }
    }
}`,
  },
  selection: {
    javascript: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    highlightPivot(i);
    for (let j = i + 1; j < arr.length; j++) {
      highlightActive(j);
      if (arr[j] < arr[minIdx]) {
        if (minIdx !== i) dehighlightMin(minIdx);
        minIdx = j;
        highlightMin(minIdx);
      }
      dehighlightActive(j);
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swapVisuals(i, minIdx);
    }
    dehighlightPivot(i);
    dehighlightMin(minIdx);
  }
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        highlight_pivot(i)
        for j in range(i + 1, n):
            highlight_active(j)
            if arr[j] < arr[min_idx]:
                if min_idx != i:
                    dehighlight_min(min_idx)
                min_idx = j
                highlight_min(min_idx)
            dehighlight_active(j)
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            swap_visuals(i, min_idx)
        dehighlight_pivot(i)
        dehighlight_min(min_idx)`,
    java: `public void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        int minIdx = i;
        highlightPivot(i);
        for (int j = i + 1; j < n; j++) {
            highlightActive(j);
            if (arr[j] < arr[minIdx]) {
                if (minIdx != i) {
                    dehighlightMin(minIdx);
                }
                minIdx = j;
                highlightMin(minIdx);
            }
            dehighlightActive(j);
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
            swapVisuals(i, minIdx);
        }
        dehighlightPivot(i);
        dehighlightMin(minIdx);
    }
}`,
    cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        int minIdx = i;
        highlightPivot(i);
        for (int j = i + 1; j < n; j++) {
            highlightActive(j);
            if (arr[j] < arr[minIdx]) {
                if (minIdx != i) {
                    dehighlightMin(minIdx);
                }
                minIdx = j;
                highlightMin(minIdx);
            }
            dehighlightActive(j);
        }
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
            swapVisuals(i, minIdx);
        }
        dehighlightPivot(i);
        dehighlightMin(minIdx);
    }
}`,
  },
  insertion: {
    javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    highlightPivot(i);
    sleep(300);
    while (j >= 0 && arr[j] > key) {
      highlightActive(j, j + 1);
      arr[j + 1] = arr[j];
      updateElementHeight(j + 1, arr[j]);
      dehighlightActive(j, j + 1);
      j--;
    }
    arr[j + 1] = key;
    updateElementHeight(j + 1, key);
    dehighlightPivot(i);
  }
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        highlight_pivot(i)
        sleep(300)
        while j >= 0 and arr[j] > key:
            highlight_active(j, j + 1)
            arr[j + 1] = arr[j]
            update_element_height(j + 1, arr[j])
            dehighlight_active(j, j + 1)
            j -= 1
        arr[j + 1] = key
        update_element_height(j + 1, key)
        dehighlight_pivot(i)`,
    java: `public void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        highlightPivot(i);
        sleep(300);
        while (j >= 0 && arr[j] > key) {
            highlightActive(j, j + 1);
            arr[j + 1] = arr[j];
            updateElementHeight(j + 1, arr[j]);
            dehighlightActive(j, j + 1);
            j = j - 1;
        }
        arr[j + 1] = key;
        updateElementHeight(j + 1, key);
        dehighlightPivot(i);
    }
}`,
    cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        highlightPivot(i);
        sleep(300);
        while (j >= 0 && arr[j] > key) {
            highlightActive(j, j + 1);
            arr[j + 1] = arr[j];
            updateElementHeight(j + 1, arr[j]);
            dehighlightActive(j, j + 1);
            j = j - 1;
        }
        arr[j + 1] = key;
        updateElementHeight(j + 1, key);
        dehighlightPivot(i);
    }
}`,
  },
  quick: {
    javascript: `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  highlightPivot(high);
  for (let j = low; j < high; j++) {
    highlightActive(j);
    if (arr[j] < pivot) {
      i++;
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swapVisuals(i, j);
      }
    }
    dehighlightActive(j);
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  swapVisuals(i + 1, high);
  dehighlightPivot(high);
  return i + 1;
}`,
    python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    highlight_pivot(high)
    for j in range(low, high):
        highlight_active(j)
        if arr[j] < pivot:
            i += 1
            if i != j:
                arr[i], arr[j] = arr[j], arr[i]
                swap_visuals(i, j)
        dehighlight_active(j)
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    swap_visuals(i + 1, high)
    dehighlight_pivot(high)
    return i + 1`,
    java: `public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    highlightPivot(high);
    for (int j = low; j < high; j++) {
        highlightActive(j);
        if (arr[j] < pivot) {
            i++;
            if (i != j) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                swapVisuals(i, j);
            }
        }
        dehighlightActive(j);
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    swapVisuals(i + 1, high);
    dehighlightPivot(high);
    return i + 1;
}`,
    cpp: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    highlightPivot(high);
    for (int j = low; j < high; j++) {
        highlightActive(j);
        if (arr[j] < pivot) {
            i++;
            if (i != j) {
                swap(arr[i], arr[j]);
                swapVisuals(i, j);
            }
        }
        dehighlightActive(j);
    }
    swap(arr[i + 1], arr[high]);
    swapVisuals(i + 1, high);
    dehighlightPivot(high);
    return i + 1;
}`,
  },
  merge: {
    javascript: `function mergeSort(arr, left, right) {
  if (left < right) {
    let mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
}

function merge(arr, left, mid, right) {
  let leftArr = arr.slice(left, mid + 1);
  let rightArr = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  while (i < leftArr.length && j < rightArr.length) {
    highlightActive(k);
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    updateElementHeight(k, arr[k]);
    dehighlightActive(k);
    k++;
  }
  while (i < leftArr.length) { /* ... */ }
  while (j < rightArr.length) { /* ... */ }
}`,
    python: `def merge_sort(arr, left, right):
    if left < right:
        mid = (left + right) // 2
        merge_sort(arr, left, mid)
        merge_sort(arr, mid + 1, right)
        merge(arr, left, mid, right)

def merge(arr, left, mid, right):
    left_arr = arr[left : mid + 1]
    right_arr = arr[mid + 1 : right + 1]
    i = j = 0
    k = left
    while i < len(left_arr) and j < len(right_arr):
        highlight_active(k)
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        update_element_height(k, arr[k])
        dehighlight_active(k)
        k += 1
    # ... copy remaining elements ...`,
    java: `public void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(int[] arr, int left, int mid, int right) {
    int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
    int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);
    int i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        highlightActive(k);
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        updateElementHeight(k, arr[k]);
        dehighlightActive(k);
        k++;
    }
    // ... copy remaining elements ...
}`,
    cpp: `void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(int arr[], int left, int mid, int right) {
    // ... implementation ...
}`,
  },
  heap: {
    javascript: `function heapSort(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swapVisuals(0, i);
    heapify(arr, i, 0);
  }
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  highlightPivot(i);
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    highlightActive(largest);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    swapVisuals(i, largest);
    dehighlightActive(largest);
    dehighlightPivot(i);
    heapify(arr, n, largest);
  } else {
    dehighlightPivot(i);
  }
}`,
    python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        swap_visuals(0, i)
        heapify(arr, i, 0)

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    highlight_pivot(i)
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        highlight_active(largest)
        arr[i], arr[largest] = arr[largest], arr[i]
        swap_visuals(i, largest)
        dehighlight_active(largest)
        dehighlight_pivot(i)
        heapify(arr, n, largest)
    else:
        dehighlight_pivot(i)`,
    java: `public void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        swapVisuals(0, i);
        heapify(arr, i, 0);
    }
}

void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    highlightPivot(i);
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != i) {
        highlightActive(largest);
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        swapVisuals(i, largest);
        dehighlightActive(largest);
        dehighlightPivot(i);
        heapify(arr, n, largest);
    } else {
        dehighlightPivot(i);
    }
}`,
    cpp: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    highlightPivot(i);
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != i) {
        highlightActive(largest);
        swap(arr[i], arr[largest]);
        swapVisuals(i, largest);
        dehighlightActive(largest);
        dehighlightPivot(i);
        heapify(arr, n, largest);
    } else {
        dehighlightPivot(i);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        swapVisuals(0, i);
        heapify(arr, i, 0);
    }
}`,
  },
}
export const CodeDisplay = ({ algorithm }) => {
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState('vscDarkPlus')
  const [style, setStyle] = useState(themes.vscDarkPlus)

  useEffect(() => {
    setStyle(themes[theme])
  }, [theme])

  const code = algorithm ? codeSnippets[algorithm]?.[language] : ''

  return (
    <div className="mt-8 mx-8 p-6 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-slate-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="w-5 h-5 rounded-full bg-red-500"></div>
        <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
        <div className="w-5 h-5 rounded-full bg-green-500"></div>
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 ml-2">
          {algorithm
            ? `${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`
            : 'Select an Algorithm'}
        </h3>
        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="flex-1 sm:flex-none bg-slate-700 text-white text-sm rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:bg-slate-600"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="flex-1 sm:flex-none bg-slate-700 text-white text-sm rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-slate-600"
          >
            <option value="vscDarkPlus">VSC Dark Plus</option>
            <option value="atomDark">Atom Dark</option>
            <option value="dracula">Dracula</option>
            <option value="solarizedlight">Solarized Light</option>
            <option value="github">Github</option>
          </select>
        </div>
      </div>
      {algorithm ? (
        <div className="rounded-lg overflow-hidden border border-slate-600 shadow-inner">
          <SyntaxHighlighter
            language={language}
            style={style}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.95rem',
              lineHeight: '1.6',
            }}
            showInlineLineNumbers={true}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div className="h-[400px] flex flex-col items-center justify-center text-slate-400 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-600">
          <svg
            className="w-16 h-16 mb-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <p className="text-lg font-medium">
            Select an algorithm to view code
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Choose an algorithm from the visualization
          </p>
        </div>
      )}
    </div>
  )
}

