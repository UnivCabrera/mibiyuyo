import { SATCredential } from "../entities/SATCredential";
import { Result } from "../../shared/core/Result";

export interface SATCredentialRepository {
  getAll(): Promise<Result<SATCredential[]>>;
  findById(id: string): Promise<Result<SATCredential>>;
}
