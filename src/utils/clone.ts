export function clone<T = any>(arr: T[]) {
  return [...arr];
}

export function clone2<T = any>(arr: T[]) {
  return arr.map(item => item);
}

export function clone3<T = any>(arr: T[]) {
  return JSON.parse(JSON.stringify(arr)) as T[];
}
