import { INF } from '../constant';
import { Edge, Graph } from './graph';

function bellmanFord(g: Graph, start: number) {
  const dist: number[] = Array(g.n + 1).fill(INF);
  const parent: number[] = Array(g.n + 1).fill(-1);

  dist[start] = 0;

  for (let i = 1; i < g.n; i++) {
    for (const { u, v, w } of g.edges) {
      if (dist[u] !== INF && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        parent[v] = u;
      }
    }
  }

  return { dist, parent };
}

function hasNegativeCycle(g: Graph, dist: number[]): boolean {
  for (const { u, v, w } of g.edges) {
    if (dist[u] !== INF && dist[u] + w < dist[v]) {
      return true;
    }
  }
  return false;
}

function getPath(end: number, parent: number[], start: number): number[] {
  if (parent[end] === -1 && end !== start) return [];
  const path: number[] = [];
  let current = end;
  while (current !== -1) {
    path.push(current);
    if (current === start) break;
    current = parent[current];
  }
  return path.reverse();
}

export function runBellmanFordPlayground() {
  const n = 5;
  const g = new Graph(n);
  const edges: Edge[] = [
    { u: 1, v: 2, w: 6 },
    { u: 1, v: 3, w: 7 },
    { u: 2, v: 3, w: 8 },
    { u: 2, v: 4, w: 5 },
    { u: 2, v: 5, w: -4 },
    { u: 3, v: 4, w: -3 },
    { u: 3, v: 5, w: 9 },
    { u: 4, v: 2, w: -2 },
    { u: 5, v: 4, w: 7 }
  ];

  for (const edge of edges) {
    g.add(edge.u, edge.v, edge.w);
  }

  console.log('Edges:');
  g.edges.forEach(({ u, v, w }) => console.log(`[${u}] ---(${w})---> [${v}]`));

  const start = 1;
  const end = 5;

  const { dist, parent } = bellmanFord(g, start);

  if (dist[end] === INF) {
    console.log(`No path exists from [${start}] to [${end}]`);
  } else {
    console.log(`Distance from [${start}] to [${end}]: ${dist[end]}`);
    const path = getPath(end, parent, start)
      .map(e => `[${e}]`)
      .join(' --> ');
    console.log(`Path: ${path}`);
  }

  if (hasNegativeCycle(g, dist)) {
    console.log('Negative cycle exists');
  } else {
    console.log('No negative cycle exists');
  }
}
