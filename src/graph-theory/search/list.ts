export class List {
  data: number[] = [];

  makeNull(): void {
    this.data = [];
  }

  empty(): boolean {
    return this.data.length === 0;
  }

  push(x: number): void {
    this.data.push(x);
  }

  pop() {
    this.data.pop();
  }

  top(): number | undefined {
    return this.data[this.data.length - 1];
  }

  elementAt(p: number): number | undefined {
    if (p < 1 || p > this.data.length) {
      return undefined;
    }
    return this.data[p - 1];
  }

  size(): number {
    return this.data.length;
  }
}
