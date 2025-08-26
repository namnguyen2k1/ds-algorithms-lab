import { swap } from '../utils/swap';

export function shakerSort(arr: number[]) {
  let left = 0;
  let right = arr.length - 1;
  let k: number;

  while (left < right) {
    k = 0;

    for (let i = left; i < right; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        k = i;
      }
    }
    right = k;

    for (let i = right; i > left; i--) {
      if (arr[i - 1] > arr[i]) {
        swap(arr, i - 1, i);
        k = i;
      }
    }
    left = k;
  }

  return arr;
}
