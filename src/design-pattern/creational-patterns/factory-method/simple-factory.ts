interface Transport {
  deliver(): void;
}

class Truck implements Transport {
  deliver(): void {
    console.log('Deliver by Truck');
  }
}

class Ship implements Transport {
  deliver(): void {
    console.log('Deliver by Ship');
  }
}

enum TransportType {
  TRUCK,
  SHIP
}

class TransportFactory {
  static getTransport(type: TransportType): Transport {
    switch (type) {
      case TransportType.TRUCK:
        return new Truck();
      case TransportType.SHIP:
        return new Ship();
      default:
        throw new Error('Unsupported transport type');
    }
  }
}

export function simpleFactoryPlayground() {
  const transport = TransportFactory.getTransport(TransportType.SHIP);
  transport.deliver();
}
