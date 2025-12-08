export class AuthDomainService {
  static canAccessSAT(userRole: string): boolean {
    return userRole === "admin" || userRole === "auditor";
  }
}
