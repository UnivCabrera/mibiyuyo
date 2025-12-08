import { SATCredentialRepository } from "../../../domain/repositories/SATCredentialRepository";
import { SATCredential } from "../../../domain/entities/SATCredential";

export class FileSystemSATCredentialRepository implements SATCredentialRepository {
  async getAll() {
    // Placeholder: luego conectas lectura real del filesystem
    return [
      new SATCredential("1", "/srv/sat_credentials/cred1.key", "FIEL"),
      new SATCredential("2", "/srv/sat_credentials/cred2.key", "CIEC")
    ];
  }

  async findById(id: string) {
    return null; // placeholder
  }
}
