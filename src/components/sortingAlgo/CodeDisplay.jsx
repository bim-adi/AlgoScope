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
    javascript: `/**
 * Merges two sorted arrays into one sorted array.
 * @param {Array<number>} arr1 - The first sorted array.
 * @param {Array<number>} arr2 - The second sorted array.
 * @returns {Array<number>} - The merged sorted array.
 */
function merge(arr1, arr2) {
  let results = [];
  let i = 0; // Pointer for arr1
  let j = 0; // Pointer for arr2

  // Loop while there are still elements in both arrays
  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }

  // Add remaining elements from arr1 (if any)
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }

  // Add remaining elements from arr2 (if any)
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }

  return results;
}

/**
 * Sorts an array of numbers using the Merge Sort algorithm.
 * @param {Array<number>} arr - The array to sort.
 * @returns {Array<number>} - The new sorted array.
 */
function mergeSort(arr) {
  // Base case: An array with 0 or 1 element is already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Find the middle of the array
  let mid = Math.floor(arr.length / 2);
  
  // Recursively sort the left half
  let left = mergeSort(arr.slice(0, mid));
  
  // Recursively sort the right half
  let right = mergeSort(arr.slice(mid));

  // Merge the two sorted halves
  return merge(left, right);
}

// Example usage:
const arr = [10, 24, 76, 73, 72, 1, 9];
console.log("Original array:", arr);
const sortedArr = mergeSort(arr);
console.log("Sorted array:", sortedArr);`,
    python: `def merge(arr, l, m, r):
    n1 = m - l + 1
    n2 = r - m
    L = [0] * (n1)
    R = [0] * (n2)
    for i in range(0, n1): L[i] = arr[l + i]
    for j in range(0, n2): R[j] = arr[m + 1 + j]
    # Merge the temp arrays back into arr[l..r]
    i = 0     # Initial index of first subarray
    j = 0     # Initial index of second subarray
    k = l     # Initial index of merged subarray
    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1
    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1
    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1

def mergeSort(arr, l, r):
    if l < r:
        m = l+(r-l)//2
        mergeSort(arr, l, m)
        mergeSort(arr, m+1, r)
        merge(arr, l, m, r)`,
    java: `public class Merge {
    private static void merge(int[] toSort, int s, int m, int e) {
        int[] toCopy = new int[e - s + 1];
        int j = m + 1, i = s, k = 0;
        while(i <= m && j <= e) {
            if(toSort[i] < toSort[j]) toCopy[k++] = toSort[i++];
            else toCopy[k++] = toSort[j++];
        } while(i <= m) toCopy[k++] = toSort[i++];
        while(j <= e) toCopy[k++] = toSort[j++];
        for(int x = 0; x < k; x++) toSort[x + s] = toCopy[x];
    }

    private static void mergeSort(int[] toSort, int s, int e) {
        if(s < e) {
            int mid = (s + e) / 2;
            mergeSort(toSort, s, mid);
            mergeSort(toSort, mid + 1, e);
            merge(toSort, s, mid, e);
        }
    }

    public static int[] mergeSort(int[] toSort) {
        mergeSort(toSort, 0, toSort.length - 1);
        return toSort;
    }
}
`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int> &toSort, int s, int mid, int e) {
    int i = s, j = mid + 1, k = 0;
    vector<int> sorted(e - s + 1);
    while(i <= mid && j <= e) {
        if(toSort[i] < toSort[j]) sorted[k++] = toSort[i++];
        else sorted[k++] = toSort[j++];
    } while (i <= mid) sorted[k++] = toSort[i++];
    while(j <= e) sorted[k++] = toSort[j++];
    for(int x = 0; x < k; x++) toSort[x + s] = sorted[x];
}

void mergeSort(vector<int> &toSort, int s, int e) {
    if( s < e) {
        int m = (s + e) / 2;
        mergeSort(toSort, s, m);
        mergeSort(toSort, m + 1, e);    
        merge(toSort, s, m, e);
    }
}

int main() {
    vector<int> toSort = {5, 2, 8, 3, 1, 6, 4};
    int size = toSort.size();
    cout << "Before sorting: ";
    for(int i = 0; i < size; i++) cout << toSort[i] << " ";
    
    cout << endl;
    mergeSort(toSort, 0, size - 1);
    cout << "After sorting: ";
    for(int i = 0; i < size; i++) cout << toSort[i] << " ";
    cout << endl;
}`,
  },
  heap: {
    javascript: `
`,
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
  radix: {
    javascript: `function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    nums = [].concat(...digitBuckets);
  }
  return nums;
}

