/**
 * GRASP (General Responsibility Assignment Software Patterns)
 */

() => {
  // Information Expert
  class User {
    constructor(public firstName: string, public lastName: string) {}

    getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  }

  const user = new User('Nam', 'Nguyen');
  console.log(user.getFullName());
};

() => {
  // Creator
  class Order {
    constructor(public userId: number, public productId: number) {}
  }

  class User {
    constructor(public id: number) {}

    createOrder(productId: number): Order {
      return new Order(this.id, productId);
    }
  }

  const user = new User(1);
  const order = user.createOrder(101);
};

() => {
  // Controller

  class UserController {
    constructor(private readonly userService: any) {}

    create(dto: any) {
      return this.userService.createUser(dto);
    }
  }
};

() => {
  // Low Coupling
};

() => {
  // High Cohesion
};

() => {
  // Polymorphism
  interface PaymentMethod {
    pay(amount: number): void;
  }

  class CreditCardPayment implements PaymentMethod {
    pay(amount: number) {
      console.log(`Payment ${amount} via Credit Card`);
    }
  }

  class PaypalPayment implements PaymentMethod {
    pay(amount: number) {
      console.log(`Payment of ${amount} via PayPal`);
    }
  }

  function checkout(payment: PaymentMethod, amount: number) {
    payment.pay(amount);
  }

  checkout(new CreditCardPayment(), 100);
  checkout(new PaypalPayment(), 200);
};

() => {
  // Pure Fabrication
  class LoggerService {
    log(message: string) {
      console.log(`[LOG]: ${message}`);
    }
  }
};

() => {
  // Protected Variations
  interface Storage {
    save(file: Buffer, name: string): void;
  }

  class LocalStorage implements Storage {
    save(file: Buffer, name: string) {
      console.log(`Save file ${name} into local disk`);
    }
  }

  class S3Storage implements Storage {
    save(file: Buffer, name: string) {
      console.log(`Upload file ${name} to S3`);
    }
  }

  class FileService {
    constructor(private readonly storage: Storage) {}

    upload(file: Buffer, name: string) {
      this.storage.save(file, name);
    }
  }
};
