import { ValueObject } from '@/domain/entities/core/value-object';

interface PositionTypeProps {
	value: string;
}
export class PositionType extends ValueObject<PositionTypeProps> {
	constructor(props: PositionTypeProps) {
		super({
			value: props.value,
		});
		this.validate();
	}
	get value(): string {
		return this.props.value;
	}
	private validate(): void {}
}
