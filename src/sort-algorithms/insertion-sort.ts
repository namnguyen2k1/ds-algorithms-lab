import { swap } from '../utils/swap';

export function insertionSort(arr: number[]) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      swap(arr, j, j - 1);
      j--;
    }
  }

  return arr;
}
