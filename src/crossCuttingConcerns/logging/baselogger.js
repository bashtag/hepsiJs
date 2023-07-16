/**
 * Base Logger abstract Class
 */
export default class	BaseLogger {
	constructor(logger = "Default Logger") {
		this.logger = logger;
		console.log(logger, "is Listenning...");
	}

	/**
	 * Log for addition
	 * @param {object} msg 
	 */
	addLog(msg) {
		console.log("(Add)", this.logger, ":", msg)
	}
}