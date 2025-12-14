import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";

export class UserRepositoryMemory implements UserRepository {
  private data: User[] = [];

  async findById(id: string) {
    return this.data.find(u => u.id === id) || null;
  }

  async save(user: User) {
    this.data.push(user);
  }
}
