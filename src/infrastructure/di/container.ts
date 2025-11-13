import { Pool } from 'pg';
import { config } from '../config';
import { ITemplateController } from '../../domain/ports/input/api/template.controller';
import { ITemplateRepository } from '../../domain/ports/output/template.repository';
import { TemplateController } from '../adapters/input/api/graphql/template.controller';
import { TemplateRepository } from '../adapters/output/postgresql.template.repository';

class Container {
	private services: Map<string, unknown>;

	constructor() {
		this.services = new Map();
	}

	async init(): Promise<void> {
		const poolConfig = config.database;
		const pgPool = new Pool(poolConfig);
		this.register('pgPool', pgPool);

		const repo = new TemplateRepository(pgPool);
		this.register<ITemplateRepository>('templateRepository', repo);

		const controller = new TemplateController(repo);
		this.register<ITemplateController>('templateController', controller);
	}

	register<T>(name: string, service: T): void {
		this.services.set(name, service);
	}

	get<T>(name: string): T {
		const service = this.services.get(name);
		if (!service) {
			throw new Error(`Service ${name} not found in container`);
		}
		return service as T;
	}

	async shutdown(): Promise<void> {
		const pgPool = this.get<Pool>('pgPool');
		await pgPool.end();
	}
}

export default Container;
