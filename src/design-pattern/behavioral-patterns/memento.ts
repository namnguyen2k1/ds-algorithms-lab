class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(`Initial state: ${state}`);
  }

  public doSomething(): void {
    console.log('Originator: Doing something...');
    this.state = this.generateRandomString(8);
    console.log(`New state: ${this.state}`);
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(m: Memento): void {
    this.state = m.getState();
    console.log(`State restored to: ${this.state}`);
  }

  private generateRandomString(len: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return Array.from({ length: len }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  }
}

interface Memento {
  getState(): string;
  getName(): string;
  getDate(): string;
}

class ConcreteMemento implements Memento {
  private state: string;
  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString();
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} - ${this.state}`;
  }

  public getDate(): string {
    return this.date;
  }
}

class Caretaker {
  private undoStack: Memento[] = [];
  private redoStack: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log('Caretaker: Save state.');
    this.undoStack.push(this.originator.save());
    this.redoStack = [];
  }

  public undo(): void {
    if (!this.undoStack.length) return;
    const memento = this.undoStack.pop()!;
    console.log(`Caretaker: Undo → ${memento.getName()}`);
    this.redoStack.push(memento);
    const prev = this.undoStack[this.undoStack.length - 1];
    if (prev) {
      this.originator.restore(prev);
    }
  }

  public redo(): void {
    if (!this.redoStack.length) return;
    const memento = this.redoStack.pop()!;
    console.log(`Caretaker: Redo → ${memento.getName()}`);
    this.undoStack.push(memento);
    this.originator.restore(memento);
  }

  public showHistory(): void {
    console.log('Undo History:');
    for (const m of this.undoStack) {
      console.log('  ' + m.getName());
    }
    console.log('Redo History:');
    for (const m of this.redoStack) {
      console.log('  ' + m.getName());
    }
  }
}

export function mementoPlayground() {
  const originator = new Originator('initial-state');
  const caretaker = new Caretaker(originator);

  caretaker.backup();
  originator.doSomething();

  caretaker.backup();
  originator.doSomething();

  caretaker.backup();
  originator.doSomething();

  console.log('\n--- Show history ---');
  caretaker.showHistory();

  console.log('\n--- Undo lần 1 ---');
  caretaker.undo();

  console.log('\n--- Undo lần 2 ---');
  caretaker.undo();

  console.log('\n--- Redo ---');
  caretaker.redo();

  console.log('\n--- Show history cuối cùng ---');
  caretaker.showHistory();
}
