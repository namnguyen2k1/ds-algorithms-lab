export function functionalProgrammingPlayground() {
  // 1. Pure Function ---------------------------
  const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

  console.log('Pure Function:');
  console.log(capitalize('hello')); // Hello
  console.log(capitalize('world')); // World

  // 2. Higher-Order Function) -----------------
  const filterArray = <T>(arr: T[], predicate: (item: T) => boolean): T[] => arr.filter(predicate);

  const isEven = (n: number) => n % 2 === 0;

  console.log('\nHigher-Order Function:');
  console.log(filterArray([1, 2, 3, 4, 5], isEven)); // [2, 4]

  // 3. Immutability -----------------------------
  const person = { name: 'Alice', age: 25 };

  // Create a new object instead of modifying it directly
  const older = { ...person, age: person.age + 1 };

  console.log('\nImmutability:');
  console.log(person); // { name: "Alice", age: 25 }
  console.log(older); // { name: "Alice", age: 26 }

  // 4. Function Composition (ghép hàm) ---------------------
  const trim = (str: string) => str.trim();
  const toLower = (str: string) => str.toLowerCase();
  const exclaim = (str: string) => str + '!';

  const compose =
    <T>(...fns: Array<(arg: T) => T>) =>
    (x: T) =>
      fns.reduceRight((v, f) => f(v), x);

  const processString = compose(exclaim, toLower, trim);

  console.log('\nFunction Composition:');
  console.log(processString('   HELLO WORLD   ')); // "hello world!"

  // 5. Currying --------------------------------------------
  const add = (a: number) => (b: number) => a + b;

  const add5 = add(5);

  console.log('\nCurrying:');
  console.log(add5(10)); // 15
  console.log(add5(20)); // 25

  // 6. Recursion ----------------------------------
  const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

  console.log('\nRecursion:');
  console.log(factorial(5)); // 120

  // 7. Map / Filter / Reduce -------------------------------
  const numbers = [1, 2, 3, 4, 5];

  const squares = numbers.map(n => n * n);
  const evens = numbers.filter(n => n % 2 === 0);
  const sum = numbers.reduce((acc, n) => acc + n, 0);

  console.log('\nMap / Filter / Reduce:');
  console.log('Squares:', squares); // [1, 4, 9, 16, 25]
  console.log('Evens:', evens); // [2, 4]
  console.log('Sum:', sum); // 15

  // 8. Partial Application ---------------------------------
  const multiply = (a: number, b: number, c: number): number => a * b * c;

  const multiplyBy2 = (b: number, c: number) => multiply(2, b, c);

  console.log('\nPartial Application:');
  console.log(multiplyBy2(3, 4)); // 24
}
