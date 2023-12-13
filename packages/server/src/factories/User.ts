// Member.ts
interface User {
  getName(): string;
  getId(): string;
}

class RegularUser implements User {
  constructor(
    private name: string,
    private id: string
  ) {}

  getName(): string {
    return this.name;
  }

  getId(): string {
    return this.id;
  }
}

export { User, RegularUser };
