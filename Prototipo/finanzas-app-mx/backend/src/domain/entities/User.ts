import { RFC } from "../value_objects/RFC";
import { Email } from "../value_objects/Email";
import { Result } from "../../shared/core/Result";

interface UserProps {
  email: Email;
  rfc?: RFC;
  role: "admin" | "user" | "auditor";
  isActive: boolean;
}

export class User {
  private constructor(public readonly id: string, public props: UserProps) {}

  public static create(id: string, emailStr: string, role: string, rfcStr?: string): Result<User> {
    // 1. Crear Value Objects (Validación implícita)
    const emailOrError = new Email(emailStr); // Asumiendo que Email ya valida
    
    let rfcOrError: Result<RFC> | undefined;
    if (rfcStr) {
      rfcOrError = RFC.create(rfcStr);
      if (rfcOrError.isFailure) {
        return Result.fail<User>(rfcOrError.error);
      }
    }

    // 2. Validar Rol
    if (!["admin", "user", "auditor"].includes(role)) {
      return Result.fail<User>("Rol inválido");
    }

    // 3. Retornar Entidad válida
    return Result.ok<User>(new User(id, {
      email: emailOrError,
      rfc: rfcOrError ? rfcOrError.getValue() : undefined,
      role: role as any,
      isActive: true
    }));
  }

  public changeRole(newRole: "admin" | "user" | "auditor"): void {
    this.props.role = newRole;
  }

  public deactivate(): void {
    this.props.isActive = false;
  }

  get email(): string {
    return this.props.email.value;
  }

  get role(): string {
    return this.props.role;
  }
}
