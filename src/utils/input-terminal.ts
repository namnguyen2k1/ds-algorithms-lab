import { stdin, stdout } from 'node:process';
import readline from 'node:readline/promises';

export async function terminalInput<T = string>(prompt: string, parser: (input: string) => T = x => x as unknown as T) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const input = await rl.question(prompt);
    return parser(input);
  } finally {
    rl.close();
  }
}
