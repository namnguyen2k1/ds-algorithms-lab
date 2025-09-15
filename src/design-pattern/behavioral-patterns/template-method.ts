abstract class PaymentProcessor {
  public processPayment(amount: number): void {
    this.checkOrder(amount);
    this.verifyPaymentDetails();
    this.makePayment(amount);
    this.sendNotification(); // hook
  }

  protected checkOrder(amount: number): void {
    console.log(`Checking order validity for amount: $${amount}`);
  }

  protected abstract verifyPaymentDetails(): void;
  protected abstract makePayment(amount: number): void;

  protected sendNotification(): void {}
}

class CashOnDeliveryPayment extends PaymentProcessor {
  protected verifyPaymentDetails(): void {
    console.log('COD: No payment details verification required.');
  }

  protected makePayment(amount: number): void {
    console.log(`COD: Customer will pay $${amount} upon delivery.`);
  }
}

class CreditCardPayment extends PaymentProcessor {
  protected verifyPaymentDetails(): void {
    console.log('Verifying credit card details...');
  }

  protected makePayment(amount: number): void {
    console.log(`Charging $${amount} to the customer's credit card.`);
  }

  protected sendNotification(): void {
    console.log('Sending SMS: Your credit card payment was successful!');
  }
}

class PayPalPayment extends PaymentProcessor {
  protected verifyPaymentDetails(): void {
    console.log('Logging into PayPal account...');
  }

  protected makePayment(amount: number): void {
    console.log(`Transferring $${amount} via PayPal.`);
  }

  protected sendNotification(): void {
    console.log('Sending Email: Your PayPal payment was successful!');
  }
}

export function templateMethodPlayground() {
  console.log('=== COD Payment ===');
  let payment: PaymentProcessor = new CashOnDeliveryPayment();
  payment.processPayment(100);

  console.log('\n=== Credit Card Payment ===');
  payment = new CreditCardPayment();
  payment.processPayment(250);

  console.log('\n=== PayPal Payment ===');
  payment = new PayPalPayment();
  payment.processPayment(400);
}
