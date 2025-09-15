// Base State
abstract class TransactionState {
  protected context!: BankTransaction;

  public setContext(context: BankTransaction) {
    this.context = context;
  }

  public abstract process(): void;
  public abstract cancel(): void;
}

// Context
class BankTransaction {
  private state!: TransactionState;

  constructor(state: TransactionState) {
    this.transitionTo(state);
  }

  public transitionTo(state: TransactionState): void {
    console.log(`Transaction: Switching to ${state.constructor.name}`);
    this.state = state;
    this.state.setContext(this);
  }

  public process(): void {
    this.state.process();
  }

  public cancel(): void {
    this.state.cancel();
  }
}

// Concrete States
class PendingState extends TransactionState {
  public process(): void {
    console.log('PendingState: Processing transaction...');

    if (Math.random() < 0.3) {
      console.log('PendingState: Transaction failed due to system error.');
      this.context.transitionTo(new FailedState());
    } else {
      console.log('PendingState: Transaction completed successfully.');
      this.context.transitionTo(new CompletedState());
    }
  }

  public cancel(): void {
    console.log('PendingState: Cancelling transaction...');
    this.context.transitionTo(new CancelledState());
  }
}

class CompletedState extends TransactionState {
  public process(): void {
    console.log('CompletedState: Transaction already completed.');
  }

  public cancel(): void {
    console.log('CompletedState: Cannot cancel a completed transaction!');
  }
}

class CancelledState extends TransactionState {
  public process(): void {
    console.log('CancelledState: Cannot process a cancelled transaction!');
  }

  public cancel(): void {
    console.log('CancelledState: Transaction already cancelled.');
  }
}

class FailedState extends TransactionState {
  public process(): void {
    console.log('FailedState: Retrying transaction...');
    this.context.transitionTo(new PendingState());
  }

  public cancel(): void {
    console.log('FailedState: Cancelling failed transaction...');
    this.context.transitionTo(new CancelledState());
  }
}

export function statePlayground() {
  console.log('--- Transaction 1: normal flow ---');
  const transaction1 = new BankTransaction(new PendingState());
  transaction1.process();
  transaction1.cancel();

  console.log('\n--- Transaction 2: simulate retry ---');
  const transaction2 = new BankTransaction(new PendingState());
  transaction2.process();
  transaction2.process();
}
