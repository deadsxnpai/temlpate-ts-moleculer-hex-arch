import { ITemplateController } from '../../../../../domain/ports/input/api/template.controller';
import { ITemplateRepository } from '../../../../../domain/ports/output/template.repository';

export class TemplateController implements ITemplateController {
	constructor(private repository: ITemplateRepository) {}

	async test() {
		return this.repository.test();
	}
}
