import { swap } from '../utils/swap';

export function brickSort(arr: number[]) {
  const n = arr.length;
  let isSorted = false;

  while (!isSorted) {
    isSorted = true;

    for (let i = 0; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        isSorted = false;
      }
    }

    for (let i = 1; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        isSorted = false;
      }
    }
  }
  return arr;
}
