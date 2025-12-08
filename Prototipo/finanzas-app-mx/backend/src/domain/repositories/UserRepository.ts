import { User } from "../entities/User";
import { Result } from "../../shared/core/Result";

export interface UserRepository {
  findById(id: string): Promise<Result<User>>;
  save(user: User): Promise<Result<void>>;
}
