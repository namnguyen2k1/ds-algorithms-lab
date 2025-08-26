import { terminalInput } from '../utils/input-terminal';

/**
 * @param aux (auxiliary)
 */
function solve(n: number, from: string, aux: string, to: string) {
  if (n === 1) {
    console.log(`Move disk from ${from} to ${to}`);
    return;
  }
  solve(n - 1, from, to, aux);
  console.log(`Move disk from ${from} to ${to}`);
  solve(n - 1, aux, from, to);
}

export async function runTowerOfHanoiPlayground() {
  const n = await terminalInput('Enter the number of disks: ', Number);

  const from = 'A';
  const aux = 'B';
  const to = 'C';

  console.log(`\nSolution for ${n} disks:`);

  solve(n, from, aux, to);

  console.log(`\nTotal moves: ${Math.pow(2, n) - 1}`);
}
