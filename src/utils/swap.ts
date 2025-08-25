export function swap<T = any>(arr: T[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export function swap2<T = any>(arr: T[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function swapNumbers(arr: number[], i: number, j: number) {
  if (i === j) return;
  arr[i] = arr[i] ^ arr[j];
  arr[j] = arr[i] ^ arr[j];
  arr[i] = arr[i] ^ arr[j];
}
