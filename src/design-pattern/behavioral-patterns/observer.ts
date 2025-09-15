interface Subject {
  attach(observer: Observer<this>): void;
  detach(observer: Observer<this>): void;
  notify(): void;
}

interface Observer<T extends Subject> {
  update(subject: T): void;
}

class ConcreteSubject implements Subject {
  public state: number = 0;
  private observers: Set<Observer<this>> = new Set();

  public attach(observer: Observer<this>): void {
    if (this.observers.has(observer)) {
      console.log('Subject: Observer already attached.');
      return;
    }
    this.observers.add(observer);
    console.log('Subject: Attached an observer.');
  }

  public detach(observer: Observer<this>): void {
    if (!this.observers.delete(observer)) {
      console.log('Subject: Nonexistent observer.');
      return;
    }
    console.log('Subject: Detached an observer.');
  }

  public notify(): void {
    console.log('Subject: Notifying observers...');
    this.observers.forEach(observer => observer.update(this));
  }

  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * 11);
    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}

class ConcreteObserver implements Observer<ConcreteSubject> {
  constructor(private condition: (subject: ConcreteSubject) => boolean, private name: string) {}

  update(subject: ConcreteSubject): void {
    if (this.condition(subject)) {
      console.log(`${this.name}: Reacted to the event.`);
    }
  }
}

export function observerPlayground() {
  const subject = new ConcreteSubject();

  const observerA = new ConcreteObserver(s => s.state < 3, 'ConcreteObserverA');
  const observerB = new ConcreteObserver(s => s.state === 0 || s.state >= 2, 'ConcreteObserverB');

  subject.attach(observerA);
  subject.attach(observerB);

  subject.someBusinessLogic();
  subject.someBusinessLogic();

  subject.detach(observerB);

  subject.someBusinessLogic();
}
