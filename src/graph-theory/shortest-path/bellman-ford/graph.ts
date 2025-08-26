export interface Edge {
  u: number;
  v: number;
  w: number;
}

export class Graph {
  edges: Edge[] = [];
  n: number;
  m: number;

  constructor(n: number) {
    this.n = n;
    this.m = 0;
  }

  add(u: number, v: number, w: number) {
    this.edges.push({ u, v, w });
    this.m++;
  }
}
