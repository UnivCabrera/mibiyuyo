// ═══════════════════════════════════════════════════════════════════════════════
// 📝 APP.D.TS — Tipos globales de SvelteKit
// ═══════════════════════════════════════════════════════════════════════════════

import type { Session, User } from 'lucia';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		
		interface PageData {
			user?: User | null;
		}
		
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
