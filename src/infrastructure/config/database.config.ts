import { z } from 'zod';

export const DatabaseConfigSchema = z.object({
	host: z.string().min(1, 'DB host is required'),
	port: z.number().int().positive().default(5432),
	user: z.string().min(1, 'DB user is required'),
	password: z.string().min(1, 'DB password is required'),
	database: z.string().min(1, 'DB name is required'),
	max: z.number().int().positive().default(20),
	idleTimeoutMillis: z.number().int().positive().default(30000),
});

export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;

// export function toPoolConfig(config: DatabaseConfig): PoolConfig {
// 	return {
// 		host: config.host,
// 		port: config.port,
// 		user: config.user,
// 		password: config.password,
// 		database: config.database,
// 		max: config.max,
// 		idleTimeoutMillis: config.idleTimeoutMillis,
// 	};
// }

// export function toConnectionString(config: DatabaseConfig): string {
// 	return `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
// }
