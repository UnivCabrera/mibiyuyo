import { AuditPort } from "../../../application/ports/AuditPort";

export class AuditLogger implements AuditPort {
  logAccess(userId: string, action: string) {
    console.log(`[AUDIT] user=${userId} action=${action}`);
    // luego conectas Wazuh, Loki o tu logger inmutable
  }
}
