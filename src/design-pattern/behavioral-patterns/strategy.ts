interface ShippingStrategy {
  calculateCost(orderAmount: number): number;
}

class GhnShipping implements ShippingStrategy {
  calculateCost(orderAmount: number): number {
    return 20000 + orderAmount * 0.05;
  }
}

class GhTKShipping implements ShippingStrategy {
  calculateCost(orderAmount: number): number {
    return 15000 + orderAmount * 0.1;
  }
}

class ViettelPostShipping implements ShippingStrategy {
  calculateCost(orderAmount: number): number {
    return 30000;
  }
}

class ShippingContext {
  constructor(private strategy: ShippingStrategy) {}

  setStrategy(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculate(orderAmount: number): number {
    return this.strategy.calculateCost(orderAmount);
  }
}

export function strategyPlayground() {
  const orderAmount = 500000;

  const context = new ShippingContext(new GhnShipping());
  console.log('GHN fee:', context.calculate(orderAmount));

  context.setStrategy(new GhTKShipping());
  console.log('GH-TK fee:', context.calculate(orderAmount));

  context.setStrategy(new ViettelPostShipping());
  console.log('ViettelPost fee:', context.calculate(orderAmount));
}
