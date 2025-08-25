export function randomArr(size: number, max: number = 100000): number[] {
  return Array.from({ length: size }, () => {
    return Math.floor(Math.random() * max);
  });
}
