import { randomArr } from '../utils/random-arr';

type ElementType = number;

export class Stack<T = ElementType> {
  private elements: T[] = [];
  private readonly maxLength: number;

  constructor(size: number = 100) {
    this.maxLength = size;
  }

  public clear(): void {
    this.elements = [];
  }

  public isEmpty(): boolean {
    return this.elements.length === 0;
  }

  public isFull(): boolean {
    return this.elements.length >= this.maxLength;
  }

  public push(x: T): void {
    if (this.isFull()) {
      console.warn(`Stack is full! (adding ${x})`);
      return;
    }
    this.elements.push(x);
  }

  public pop(): T | undefined {
    if (this.isEmpty()) {
      console.warn('Stack is empty!');
      return undefined;
    }
    return this.elements.pop();
  }

  public top(): T | undefined {
    if (this.isEmpty()) {
      console.log('Stack is empty!');
      return undefined;
    }
    return this.elements[this.elements.length - 1];
  }

  public display(): T[] {
    return [...this.elements];
  }

  public size(): number {
    return this.elements.length;
  }
}

export function runStackPlayground() {
  const log = (s: Stack) => ({
    data: s.display(),
    size: s.size(),
    top: s.top(),
    empty: s.isEmpty(),
    full: s.isFull()
  });
  const arr = randomArr(12);
  const stack = new Stack<number>(10);

  console.log('Stack pushed:', arr);
  arr.forEach(n => stack.push(n));
  console.log('Stack ', log(stack));
  console.log('Stack popped:', stack.pop());
  console.log('Stack ', log(stack));
}
