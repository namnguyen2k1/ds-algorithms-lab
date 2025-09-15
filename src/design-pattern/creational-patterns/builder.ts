class Product {
  constructor(public name: string, public price: number) {}
}

class Order {
  constructor(
    public products: Product[],
    public senderAddress: string,
    public receiverAddress: string,
    public carrier: string,
    public pickupTime?: Date,
    public note?: string,
    public status: string = 'Pending'
  ) {}
}

class OrderBuilder {
  private products: Product[] = [];
  private senderAddress: string = '';
  private receiverAddress: string = '';
  private carrier: string = '';
  private pickupTime?: Date;
  private note?: string;
  private status: string = 'Pending';

  addProduct(product: Product): this {
    this.products.push(product);
    return this;
  }

  setSenderAddress(address: string): this {
    this.senderAddress = address;
    return this;
  }

  setReceiverAddress(address: string): this {
    this.receiverAddress = address;
    return this;
  }

  setCarrier(carrier: string): this {
    this.carrier = carrier;
    return this;
  }

  setPickupTime(time: Date): this {
    this.pickupTime = time;
    return this;
  }

  setNote(note: string): this {
    this.note = note;
    return this;
  }

  setStatus(status: string): this {
    this.status = status;
    return this;
  }

  build(): Order {
    if (!this.senderAddress || !this.receiverAddress || !this.carrier) {
      throw new Error('Order missing required fields!');
    }

    return new Order(
      this.products,
      this.senderAddress,
      this.receiverAddress,
      this.carrier,
      this.pickupTime,
      this.note,
      this.status
    );
  }
}

function builderPlayground() {
  const order = new OrderBuilder()
    .addProduct(new Product('Laptop', 1500))
    .addProduct(new Product('Mouse', 50))
    .setSenderAddress('123 Main St, Hanoi')
    .setReceiverAddress('456 Nguyen Trai, HCM')
    .setCarrier('VNPost')
    .setPickupTime(new Date('2025-09-15 10:00'))
    .setNote('Deliver during office hours')
    .setStatus('Processing')
    .build();

  console.log(order);
}
