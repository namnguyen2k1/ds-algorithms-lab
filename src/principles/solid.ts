() => {
  // Single Responsibility Principle (SRP)
  class UserRepository {
    createUser(name: string, email: string) {
      console.log(`Create user: ${name}, email: ${email}`);
    }
  }

  class EmailService {
    sendWelcomeEmail(email: string) {
      console.log(`Send email to ${email}`);
    }
  }

  class UserService {
    constructor(private readonly userRepo: UserRepository, private readonly emailService: EmailService) {}

    registerUser(name: string, email: string) {
      this.userRepo.createUser(name, email);
      this.emailService.sendWelcomeEmail(email);
    }
  }
};

() => {
  // Open/Closed Principle (OCP)
  interface Shape {
    area(): number;
  }

  class Circle implements Shape {
    constructor(private radius: number) {}
    area(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

  class Square implements Shape {
    constructor(private side: number) {}
    area(): number {
      return this.side * this.side;
    }
  }

  class Triangle implements Shape {
    constructor(private base: number, private height: number) {}
    area(): number {
      return 0.5 * this.base * this.height;
    }
  }

  class ShapeCalculator {
    calculateArea(shape: Shape): number {
      return shape.area();
    }
  }
};

() => {
  // Liskov Substitution Principle (LSP)
  abstract class Bird {}

  class FlyingBird extends Bird {
    fly() {
      console.log('Flying...');
    }
  }

  class Penguin extends Bird {
    swim() {
      console.log('Swimming...');
    }
  }

  class Sparrow extends FlyingBird {}
};

() => {
  // Interface Segregation Principle (ISP)
  interface Printer {
    print(): void;
  }

  interface Scanner {
    scan(): void;
  }

  class SimplePrinter implements Printer {
    print(): void {
      console.log('Printing...');
    }
  }

  class MultiFunctionPrinter implements Printer, Scanner {
    print(): void {
      console.log('Printing...');
    }
    scan(): void {
      console.log('Scanning...');
    }
  }
};

() => {
  // Dependency Inversion Principle (DIP)
  interface MessageSender {
    send(message: string): void;
  }

  class EmailSender implements MessageSender {
    send(message: string): void {
      console.log(`Send email: ${message}`);
    }
  }

  class SmsSender implements MessageSender {
    send(message: string): void {
      console.log(`Send SMS: ${message}`);
    }
  }

  class NotificationService {
    constructor(private readonly sender: MessageSender) {}

    notify(message: string) {
      this.sender.send(message);
    }
  }

  const emailService = new NotificationService(new EmailSender());
  emailService.notify('Welcome!');

  const smsService = new NotificationService(new SmsSender());
  smsService.notify('Your OTP is 123456');
};
