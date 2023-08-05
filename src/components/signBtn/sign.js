import BaseLogger from "../../crossCuttingConcerns/logging/baselogger.js";
import Page from "../../modules/page.js";
import CustomerService from "../../services/CustomerService.js";
import SignInService from "../../services/sign/SignInService.js";
import SignUpService from "../../services/sign/SignUpService.js";

export default class	SignBtn{
	// Privite Members

	// in-up info
	#page;
	// Customer Service
	#customerService;
	// Logger Service
	#loggerService
	// Errors
	#errors = []

	/**
	 * Creates a Sign Button Action
	 * 
	 * @param {Page} page 
	 * @param {CustomerService} customerService 
	 * @param {BaseLogger} loggerService 
	 */
	constructor(page, customerService, loggerService) {
		this.#page = page;
		this.#customerService = customerService;
		this.#loggerService = loggerService;
		document.getElementById("signInSubmit").addEventListener("click", this.#signInUp.bind(this));
	}

	/**
	 * When submit button is clicked, this function operates.
	 * Gets the mail input from the document.
	 * Checks the input text includes only numbers.
	 * Creates a Service Object.
	 */
	#signInUp() {
		let	inputText = document.getElementById("noMailInput").value;
		let	isNumber = !Number.isNaN(inputText);

		if (this.#page.isSignIn())
			new SignInService(this.#customerService, this.#loggerService, inputText, isNumber);
		else
			new SignUpService(this.#customerService, this.#loggerService, inputText, isNumber);
	}
}