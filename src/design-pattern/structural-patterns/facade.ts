class BehaviorSubject<T> {
  private _value: T;
  private subscribers: Array<(val: T) => void> = [];

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  subscribe(callback: (val: T) => void) {
    this.subscribers.push(callback);
    callback(this._value);
    return () => {
      this.subscribers = this.subscribers.filter(fn => fn !== callback);
    };
  }

  get value(): T {
    return this._value;
  }

  next(value: T) {
    this._value = value;
    this.subscribers.forEach(fn => fn(value));
  }
}

class OrderApiClient {
  async fetchOrders(): Promise<string[]> {
    console.log('Calling API /orders...');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(['Laptop', 'Mouse', 'Keyboard']);
      }, 1000);
    });
  }

  async createOrder(item: string): Promise<string> {
    console.log(`Calling API POST /orders with item: ${item}`);
    return new Promise(resolve => setTimeout(() => resolve(item), 500));
  }
}

class OrderStore {
  private readonly _orders$ = new BehaviorSubject<string[]>([]);
  public readonly orders$ = this._orders$;

  get snapshot(): string[] {
    return this._orders$.value;
  }

  setOrders(orders: string[]) {
    this._orders$.next(orders);
  }

  addOrder(item: string) {
    this._orders$.next([...this.snapshot, item]);
  }
}

class OrderFacade {
  constructor(private api: OrderApiClient, private store: OrderStore) {}

  readonly orders$ = this.store.orders$;

  async loadOrders() {
    const orders = await this.api.fetchOrders();
    this.store.setOrders(orders);
  }

  async addOrder(item: string) {
    const created = await this.api.createOrder(item);
    this.store.addOrder(created);
  }
}

export async function facadePlayground() {
  const api = new OrderApiClient();
  const store = new OrderStore();
  const facade = new OrderFacade(api, store);

  const unsubscribe = facade.orders$.subscribe(orders => {
    console.log('Orders updated:', orders);
  });

  await facade.loadOrders();
  await facade.addOrder('Monitor');

  unsubscribe();
}
