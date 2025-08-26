export const MAX = 100;
export const INF = 9999;

export let pi: number[] = new Array(MAX).fill(INF);
export let p: number[] = new Array(MAX).fill(-1);

export function getGraphPath(start: number, end: number, parent: number[]): number[] {
  const path: number[] = [];
  let current = end;

  while (current !== 0 && current !== -1) {
    path.push(current);
    if (current === start) break;
    current = parent[current];
  }

  if (path.length === 0 || path[path.length - 1] !== start) {
    return [];
  }

  return path.reverse();
}

export function printParentEdges(parent: number[], n: number) {
  const parts: string[] = [];

  for (let i = 1; i <= n; i++) {
    parts.push(`${i}:${parent[i]}`);
  }
  console.log('\nEdge:Parent', parts);
}

export function printSearchTree(parent: number[], n: number, title: string) {
  console.log(title);
  const children: number[][] = Array.from({ length: n + 1 }, () => []);

  for (let v = 1; v <= n; v++) {
    const p = parent[v];
    if (p > 0) {
      children[p].push(v);
    }
  }

  function dfsPrint(u: number, prefix: string, isLast: boolean) {
    const connector = prefix.length === 0 ? '' : isLast ? '└─ ' : '├─ ';
    console.log(prefix + connector + u);

    const newPrefix = prefix + (isLast ? ' ' : '│  ');
    children[u].forEach((child, idx) => {
      const last = idx === children[u].length - 1;
      dfsPrint(child, newPrefix, last);
    });
  }

  for (let v = 1; v <= n; v++) {
    if (parent[v] === 0) {
      dfsPrint(v, '', true);
    }
  }
}
