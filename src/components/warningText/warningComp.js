import BaseLogger from "../../crossCuttingConcerns/logging/baselogger.js";

/**
 * Abstract Warning Component Class
 */
export default class	WarningComponent {

	/**
	 * Constructor for Warning Component Abstract Class
	 * Gets a logger service to display warnings to the console
	 * 
	 * @param {BaseLogger} loggerService 
	 */
	constructor(loggerService) {
		this.loggerService = loggerService;
	}
	
	/**
	 * Generate a warning component below the input / inputs
	 * @param {string} msg 
	 */
	generateWarning(msg) {
		throw	"Unimplemented Method";
	}

	/**
	 * 
	 * @returns true if there is a warning
	 */
	static	isThereAnyWarning() {
		return (document.getElementById("successfulInputWarning") != null ||
			document.getElementById("wrongInputWarning") != null);
	}

	/**
	 * Remove the warning regardless of type
	 */
	static	removeAllTheWarnings() {
		if (document.getElementById("successfulInputWarning") != null)
			document.getElementById("successfulInputWarning").remove();

		else if (document.getElementById("wrongInputWarning") != null)
			document.getElementById("wrongInputWarning").remove();
	}
}