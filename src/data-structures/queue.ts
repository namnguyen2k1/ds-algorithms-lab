import { randomArr } from '../utils/random-arr';

type ElementType = number;

export class Queue<T = ElementType> {
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

  public enqueue(x: T): void {
    if (this.isFull()) {
      console.warn(`Queue is full! (adding ${x})`);
      return;
    }
    this.elements.push(x);
  }

  public dequeue(): T | undefined {
    if (this.isEmpty()) {
      console.warn('Queue is empty!');
      return undefined;
    }
    return this.elements.shift();
  }

  public peek(): T | undefined {
    if (this.isEmpty()) {
      console.warn('Queue is empty!');
      return undefined;
    }
    return this.elements[0];
  }

  public display(): T[] {
    return [...this.elements];
  }

  public size(): number {
    return this.elements.length;
  }
}

export function runQueuePlayground() {
  const log = (q: Queue) => ({
    data: q.display(),
    size: q.size(),
    front: q.peek(),
    empty: q.isEmpty(),
    full: q.isFull()
  });

  const arr = randomArr(12);
  const queue = new Queue<number>(10);

  console.log('Queue enqueued:', arr);
  arr.forEach(n => queue.enqueue(n));
  console.log('Queue ', log(queue));

  console.log('Queue dequeued:', queue.dequeue());
  console.log('Queue ', log(queue));
}
