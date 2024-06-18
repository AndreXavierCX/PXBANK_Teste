export class MethodResultModel {
	// fields
	code: string;
	message: string;

	constructor(_code: string = '', _message: string = '') {
		this.code = _code;
		this.message = _message;
	}
}
