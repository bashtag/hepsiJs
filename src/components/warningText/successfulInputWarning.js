import BaseLogger from "../../crossCuttingConcerns/logging/baselogger.js";
import WarningComponent from "./warningComp.js";

export default class	SuccessfulInputWarningComponent extends WarningComponent {

	/**
	 * Constructor for this successful warning class.
	 * Gets a logger service to display warnings to the console
	 * @param {BaseLogger} loggerService 
	 */
	constructor(loggerService) {
		super(loggerService);
	}
	
	/**
	 * Generate a wrong input scene below the input
	 * @param {string} msg 
	 */
	generateWarning(msg) {
		if (!WarningComponent.isThereAnyWarning()) {
			let	successfulInputWarning = document.createElement("p");
			successfulInputWarning.classList.add("text-success", "fw-semibold", "warning");
			successfulInputWarning.innerText = msg;
			successfulInputWarning.id = "successfulInputWarning"
			
			let	formCol = document.getElementById("mailInputGroup").parentElement;
			formCol.appendChild(successfulInputWarning);

			// log
			this.loggerService.successfulInputLog(msg);
		}
	}
}