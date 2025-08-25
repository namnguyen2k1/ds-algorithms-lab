import { swap } from '../utils/swap';

export function bubbleSort(arr: number[]) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = n - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1);
      }
    }
  }

  return arr;
}
