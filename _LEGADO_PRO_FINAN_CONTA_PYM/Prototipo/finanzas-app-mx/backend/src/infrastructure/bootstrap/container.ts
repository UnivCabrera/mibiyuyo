import { UserRepositoryMemory } from "../adapters/persistence/postgres/UserRepositoryMemory";
import { FileSystemSATCredentialRepository } from "../adapters/sat/FileSystemSATCredentialRepository";
import { AuditLogger } from "../adapters/logging/AuditLogger";
import { GetSATCredentials } from "../../application/use_cases/queries/GetSATCredentials";

export const container = {
  userRepo: new UserRepositoryMemory(),
  satRepo: new FileSystemSATCredentialRepository(),
  audit: new AuditLogger(),
  getSATCredentials: null as any,
};

container.getSATCredentials = new GetSATCredentials(
  container.satRepo,
  container.audit
);
