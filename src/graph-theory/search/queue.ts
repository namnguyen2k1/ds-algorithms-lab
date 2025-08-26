import { MAX } from './helper';

export class Queue {
  a: number[] = [];
  front: number = -1;
  rear: number = -1;

  makeNull() {
    this.front = -1;
    this.rear = -1;
    this.a = [];
  }

  isEmpty(): boolean {
    return this.front === -1;
  }

  top(): number | undefined {
    if (this.front === -1) {
      return undefined;
    }
    return this.a[this.front];
  }

  pop() {
    if (this.front === this.rear) {
      this.makeNull();
    } else {
      this.front = (this.front + 1) % MAX;
    }
  }

  push(x: number) {
    if (this.front === -1) {
      this.front = 0;
    }
    this.rear = (this.rear + 1) % MAX;
    this.a[this.rear] = x;
  }
}
