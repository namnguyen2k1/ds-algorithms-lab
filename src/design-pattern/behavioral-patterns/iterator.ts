class User {
  constructor(public id: number, public name: string) {}
}

class UserCollection implements Iterable<User> {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  [Symbol.iterator](): Iterator<User> {
    let index = 0;
    const users = this.users;

    return {
      next(): IteratorResult<User> {
        if (index < users.length) {
          return { value: users[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
}

export function iteratorPlayground() {
  const users = new UserCollection();
  users.addUser(new User(1, 'Alice'));
  users.addUser(new User(2, 'Bob'));
  users.addUser(new User(3, 'Charlie'));

  console.log('Duyệt bằng for...of:');
  for (const user of users) {
    console.log(`User: ${user.id} - ${user.name}`);
  }

  const iterator = users[Symbol.iterator]();
  console.log('\nDuyệt thủ công:');
  let result = iterator.next();
  while (!result.done) {
    console.log(`User: ${result.value.id} - ${result.value.name}`);
    result = iterator.next();
  }
}
