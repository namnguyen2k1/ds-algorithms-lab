import { swap } from '../utils/swap';

function pushDown(arr: number[], n: number, i: number) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    swap(arr, i, largest);
    pushDown(arr, n, largest);
  }
}

export function heapSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    pushDown(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i);
    pushDown(arr, i, 0);
  }

  return arr;
}
