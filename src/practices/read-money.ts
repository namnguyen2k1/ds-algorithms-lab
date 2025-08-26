import { terminalInput } from '../utils/input-terminal';

const DIGITS = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const UNITS = ['', ' nghìn', ' triệu', ' tỉ', ' nghìn tỉ', ' triệu tỉ', ' tỉ tỉ', ' nghìn tỉ tỉ'];

function readThreeDigits(number: bigint, isFirstGroup: boolean): string {
  if (number === 0n) return '';

  const hundreds = number / 100n;
  const tens = (number % 100n) / 10n;
  const units = number % 10n;
  const parts: string[] = [];

  if (hundreds > 0n) {
    parts.push(`${DIGITS[Number(hundreds)]} trăm`);
  } else if (!isFirstGroup && (tens > 0n || units > 0n)) {
    parts.push('không trăm');
  }

  if (tens === 0n && units > 0n && !isFirstGroup && hundreds !== 0n) {
    parts.push('lẻ');
  } else if (tens === 1n) {
    parts.push('mười');
  } else if (tens > 1n) {
    parts.push(`${DIGITS[Number(tens)]} mươi`);
  }

  if (units > 0n) {
    if (units === 1n && tens > 1n) {
      parts.push('mốt');
    } else if (units === 5n && tens >= 1n) {
      parts.push('lăm');
    } else {
      parts.push(DIGITS[Number(units)]);
    }
  }

  return parts.join(' ');
}

export function readMoney(amount: bigint) {
  if (amount === 0n) return 'không';

  const parts: bigint[] = [];
  let n = amount;

  const THOUSAND = 1000n;

  while (n > 0n) {
    parts.unshift(n % THOUSAND);
    n = n / THOUSAND;
  }

  const words: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const isFirstGroup = i === 0;
    const text = readThreeDigits(part, isFirstGroup);
    if (text) {
      const unit = UNITS[parts.length - i - 1];
      words.push(text + unit);
    }
  }

  const speech = words.join(' ').replace(/\s+/g, ' ').trim() + ' đồng';
  const format = parts.join('.') + ' (vnđ)';

  return { speech, format };
}

export async function runReadMoneyPlayground() {
  const input = await terminalInput('Enter money = ', BigInt);
  console.log('Output', readMoney(input));
}
