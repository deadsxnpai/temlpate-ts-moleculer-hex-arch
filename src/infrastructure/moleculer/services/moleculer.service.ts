import { ITemplateController } from '@/domain/ports/input/api/template.controller';
import type { ServiceSchema } from 'moleculer';
import container from '@/infrastructure/DI/container';

export const TemplateService: ServiceSchema = {
	name: 'template-service',
	version: 1,
	dependencies: [],
	mixins: [],
	settings: {},
	actions: {
		testConnection: {
			async handler(this: any) {
				return await this.controller.test();
			},
		},
	},
	methods: {},
	events: {},
	async created() {
		try {
			await container.init();
			this.controller =
				container.get<ITemplateController>('templateController');
		} catch (error) {
			this.broker.logger.error('Failed to initialize DI container:', error);
			throw error;
		}
	},
	started() {
		this.broker.logger.info('Service successfully started!');
	},
	async stopped() {
		if (container) {
			await container.shutdown();
		}
	},
};
