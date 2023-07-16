import BaseLogger from "./baselogger.js";

/**
 * JsLogger that inherits some specifies with BaseLogger
 */
export default class	JsLogger extends BaseLogger {
	constructor(logger = "JS Logger") {
		super(logger);
	}
}