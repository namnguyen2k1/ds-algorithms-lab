/**
 * YAGNI (You Aren’t Gonna Need It)
 */

() => {
  // Without YAGNI
  class UserService {
    createUser(name: string, email: string) {
      console.log(`Create user ${name} with email ${email}`);
    }

    resetPassword(userId: number) {
      console.log(`Reset password for user ${userId}`);
    }

    banUser(userId: number) {
      console.log(`Ban user ${userId}`);
    }
  }
};

() => {
  // With YAGNI
  class UserService {
    createUser(name: string, email: string) {
      console.log(`Create user ${name} with email ${email}`);
    }
  }
};
