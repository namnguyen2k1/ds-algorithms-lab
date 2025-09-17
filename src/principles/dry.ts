/**
 * DRY (Don’t Repeat Yourself)
 */

() => {
  // Without DRY
  class UserService {
    createUser(email: string) {
      if (!email.includes('@')) {
        throw new Error('Email không hợp lệ');
      }
      console.log(`Tạo user với email: ${email}`);
    }
  }

  class AdminService {
    createAdmin(email: string) {
      if (!email.includes('@')) {
        throw new Error('Email không hợp lệ');
      }
      console.log(`Tạo admin với email: ${email}`);
    }
  }
};

() => {
  // With DRY
  class EmailValidator {
    static validate(email: string) {
      if (!email.includes('@')) {
        throw new Error('Email không hợp lệ');
      }
    }
  }

  class UserService {
    createUser(email: string) {
      EmailValidator.validate(email);
      console.log(`Tạo user với email: ${email}`);
    }
  }

  class AdminService {
    createAdmin(email: string) {
      EmailValidator.validate(email);
      console.log(`Tạo admin với email: ${email}`);
    }
  }
};
