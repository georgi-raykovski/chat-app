import { User, RegularUser } from './User';

enum UserType {
  Regular,
}

class UserFactory {
  static createMember(type: UserType, name: string, id: string): User {
    switch (type) {
      case UserType.Regular:
        return new RegularUser(name, id);
      default:
        throw new Error('Invalid member type');
    }
  }
}

export { UserFactory, UserType };
