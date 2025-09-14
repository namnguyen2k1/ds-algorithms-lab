interface Shape {
  draw(): string;
}

class Circle implements Shape {
  public draw(): string {
    return 'Drawing a Circle';
  }
}

class Rectangle implements Shape {
  public draw(): string {
    return 'Drawing a Rectangle';
  }
}

abstract class ShapeCreator {
  public abstract factoryMethod(): Shape;

  public renderShape(): string {
    const shape = this.factoryMethod();
    return `ShapeCreator: Rendered -> ${shape.draw()}`;
  }
}

class CircleCreator extends ShapeCreator {
  public factoryMethod(): Shape {
    return new Circle();
  }
}

class RectangleCreator extends ShapeCreator {
  public factoryMethod(): Shape {
    return new Rectangle();
  }
}

export function factoryMethodPlayground() {
  function clientCode(creator: ShapeCreator) {
    console.log(creator.renderShape());
  }

  console.log('App: Using CircleCreator');
  clientCode(new CircleCreator());

  console.log('App: Using RectangleCreator');
  clientCode(new RectangleCreator());
}
