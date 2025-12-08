import { Result } from "../../shared/core/Result";

interface SATCredentialProps {
  path: string;
  type: "CIEC" | "FIEL";
  isValid: boolean;
  lastChecked: Date;
}

export class SATCredential {
  private constructor(public readonly id: string, public props: SATCredentialProps) {}

  public static create(id: string, path: string, type: "CIEC" | "FIEL"): Result<SATCredential> {
    if (!path.startsWith("/srv/sat_credentials")) {
      return Result.fail<SATCredential>("Ruta insegura: Las credenciales deben estar en /srv/sat_credentials");
    }

    return Result.ok<SATCredential>(new SATCredential(id, {
      path,
      type,
      isValid: true,
      lastChecked: new Date()
    }));
  }

  public markAsInvalid(): void {
    this.props.isValid = false;
  }
}
