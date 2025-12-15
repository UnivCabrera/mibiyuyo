// ═══════════════════════════════════════════════════════════════════════════════
// 📊 DATABASE SCHEMA — Modelos con Drizzle ORM
// ═══════════════════════════════════════════════════════════════════════════════
// Esquema completo para mibiyuyo - Actualizado para Drizzle v0.30+
// ═══════════════════════════════════════════════════════════════════════════════

import { pgTable, text, timestamp, boolean, integer, decimal, uuid, varchar, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ════════════════════════════════════════════════════════════════════════════════
// 👤 USERS — Usuarios del sistema
// ════════════════════════════════════════════════════════════════════════════════
export const users = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	emailVerified: boolean('email_verified').default(false),
	passwordHash: text('password_hash'),
	name: varchar('name', { length: 100 }),
	avatarUrl: text('avatar_url'),
	locale: varchar('locale', { length: 5 }).default('es'),
	timezone: varchar('timezone', { length: 50 }).default('America/Mexico_City'),
	
	// Plan y suscripción
	plan: varchar('plan', { length: 20 }).default('free'), // free, pro, business
	planExpiresAt: timestamp('plan_expires_at', { withTimezone: true }),
	stripeCustomerId: varchar('stripe_customer_id', { length: 100 }),
	
	// Onboarding
	onboardingCompleted: boolean('onboarding_completed').default(false),
	
	// Metadata
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	lastLoginAt: timestamp('last_login_at', { withTimezone: true })
});

// ════════════════════════════════════════════════════════════════════════════════
// 🔐 SESSIONS — Sesiones de usuario
// ════════════════════════════════════════════════════════════════════════════════
export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// ════════════════════════════════════════════════════════════════════════════════
// 🔗 OAUTH ACCOUNTS — Cuentas OAuth vinculadas
// ════════════════════════════════════════════════════════════════════════════════
export const oauthAccounts = pgTable('oauth_accounts', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	provider: varchar('provider', { length: 50 }).notNull(),
	providerUserId: varchar('provider_user_id', { length: 255 }).notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	expiresAt: timestamp('expires_at', { withTimezone: true }),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

// ════════════════════════════════════════════════════════════════════════════════
// 💰 INCOME SOURCES — Fuentes de ingreso
// ════════════════════════════════════════════════════════════════════════════════
export const incomeSources = pgTable('income_sources', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 100 }).notNull(),
	amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
	frequency: varchar('frequency', { length: 20 }).notNull(), // weekly, biweekly, monthly
	dayOfMonth: integer('day_of_month'),
	nextPayDate: timestamp('next_pay_date', { withTimezone: true }),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// ════════════════════════════════════════════════════════════════════════════════
// 📁 APARTADOS — Gastos fijos apartados automáticamente
// ════════════════════════════════════════════════════════════════════════════════
export const apartados = pgTable('apartados', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 100 }).notNull(),
	emoji: varchar('emoji', { length: 10 }).default('📌'),
	targetAmount: decimal('target_amount', { precision: 12, scale: 2 }).notNull(),
	currentAmount: decimal('current_amount', { precision: 12, scale: 2 }).default('0'),
	dueDate: integer('due_date'),
	frequency: varchar('frequency', { length: 20 }).default('monthly'),
	category: varchar('category', { length: 50 }).default('fixed'),
	isAutomatic: boolean('is_automatic').default(true),
	isActive: boolean('is_active').default(true),
	color: varchar('color', { length: 7 }).default('#f97316'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// ════════════════════════════════════════════════════════════════════════════════
// 💳 TRANSACTIONS — Registro de gastos e ingresos
// ════════════════════════════════════════════════════════════════════════════════
export const transactions = pgTable('transactions', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	type: varchar('type', { length: 20 }).notNull(), // income, expense
	amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
	description: varchar('description', { length: 255 }),
	category: varchar('category', { length: 50 }),
	emoji: varchar('emoji', { length: 10 }),
	apartadoId: uuid('apartado_id').references(() => apartados.id, { onDelete: 'set null' }),
	date: timestamp('date', { withTimezone: true }).defaultNow().notNull(),
	isRecurring: boolean('is_recurring').default(false),
	tags: jsonb('tags').$type<string[]>().default([]),
	notes: text('notes'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

// ════════════════════════════════════════════════════════════════════════════════
// 🎯 SAVINGS GOALS — Metas de ahorro
// ════════════════════════════════════════════════════════════════════════════════
export const savingsGoals = pgTable('savings_goals', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 100 }).notNull(),
	emoji: varchar('emoji', { length: 10 }).default('🎯'),
	targetAmount: decimal('target_amount', { precision: 12, scale: 2 }).notNull(),
	currentAmount: decimal('current_amount', { precision: 12, scale: 2 }).default('0'),
	deadline: timestamp('deadline', { withTimezone: true }),
	color: varchar('color', { length: 7 }).default('#3b82f6'),
	isCompleted: boolean('is_completed').default(false),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// ════════════════════════════════════════════════════════════════════════════════
// 🔔 ALERTS — Alertas y notificaciones
// ════════════════════════════════════════════════════════════════════════════════
export const alerts = pgTable('alerts', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	type: varchar('type', { length: 50 }).notNull(),
	title: varchar('title', { length: 100 }).notNull(),
	message: text('message'),
	isRead: boolean('is_read').default(false),
	actionUrl: text('action_url'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

// ════════════════════════════════════════════════════════════════════════════════
// 📊 RELATIONS — Relaciones entre tablas
// ════════════════════════════════════════════════════════════════════════════════
export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	oauthAccounts: many(oauthAccounts),
	incomeSources: many(incomeSources),
	apartados: many(apartados),
	transactions: many(transactions),
	savingsGoals: many(savingsGoals),
	alerts: many(alerts)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const oauthAccountsRelations = relations(oauthAccounts, ({ one }) => ({
	user: one(users, { fields: [oauthAccounts.userId], references: [users.id] })
}));

export const incomeSourcesRelations = relations(incomeSources, ({ one }) => ({
	user: one(users, { fields: [incomeSources.userId], references: [users.id] })
}));

export const apartadosRelations = relations(apartados, ({ one, many }) => ({
	user: one(users, { fields: [apartados.userId], references: [users.id] }),
	transactions: many(transactions)
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
	user: one(users, { fields: [transactions.userId], references: [users.id] }),
	apartado: one(apartados, { fields: [transactions.apartadoId], references: [apartados.id] })
}));

export const savingsGoalsRelations = relations(savingsGoals, ({ one }) => ({
	user: one(users, { fields: [savingsGoals.userId], references: [users.id] })
}));

export const alertsRelations = relations(alerts, ({ one }) => ({
	user: one(users, { fields: [alerts.userId], references: [users.id] })
}));

// ════════════════════════════════════════════════════════════════════════════════
// 📦 EXPORTS — Types inferidos
// ════════════════════════════════════════════════════════════════════════════════
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type IncomeSource = typeof incomeSources.$inferSelect;
export type Apartado = typeof apartados.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type SavingsGoal = typeof savingsGoals.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
