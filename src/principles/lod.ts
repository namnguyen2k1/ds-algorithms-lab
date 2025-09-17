/**
 * Law of Demeter (LoD) / Principle of Least Knowledge
 */

() => {
  // Without LoD
  class Address {
    constructor(public zipCode: string) {}
  }

  class Customer {
    constructor(public address: Address) {}
  }

  class Order {
    constructor(public customer: Customer) {}
  }

  class OrderService {
    printZipCode(order: Order) {
      console.log(order.customer.address.zipCode);
    }
  }
};

() => {
  // With LoD
  class Address {
    constructor(private zipCode: string) {}
    getZipCode() {
      return this.zipCode;
    }
  }

  class Customer {
    constructor(private address: Address) {}
    getZipCode() {
      return this.address.getZipCode();
    }
  }

  class Order {
    constructor(private customer: Customer) {}
    getCustomerZipCode() {
      return this.customer.getZipCode();
    }
  }

  class OrderService {
    printZipCode(order: Order) {
      console.log(order.getCustomerZipCode());
    }
  }
};
