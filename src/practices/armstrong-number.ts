import { terminalInput } from '../utils/input-terminal';

function isArmstrong(n: number): boolean {
  let temp = n;
  const digits = n.toString().length;
  let sum = 0;

  while (temp > 0) {
    const digit = temp % 10;
    sum += Math.pow(digit, digits);
    temp = Math.floor(temp / 10);
  }

  return sum === n;
}

export async function runArmstrongPlayground() {
  const n = await terminalInput('Enter n = ', Number);

  if (isArmstrong(n)) {
    console.log(`${n} is a Armstrong number`);
  } else {
    console.log(`${n} is not a Armstrong number`);
  }
}
