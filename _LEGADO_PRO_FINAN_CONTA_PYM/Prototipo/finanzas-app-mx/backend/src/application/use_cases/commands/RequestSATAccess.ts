import { SATCredentialRepository } from "../../domain/repositories/SATCredentialRepository";
import { AuditPort } from "../ports/AuditPort";
import { EventBus } from "../ports/EventBus";
import { SATAccessRequested } from "../../../domain/events/SATAccessRequested";
import { Result } from "../../../shared/core/Result";

export class RequestSATAccess {
  constructor(
    private repo: SATCredentialRepository,
    private audit: AuditPort,
    private eventBus: EventBus
  ) {}

  async execute(userId: string): Promise<Result<void>> {
    try {
      this.audit.logAccess(userId, "REQUEST_SAT");
      this.eventBus.publish(new SATAccessRequested(userId, new Date()));
      // Lógica adicional de comando...
      return Result.ok<void>();
    } catch (err) {
      return Result.fail<void>("Error al solicitar acceso al SAT");
    }
  }
}
