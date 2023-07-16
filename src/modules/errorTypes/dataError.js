import Error from "./error.js";

/**
 * Data Error class that inherits with Error
 */
export default class	DataError extends Error {
	constructor(msg, data) {
		super(msg, data);
		this.errorType = "Data Error";
	}
}