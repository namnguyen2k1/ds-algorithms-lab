class Order {
  public items?: string[];
  public senderAddress?: string;
  public receiverAddress?: string;
  public shippingProvider?: string;
  public note?: string;
  public status?: string;

  static get default(): Partial<Order> {
    return {
      items: [],
      senderAddress: 'Default Warehouse',
      receiverAddress: '',
      shippingProvider: 'VNPost',
      status: 'PENDING'
    };
  }

  static create(init?: Partial<Order>) {
    return Object.assign(new Order(), Order.default, init);
  }

  public clone(): Order {
    return Order.create({
      items: [...(this.items ?? [])],
      senderAddress: this.senderAddress,
      receiverAddress: this.receiverAddress,
      shippingProvider: this.shippingProvider,
      note: this.note,
      status: this.status
    });
  }
}

export function prototypePlayground() {
  const order1 = Order.create({
    items: ['Laptop', 'Mouse'],
    receiverAddress: '123 Nguyen Hue, District 1, Ho Chi Minh City',
    note: 'Deliver during business hours'
  });

  const order2 = order1.clone();
  order2.status = 'SHIPPED';

  console.log('Order 1:', order1);
  console.log('Order 2:', order2);
}
