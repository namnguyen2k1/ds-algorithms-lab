export class Graph {
  a: number[][] = [];
  n: number;
  m: number;

  constructor(n: number, m: number) {
    this.n = n;
    this.m = m;
    this.a = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  }

  add(x: number, y: number, w: number) {
    this.a[x][y] = w;
    this.a[y][x] = w;
  }
}
