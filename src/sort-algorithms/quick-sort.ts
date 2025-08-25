import { swap } from '../utils/swap';

export function quickSort(arr: number[], l: number, r: number) {
  if (l <= r) {
    const key = arr[Math.floor((l + r) / 2)];
    let i = l;
    let j = r;

    while (i <= j) {
      while (arr[i] < key) i++;
      while (arr[j] > key) j--;
      if (i <= j) {
        swap(arr, i, j);
        i++;
        j--;
      }
    }
    if (l < j) quickSort(arr, l, j);
    if (r > i) quickSort(arr, i, r);
  }

  return arr;
}
