function merge(arr: number[], l: number, m: number, r: number) {
  const n1 = m - l + 1;
  const n2 = r - m;

  const leftArr: number[] = arr.slice(l, m + 1);
  const rightArr: number[] = arr.slice(m + 1, r + 1);

  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }
  while (j < n2) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}

export function mergeSort(arr: number[], l: number, r: number) {
  if (l < r) {
    const m = l + Math.floor((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
  return arr;
}
