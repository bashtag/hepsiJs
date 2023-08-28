import BaseLogger from "../../crossCuttingConcerns/logging/baselogger.js";
import WarningComponent from "./warningComp.js";

export default class	WrongInputWarningComponent extends WarningComponent {

	/**
	 * Constructor for this wrong text class.
	 * Gets a logger service to display wrongs to the console
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
			let	wrongInputWarning = document.createElement("p");
			wrongInputWarning.classList.add("text-danger", "fw-semibold", "warning");
			wrongInputWarning.innerText = msg;
			wrongInputWarning.id = "wrongInputWarning"
			
			let	formCol = document.getElementById("mailInputGroup").parentElement;
			formCol.appendChild(wrongInputWarning);

			// log
			this.loggerService.wrongInputLog(msg);
		}
	}
}