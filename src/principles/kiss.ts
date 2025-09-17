/**
 * KISS (Keep It Simple, Stupid)
 */

() => {
  // Without KISS
  class Calculator {
    add(a: number, b: number): number {
      if (a === 0 && b === 0) {
        return 0;
      } else if (a === 0) {
        return b;
      } else if (b === 0) {
        return a;
      } else {
        return a + b;
      }
    }
  }

  const calc = new Calculator();
  console.log(calc.add(2, 3));
};

() => {
  // With KISS
  const add = (a: number, b: number): number => a + b;

  console.log(add(2, 3));
};
