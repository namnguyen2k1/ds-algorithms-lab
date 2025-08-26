import { terminalInput } from '../utils/input-terminal';

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0) {
    console.log(`${n} is divisible by 2`);
    return false;
  }
  if (n % 3 === 0) {
    console.log(`${n} is divisible by 3`);
    return false;
  }

  const maxCheck = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= maxCheck; i += 6) {
    if (n % i === 0) {
      console.log(`${n} is divisible by ${i}`);
      return false;
    }
    if (n % (i + 2) === 0) {
      console.log(`${n} is divisible by ${i + 2}`);
      return false;
    }
  }

  return true;
}

export async function runPrimePlayground() {
  const n = await terminalInput('Enter n = ', Number);

  if (isPrime(n)) {
    console.log(`${n} is a prime number`);
  } else {
    console.log(`${n} is not a prime number`);
  }
}
