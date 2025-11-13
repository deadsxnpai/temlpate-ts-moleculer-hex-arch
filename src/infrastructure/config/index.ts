import { z } from 'zod';
import { DatabaseConfigSchema } from './database.config';

export const AppConfigSchema = z.object({
	nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
	database: DatabaseConfigSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export function loadConfig(): AppConfig {
	const rawConfig = {
		nodeEnv: process.env.NODE_ENV || 'development',
		database: {
			host: process.env.DB_HOST || '127.0.0.1',
			port: parseInt(process.env.DB_PORT || '5432', 10),
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASSWORD || 'postgres',
			database: process.env.DB_NAME || 'postgres',
			max: parseInt(process.env.DB_POOL_MAX || '20', 10),
			idleTimeoutMillis: parseInt(
				process.env.DB_POOL_IDLE_TIMEOUT || '30000',
				10
			),
		},
	};

	try {
		return AppConfigSchema.parse(rawConfig);
	} catch (error: any) {
		throw new Error('Failed to load configuration');
	}
}

export const config = loadConfig();
