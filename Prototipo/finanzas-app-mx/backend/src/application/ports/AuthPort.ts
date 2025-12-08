export interface AuthPort {
  validateToken(token: string): Promise<string>; // returns userId
}
