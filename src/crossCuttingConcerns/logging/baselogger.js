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
		console.log("(Add)", this.logger, ":", msg);
	}

	/**
	 * Log for input
	 */
	inputLog(msg) {
		console.log("(Wrong Input)", this.logger, ":", msg);
	}

	/**
	 * Log if email matches
	 */
	emailMatchLog(msg) {
		console.log("(Email Matches)", this.logger, ":", msg);
	}

	/**
	 * Log for successful login
	 */
	successfulLoginLog(msg) {
		console.log("(Successful Login)", this.logger, ":", msg);
	}
}