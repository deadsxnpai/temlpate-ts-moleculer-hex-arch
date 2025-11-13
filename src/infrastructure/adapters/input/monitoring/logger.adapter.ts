import { ILogger } from '@/domain/ports/input/monitoring/logger';

export class Logger implements ILogger {
	log(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
