/**
 * High Cohesion & Low Coupling
 */

() => {
  // Before
  class AppService {
    createUser(name: string, email: string) {
      console.log(`Tạo user: ${name}`);
    }

    createOrder(userId: number, productId: number) {
      console.log(`Tạo đơn hàng cho user ${userId}`);
    }

    sendEmail(email: string, content: string) {
      console.log(`Gửi email đến ${email}: ${content}`);
    }
  }
};

() => {
  // After
  class UserService {
    createUser(name: string, email: string) {
      console.log(`Create user: ${name}, email: ${email}`);
    }
  }

  class OrderService {
    createOrder(userId: number, productId: number) {
      console.log(`Create order for user ${userId}`);
    }
  }

  class EmailService {
    sendEmail(email: string, content: string) {
      console.log(`Send email to ${email}: ${content}`);
    }
  }
};
