import { Graph } from './graph';
import { getGraphPath, MAX, printParentEdges, printSearchTree } from './helper';
import { Queue } from './queue';

export function bfs(graph: Graph, start: number, parent: number[]): number[] {
  const queue = new Queue();
  const visited: boolean[] = Array(graph.n + 1).fill(false);
  const order: number[] = [];

  queue.makeNull();
  queue.push(start);
  parent[start] = 0;
  visited[start] = true;

  while (!queue.isEmpty()) {
    const u = queue.top();

    if (u === undefined) {
      break;
    }
    queue.pop();
    order.push(u);
    const neighbors = graph.neighbors(u);

    for (let i = 1; i <= neighbors.size(); i++) {
      const v = neighbors.elementAt(i);

      if (v !== undefined && !visited[v]) {
        queue.push(v);
        visited[v] = true;
        parent[v] = u;
      }
    }
  }

  return order;
}

export function runBFSPlayground() {
  (() => {
    console.log('\n[BFS Playground]');
    const n = 30;
    const edges = [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 16],
      [16, 17],
      [17, 18],
      [18, 19],
      [19, 20],
      [20, 21],
      [21, 22],
      [22, 23],
      [23, 24],
      [24, 25],
      [25, 26],
      [26, 27],
      [27, 28],
      [28, 29],
      [29, 30],

      [1, 10],
      [5, 15],
      [10, 20],
      [15, 25],
      [20, 30],
      [3, 12],
      [8, 18],
      [13, 22],
      [17, 27],
      [7, 14],
      [11, 29]
    ];
    const parent: number[] = Array(MAX).fill(-1);
    const mark: boolean[] = Array(MAX).fill(false);
    const graph = new Graph(n, edges.length);

    console.log('Edges:', ...edges);
    for (const [u, v] of edges) {
      graph.add(u, v);
    }

    for (let i = 1; i <= n; i++) {
      if (!mark[i]) {
        const order = bfs(graph, i, parent);
        for (const v of order) {
          mark[v] = true;
        }
      }
    }

    printParentEdges(parent, n);
    printSearchTree(parent, n, '\nBFS Tree');

    const path = getGraphPath(1, n, parent);
    if (path.length) {
      console.log('\nPath:', path.join(' -> '));
    } else {
      console.log('Path not found!');
    }
  })();
}
