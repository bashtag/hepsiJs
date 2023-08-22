/**
 * Base Error Class
 */
export default class	Error {
	constructor(msg, data) {
		this.message = msg;
		this.data = data;
		this.errorType = "Error";
	}
}