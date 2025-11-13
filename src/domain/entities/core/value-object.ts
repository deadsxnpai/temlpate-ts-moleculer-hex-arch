export abstract class ValueObject<T> {
	protected readonly _props: T;
	constructor(props: T) {
		this._props = Object.freeze(props); // Ensure immutability
	}
	public get props(): T {
		return this._props;
	}
	public equals(vo?: ValueObject<T>): boolean {
		if (vo === null || vo === undefined) {
			return false;
		}
		if (vo.props === undefined) {
			return false;
		}
		return JSON.stringify(this._props) === JSON.stringify(vo.props);
	}
	public toString(): string {
		return String(this._props);
	}
}
