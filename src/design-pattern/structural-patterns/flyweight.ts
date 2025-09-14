class Flyweight {
  constructor(private sharedState: string[]) {}

  public operation(uniqueState: any): void {
    console.log(`Flyweight: shared=${JSON.stringify(this.sharedState)}, unique=${JSON.stringify(uniqueState)}`);
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};

  constructor(initialFlyweights: string[][]) {
    // preload các flyweight thường dùng
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  private getKey(state: string[]): string {
    return state.join('_');
  }

  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log(`Factory: creating a new flyweight for ${key}`);
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log(`Factory: reusing existing flyweight for ${key}`);
    }

    return this.flyweights[key];
  }

  public listFlyweights(): void {
    console.log('Current flyweights:', Object.keys(this.flyweights));
  }
}

export function flyWeightPlayground() {
  const preloadFactory = new FlyweightFactory([
    ['BMW', 'M5', 'red'],
    ['BMW', 'X6', 'white']
  ]);

  preloadFactory.listFlyweights();

  const car1 = preloadFactory.getFlyweight(['BMW', 'M5', 'red']);
  car1.operation(['29A-12345', 'Nam Nguyen']);

  const car2 = preloadFactory.getFlyweight(['BMW', 'X1', 'black']);
  car2.operation(['30H-88888', 'Thanh Le']);

  preloadFactory.listFlyweights();
}
