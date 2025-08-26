import { INF } from '../constant';
import { Graph } from './graph';

interface DijkstraResult {
  dist: number[];
  parent: number[];
}

export function dijkstra(g: Graph, s: number): DijkstraResult {
  const dist: number[] = Array(g.n + 1).fill(INF);
  const parent: number[] = Array(g.n + 1).fill(-1);
  const visited: boolean[] = Array(g.n + 1).fill(false);

  dist[s] = 0;

  for (let i = 1; i < g.n; i++) {
    let u = -1;
    let minDist = INF;

    for (let j = 1; j <= g.n; j++) {
      if (!visited[j] && dist[j] < minDist) {
        minDist = dist[j];
        u = j;
      }
    }

    if (u === -1) {
      break;
    }
    visited[u] = true;

    for (let v = 1; v <= g.n; v++) {
      if (g.a[u][v] > 0 && !visited[v]) {
        if (dist[u] + g.a[u][v] < dist[v]) {
          dist[v] = dist[u] + g.a[u][v];
          parent[v] = u;
        }
      }
    }
  }

  return { dist, parent };
}

export function getPath(end: number, parent: number[]): number[] {
  const path: number[] = [];
  for (let v = end; v !== -1; v = parent[v]) {
    path.push(v);
  }
  return path.reverse();
}

export function runDijkstraPlayground() {
  const n = 5;
  const m = 7;
  const g = new Graph(n, m);
  const edges: [number, number, number][] = [
    [1, 2, 10],
    [1, 3, 5],
    [2, 3, 2],
    [2, 4, 1],
    [3, 2, 3],
    [3, 4, 9],
    [4, 5, 4]
  ];

  for (const [u, v, w] of edges) {
    g.add(u, v, w);
  }

  console.log('Edges:');
  edges.forEach(([u, v, w]) => {
    console.log(`[${u}] ---${w}---> [${v}]`);
  });

  const start = 1;
  const end = 5;

  const { dist, parent } = dijkstra(g, start);

  if (dist[end] === INF) {
    console.log(`No path exists from [${start}] to [${end}]`);
  } else {
    console.log(`Distance from [${start}] to [${end}]: ${dist[end]}`);
    const path = getPath(end, parent)
      .map(e => `[${e}]`)
      .join(' --> ');
    console.log(`Path: ${path}`);
  }
}
