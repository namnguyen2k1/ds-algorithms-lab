export function polymorphismPlayground() {
  abstract class Shape {
    abstract area(): number;

    describe(): void {
      console.log('This is a shape.');
    }
  }

  class Circle extends Shape {
    constructor(private r: number) {
      super();
    }

    area(): number {
      return Math.PI * this.r * this.r;
    }

    override describe(): void {
      console.log(`This is a circle with radius = ${this.r}`);
    }
  }

  class Square extends Shape {
    constructor(private side: number) {
      super();
    }

    area(): number {
      return this.side * this.side;
    }

    override describe(): void {
      console.log(`This is a square with side = ${this.side}`);
    }
  }

  class Calculator {
    add(a: number, b: number): number;
    add(a: string, b: string): string;
    add(a: number | string, b: number | string): number | string {
      if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
      }
      if (typeof a === 'string' && typeof b === 'string') {
        return [a, b].join(' ');
      }
      throw new Error('Invalid arguments');
    }
  }

  const shapes: Shape[] = [new Circle(5), new Square(4)];
  shapes.forEach(s => {
    s.describe();
    console.log('Area =', s.area());
  });
  const calc = new Calculator();
  console.log(calc.add(2, 3));
  console.log(calc.add('Hello', 'World!'));
}
