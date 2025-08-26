import { List } from './list';

export class Graph {
  a: number[][];
  n: number;
  m: number;

  constructor(n: number, m: number) {
    this.n = n;
    this.m = m;
    this.a = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  }

  add(x: number, y: number): void {
    this.a[x][y] = 1;
    this.a[y][x] = 1;
  }

  adjacent(x: number, y: number): boolean {
    return this.a[x][y] === 1;
  }

  degree(x: number): number {
    let deg = 0;

    for (let i = 1; i <= this.n; i++) {
      if (this.a[i][x] === 1) {
        deg++;
      }
    }

    return deg;
  }

  neighbors(x: number): List {
    const list = new List();

    for (let i = 1; i <= this.n; i++) {
      if (this.a[i][x] === 1) {
        list.push(i);
      }
    }

    return list;
  }
}
