import { ServiceBroker } from 'moleculer';
import { TemplateService } from '../../src/application/services/moleculer.service';
import dotenv from 'dotenv';

dotenv.config();

describe('EffectiveContractService', () => {
	let broker: ServiceBroker;

	beforeAll(async () => {
		broker = new ServiceBroker();
		try {
			broker.createService(TemplateService);
			await broker.start();
		} catch (error) {
			console.error('Error starting broker:', error);
			throw error;
		}
	});

	it('should test connection', async () => {
		const result = await broker.call('v1.template-service.testConnection', {});
		expect(result).toBeDefined();
	});

	afterAll(async () => {
		await broker.stop();
	});
});
