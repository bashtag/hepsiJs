import BaseLogger from "../../crossCuttingConcerns/logging/baselogger.js";
import Page from "../../modules/page.js";
import CustomerService from "../../services/CustomerService.js";
import SuccessfulInputWarningComponent from "../warningText/successfulInputWarning.js";
import WrongInputWarningComponent from "../warningText/wrongInputWarning.js";
import SignInAction from "./action/SignInAction.js"
import SignUpAction from "./action/SignUpAction.js"

export default class	SignBtn{
	// Privite Members

	// in-up info
	#page;

	/**
	 * Creates a Sign Button Action
	 * 
	 * @param {Page} page 
	 * @param {CustomerService} customerService 
	 * @param {BaseLogger} loggerService 
	 */
	constructor(page, customerService, loggerService) {
		this.#page = page;
		this.customerService = customerService;
		this.loggerService = loggerService;
		// warning component objects
		this.wrongInputWarningComp = new WrongInputWarningComponent(this.loggerService);
		this.successfulInputWarningComp = new SuccessfulInputWarningComponent(this.loggerService);

		// to bind functions
		this.boundInUp = this.signInUp.bind(this);
		this.boundInUpEnter = function(event) {
			if (event.key == "Enter")
				this.boundInUp()
		}.bind(this)

		// sign button
		document.getElementById("signInSubmit").addEventListener("click", this.boundInUp);
		// enter key event
		document.getElementById("noMailInput").addEventListener("keyup", this.boundInUpEnter);

		// form enter key event was reloading the page before this code
		document.getElementById("authForm").addEventListener("submit", function(event) {
			event.preventDefault();
		});
	}

	/**
	 * When submit button is clicked, this function operates.
	 * Gets the mail input from the document.
	 * Checks the input text includes only numbers.
	 * Creates a Service Object.
	 */
	signInUp() {
		let	inputText = document.getElementById("noMailInput").value;
		let	isNumber = !isNaN(inputText);

		if (this.#page.isSignIn())
			new SignInAction(this, this.wrongInputWarningComp, inputText, isNumber);
		else
			new SignUpAction(this, this.wrongInputWarningComp, this.successfulInputWarningComp, inputText, isNumber);
	}
}