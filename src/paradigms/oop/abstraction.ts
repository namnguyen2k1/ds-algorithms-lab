() => {
  abstract class AnimalAbstract {
    abstract makeSound(): void;
  }

  interface AnimalInterface {
    makeSound(): void;
  }

  class Dog extends AnimalAbstract {
    constructor() {
      super();
    }

    makeSound() {
      console.log('Woof!');
    }
  }

  class Cat implements AnimalInterface {
    makeSound() {
      console.log('Meo!');
    }
  }
};
