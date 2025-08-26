export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];

  let min = arr[0];
  let max = arr[0];

  for (const num of arr) {
    if (num < min) min = num;
    if (num > max) max = num;
  }

  const range = max - min + 1;
  const count = new Array(range).fill(0);

  for (const num of arr) {
    count[num - min]++;
  }
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  const output = new Array(arr.length);

  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    output[count[num - min] - 1] = num;
    count[num - min]--;
  }

  return output;
}