// Example usage:
const arr = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Original array:", arr);
const sortedArr = radixSort(arr);
console.log("Sorted array:", sortedArr);`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>

int getMax(std::vector<int>& arr) {
    int mx = arr[0];
    for (size_t i = 1; i < arr.size(); i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}

void countSort(std::vector<int>& arr, int exp) {
    int n = arr.size();
    std::vector<int> output(n);
    std::vector<int> count(10, 0);

    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(std::vector<int>& arr) {
    if (arr.empty()) return;
    int m = getMax(arr);

    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, exp);
}

void printArray(const std::vector<int>& arr) {
    for (int val : arr) {
        std::cout << val << " ";
    }
    std::cout << "\n";
}

int main() {
    std::vector<int> arr = { 170, 45, 75, 90, 802, 24, 2, 66 };
    
    std::cout << "Original array: ";
    printArray(arr);

    radixSort(arr);
    
    std::cout << "Sorted array: ";
    printArray(arr);
    
    return 0;
}`,
    python: `def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    for i in range(n):
        index = (arr[i] // exp) % 10
        count[index] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    i = n - 1
    while i >= 0:
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
        i -= 1

    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    if not arr:
        return arr
        
    max_num = max(arr)
    exp = 1
    while max_num // exp > 0:
        counting_sort(arr, exp)
        exp *= 10
    return arr

# Example usage:
arr = [170, 45, 75, 90, 802, 24, 2, 66]
print("Original array:", arr)
radix_sort(arr)
print("Sorted array:", arr)`,
    java: `import java.util.Arrays;
import java.util.Collections;

class RadixSort {

    static int getMax(int arr[], int n) {
        int mx = arr[0];
        for (int i = 1; i < n; i++)
            if (arr[i] > mx)
                mx = arr[i];
        return mx;
    }

    static void countSort(int arr[], int n, int exp) {
        int output[] = new int[n];
        int i;
        int count[] = new int[10];
        Arrays.fill(count, 0);

        for (i = 0; i < n; i++)
            count[(arr[i] / exp) % 10]++;

        for (i = 1; i < 10; i++)
            count[i] += count[i - 1];

        for (i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        for (i = 0; i < n; i++)
            arr[i] = output[i];
    }

    static void radixSort(int arr[], int n) {
        if (n == 0) return;
        int m = getMax(arr, n);

        for (int exp = 1; m / exp > 0; exp *= 10)
            countSort(arr, n, exp);
    }

    public static void main(String[] args) {
        int arr[] = { 170, 45, 75, 90, 802, 24, 2, 66 };
        int n = arr.length;
        
        System.out.println("Original array: " + Arrays.toString(arr));
        radixSort(arr, n);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`,
  },
  counting: {
    java: `import java.util.Arrays;

class CountingSort {

    public static void sort(int[] arr) {
        if (arr.length == 0) {
            return;
        }

        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        int[] count = new int[max + 1];

        for (int num : arr) {
            count[num]++;
        }

        int sortedIndex = 0;
        for (int i = 0; i <= max; i++) {
            while (count[i] > 0) {
                arr[sortedIndex] = i;
                sortedIndex++;
                count[i]--;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = { 4, 2, 2, 8, 3, 3, 1, 0, 7 };
        System.out.println("Original array: " + Arrays.toString(arr));
        sort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`,
    python: `def counting_sort(arr):
    if not arr:
        return []

    max_val = max(arr)
    
    count = [0] * (max_val + 1)

    for num in arr:
        count[num] += 1

    sorted_index = 0
    for i in range(max_val + 1):
        while count[i] > 0:
            arr[sorted_index] = i
            sorted_index += 1
            count[i] -= 1
    return arr

# Example usage:
arr = [4, 2, 2, 8, 3, 3, 1, 0, 7]
print("Original array:", arr)
counting_sort(arr)
print("Sorted array:", arr)`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm> // For std::max_element

void countingSort(std::vector<int>& arr) {
    if (arr.empty()) {
        return;
    }

    int max = *std::max_element(arr.begin(), arr.end());

    std::vector<int> count(max + 1, 0);

    for (int num : arr) {
        count[num]++;
    }

    int sortedIndex = 0;
    for (int i = 0; i <= max; i++) {
        while (count[i] > 0) {
            arr[sortedIndex] = i;
            sortedIndex++;
            count[i]--;
        }
    }
}

void printArray(const std::vector<int>& arr) {
    for (int val : arr) {
        std::cout << val << " ";
    }
    std::cout << "\n";
}

int main() {
    std::vector<int> arr = { 4, 2, 2, 8, 3, 3, 1, 0, 7 };
    
    std::cout << "Original array: ";
    printArray(arr);

    countingSort(arr);
    
    std::cout << "Sorted array: ";
    printArray(arr);
    
    return 0;
}`,
    javascript: `function countingSort(arr) {
  if (arr.length === 0) {
    return [];
  }

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  const count = new Array(max + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }

  let sortedIndex = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      arr[sortedIndex] = i;
      sortedIndex++;
      count[i]--;
    }
  }
  return arr;
}

// Example usage:
const arr = [4, 2, 2, 8, 3, 3, 1, 0, 7];
console.log("Original array:", arr);
countingSort(arr);
console.log("Sorted array:", arr);`,
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
    <div className="m-auto p-6 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-slate-700 w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-row gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 ml-2">
          {algorithm
            ? `${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`
            : 'Code Viewer'}
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
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
