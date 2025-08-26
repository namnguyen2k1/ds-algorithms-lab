import { terminalInput } from '../utils/input-terminal';

const cache: number[] = [];

function fibonacci(n: number): number {
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    cache[n] = 1;
    return 1;
  }
  if (n === 2) {
    cache[n] = 2;
    return 2;
  }
  if (cache[n] !== undefined) {
    return cache[n];
  }

  cache[n] = fibonacci(n - 1) + fibonacci(n - 2);

  return cache[n];
}

export async function runFibonacciPlayground() {
  const n = await terminalInput('Enter n = ', Number);

  console.log(`The ${n}th Fibonacci number is: ${fibonacci(n)}`);
  const numbers = cache.slice(1, n + 1).join(' ');
  console.log(`Fibonacci sequence up to the ${n}th term: ${numbers}`);
}
