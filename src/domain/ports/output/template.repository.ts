import { QueryResult } from 'pg';

export interface ITemplateRepository {
	test(): Promise<QueryResult>;
}
