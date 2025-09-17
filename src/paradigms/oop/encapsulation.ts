() => {
  class Student {
    #name: string;
    #age: number;

    constructor(name: string, age: number) {
      this.#name = name;
      this.#age = age;
    }

    get name(): string {
      return this.#name;
    }

    set name(newName: string) {
      if (newName.trim().length === 0) {
        throw new Error('Name cannot be empty!');
      }
      this.#name = newName;
    }

    get age(): number {
      return this.#age;
    }

    set age(newAge: number) {
      if (newAge < 0) {
        throw new Error('Age must be non-negative!');
      }
      this.#age = newAge;
    }
  }
};
