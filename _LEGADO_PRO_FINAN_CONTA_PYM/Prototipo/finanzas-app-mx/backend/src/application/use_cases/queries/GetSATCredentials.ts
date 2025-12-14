import { SATCredentialRepository } from "../../domain/repositories/SATCredentialRepository";
import { AuditPort } from "../ports/AuditPort";
import { Result } from "../../../shared/core/Result";
import { SATCredential } from "../../../domain/entities/SATCredential";

export class GetSATCredentials {
  constructor(
    private repo: SATCredentialRepository,
    private audit: AuditPort
  ) {}

  async execute(userId: string): Promise<Result<SATCredential[]>> {
    this.audit.logAccess(userId, "REQUEST_SAT_CREDENTIALS");
    return await this.repo.getAll();
  }
}
