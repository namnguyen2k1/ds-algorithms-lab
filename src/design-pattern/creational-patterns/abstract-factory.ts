interface AbstractCircle {
  draw(): string;
}

interface AbstractRectangle {
  draw(): string;
}

class CircleV1 implements AbstractCircle {
  public draw(): string {
    return 'Drawing Circle (Variant 1)';
  }
}

class CircleV2 implements AbstractCircle {
  public draw(): string {
    return 'Drawing Circle (Variant 2)';
  }
}

class RectangleV1 implements AbstractRectangle {
  public draw(): string {
    return 'Drawing Rectangle (Variant 1)';
  }
}

class RectangleV2 implements AbstractRectangle {
  public draw(): string {
    return 'Drawing Rectangle (Variant 2)';
  }
}

interface ShapeFactory {
  createCircle(): AbstractCircle;
  createRectangle(): AbstractRectangle;
}

class ShapeFactoryV1 implements ShapeFactory {
  public createCircle(): AbstractCircle {
    return new CircleV1();
  }

  public createRectangle(): AbstractRectangle {
    return new RectangleV1();
  }
}

class ShapeFactoryV2 implements ShapeFactory {
  public createCircle(): AbstractCircle {
    return new CircleV2();
  }

  public createRectangle(): AbstractRectangle {
    return new RectangleV2();
  }
}

export function abstractFactoryPlayground() {
  function clientCode(factory: ShapeFactory) {
    const circle = factory.createCircle();
    const rectangle = factory.createRectangle();

    console.log(circle.draw());
    console.log(rectangle.draw());
  }
  console.log('Client: Using ShapeFactoryV1...');
  clientCode(new ShapeFactoryV1());

  console.log('');

  console.log('Client: Using ShapeFactoryV2...');
  clientCode(new ShapeFactoryV2());
}
