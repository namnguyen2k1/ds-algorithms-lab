import { clone } from '../utils/clone';
import { randomArr } from '../utils/random-arr';
import { bubbleSort } from './bubble-sort';
import { heapSort } from './heap-sort';
import { insertionSort } from './insertion-sort';
import { mergeSort } from './merge-sort';
import { quickSort } from './quick-sort';
import { selectionSort } from './selection-sort';
import { timSort } from './tim-sort';

export function sortAlgorithmPlayground() {
  const isSorted = (arr: number[]): boolean => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) return false;
    }
    return true;
  };

  const benchmark = (arr: number[], fn: (arr: number[]) => number[]) => {
    const input = clone(arr);
    const start = performance.now();
    const output = fn(input);
    const end = performance.now();
    return { output, time: end - start };
  };

  const testCases: number[][] = [
    [64, 25, 12, 22, 11],
    randomArr(1000),
    randomArr(10000),
    randomArr(30000),
    randomArr(70000),
    randomArr(100000)
  ];

  const algorithms: { name: string; fn: (arr: number[]) => number[] }[] = [
    { name: 'selection sort', fn: selectionSort },
    { name: 'insertion sort', fn: insertionSort },
    { name: 'bubble sort', fn: bubbleSort },
    { name: 'quick sort', fn: arr => quickSort(arr, 0, arr.length - 1) },
    { name: 'heap sort 2', fn: heapSort },
    { name: 'merge sort', fn: arr => mergeSort(arr, 0, arr.length - 1) },
    { name: 'tim sort', fn: timSort },
    { name: 'native sort', fn: arr => [...arr].sort((a, b) => a - b) }
  ];

  for (const input of testCases) {
    console.log('===================================================');
    console.log('Test case length:', input.length);
    for (const algo of algorithms) {
      const result = benchmark(input, algo.fn);
      console.log({
        name: algo.name,
        correct: isSorted(result.output),
        output: result.output,
        time: result.time.toFixed(3) + ' ms'
      });
    }
  }
}
