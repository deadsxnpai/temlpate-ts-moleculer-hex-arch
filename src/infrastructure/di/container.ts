import { Pool } from 'pg';
import { config } from '../config';
import { TemplateRepository } from '@/infrastructure/adapters/output/postgresql.template.repository';
import { TemplateController } from '@/infrastructure/adapters/input/api/graphql/template.controller';
import { ITemplateRepository } from '@/domain/ports/output/template.repository';
import { ITemplateController } from '@/domain/ports/input/api/template.controller';

export const SERVICE_TYPES = {
	DatabasePool: 'pool',
	TemplateRepository: 'templateRepository',
	TemplateController: 'templateController',
} as const;

type ServiceType = (typeof SERVICE_TYPES)[keyof typeof SERVICE_TYPES];

class Container {
	private services: Map<ServiceType, unknown>;
	private initialized: boolean = false;

	constructor() {
		this.services = new Map();
	}

	async init(): Promise<void> {
		if (this.initialized) {
			return;
		}

		// Initialize database connection
		const pgPool = new Pool(config.database);
		this.register(SERVICE_TYPES.DatabasePool, pgPool);

		// Register repositories
		const repository = new TemplateRepository(pgPool);
		this.register<ITemplateRepository>(
			SERVICE_TYPES.TemplateRepository,
			repository
		);

		// Register controllers
		const controller = new TemplateController(repository);
		this.register<ITemplateController>(
			SERVICE_TYPES.TemplateController,
			controller
		);

		this.initialized = true;
	}

	register<T>(name: ServiceType, service: T): void {
		if (this.services.has(name)) {
			throw new Error(`Service ${name} is already registered`);
		}
		this.services.set(name, service);
	}

	get<T>(name: ServiceType): T {
		const service = this.services.get(name) as T;
		if (!service) {
			throw new Error(`Service ${name} not found in container`);
		}
		return service as T;
	}

	async shutdown(): Promise<void> {
		if (!this.initialized) {
			return;
		}

		const pgPool = this.get<Pool>(SERVICE_TYPES.DatabasePool);
		await pgPool.end();

		this.services.clear();
		this.initialized = false;
	}

	isInitialized(): boolean {
		return this.initialized;
	}
}

const containerInstance = new Container();
export default containerInstance;
