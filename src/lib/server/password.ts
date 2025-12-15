// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 PASSWORD UTILS — Utilidades para contraseñas
// ═══════════════════════════════════════════════════════════════════════════════
// Hash y verificación de contraseñas usando Bun's crypto
// ═══════════════════════════════════════════════════════════════════════════════

// Hash de contraseña usando Argon2id (incluido en Bun)
export async function hashPassword(password: string): Promise<string> {
	return await Bun.password.hash(password, {
		algorithm: 'argon2id',
		memoryCost: 19456, // 19 MB
		timeCost: 2
	});
}

// Verificar contraseña
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return await Bun.password.verify(password, hash);
}

// Validar fortaleza de contraseña
export function validatePasswordStrength(password: string): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];
	
	if (password.length < 8) {
		errors.push('La contraseña debe tener al menos 8 caracteres');
	}
	
	if (!/[a-z]/.test(password)) {
		errors.push('Debe contener al menos una letra minúscula');
	}
	
	if (!/[A-Z]/.test(password)) {
		errors.push('Debe contener al menos una letra mayúscula');
	}
	
	if (!/\d/.test(password)) {
		errors.push('Debe contener al menos un número');
	}
	
	return {
		isValid: errors.length === 0,
		errors
	};
}

// Generar token seguro
export function generateSecureToken(length: number = 32): string {
	const bytes = crypto.getRandomValues(new Uint8Array(length));
	return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}
