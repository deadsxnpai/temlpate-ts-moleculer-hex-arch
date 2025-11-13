import { ITemplateRepository } from '@/domain/ports/output/template.repository';
import { Pool, QueryResult } from 'pg';

export class TemplateRepository implements ITemplateRepository {
	constructor(private pool: Pool) {}

	async test(): Promise<any> {
		const query = 'SELECT NOW()';
		const result = await this.pool.query(query);
		console.log('result', this._toDAO(result));
		return this._toDAO(result);
	}

	private _toDAO(result: QueryResult): any {
		return result.rows;
	}
}
