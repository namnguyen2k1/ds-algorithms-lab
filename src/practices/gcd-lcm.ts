import { terminalInput } from '../utils/input-terminal';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  return (a / gcd(a, b)) * b;
}

export async function runGcdLcmPlayground() {
  const a = await terminalInput('Enter a = ', Number);
  const b = await terminalInput('Enter b = ', Number);

  console.log(`GCD of ${a} and ${b} is:`, gcd(a, b));
  console.log(`LCM of ${a} and ${b} is:`, lcm(a, b));
}
