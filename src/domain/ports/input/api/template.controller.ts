import { QueryResult } from 'pg';

export interface ITemplateController {
	test(): Promise<QueryResult>;
}
