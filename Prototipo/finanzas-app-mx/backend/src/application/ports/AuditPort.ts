export interface AuditPort {
  logAccess(userId: string, action: string): void;
}
