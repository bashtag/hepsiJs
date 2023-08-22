import BaseLogger from "../../crossCuttingConcerns/logging/baselogger.js";

export default class	WrongInputTextComponent {

	/**
	 * Constructor for this wrong text class.
	 * Gets a logger service to display wrongs to the console
	 * @param {BaseLogger} loggerService 
	 */
	constructor(loggerService) {
		this.loggerService = loggerService
	}
	
	/**
	 * Generate a wrong input scene below the input
	 * @param {string} msg 
	 */
	generateWrongInput(msg) {
		if (!this.isThereWrongInputText()) {
			let	wrongInputText = document.createElement("p");
			wrongInputText.classList.add("text-danger", "fw-semibold");
			wrongInputText.innerText = msg;
			wrongInputText.id = "wrongInputText"
			
			let	formCol = document.getElementById("mailInputGroup").parentElement;
			formCol.appendChild(wrongInputText);

			this.loggerService.inputLog(msg);
		}
	}

	/**
	 * 
	 * @returns if there is any error, returns true
	 */
	isThereWrongInputText() {
		return (document.getElementById("wrongInputText") != null);
	}

	/**
	 * Remove the wrong input text if it is existing
	 */
	removeWrongInputText() {
		if (this.isThereWrongInputText())
			document.getElementById("wrongInputText").remove();
	}
}