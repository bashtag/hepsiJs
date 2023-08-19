import BaseLogger from "../../../crossCuttingConcerns/logging/baselogger.js";
import CustomerService from "../../../services/CustomerService.js";
import SignAction from "./SignAction.js";

export default class	SignInAction extends SignAction {

	/**
	 * 
	 * @param {CustomerService} customerService 
	 * @param {BaseLogger} loggerService 
	 * @param {string} inputText 
	 * @param {number} isNumber 
	 */
	constructor(customerService, loggerService, inputText, isNumber) {
		super(customerService, loggerService, inputText, isNumber);
	}

	/**
	 * Auth scene for sign in.
	 * Pure Virtual Method.
	 */
	generateAuthScene() {

		this.addWelcomeHeader()
		
		this.addEmailText();

		// this.#addRefreshPage();

		// this.#addPasswdInput();
	}

	addEmailText() {
		// Email Text
		let	emailText = document.createElement("p");
		emailText.className = "fs-5";
		emailText.innerText = this.inputText;

		console.log(this.inputText)

		// row
		let	rowDiv = document.createElement("div");
		rowDiv.classList.add(["row", "justify-content-center"]);
		
		// col
		let	colDiv = document.createElement("div");
		colDiv.classList.add(["col"])

		// append email text
		colDiv.appendChild(emailText);

		// get form
		let	authForm = document.getElementById("authForm");
		
	}

	/**
	 * To add welcome header for auth scene
	 */
	addWelcomeHeader() {
		// Welcome Header
		let	welcomeHeader = document.createElement("h1");
		welcomeHeader.classList.add(["fs-3"]);
		welcomeHeader.innerText = "Hoş Geldiniz!";

		// Get the radio buttons
		let	radioButtons = document.getElementById("signRadios");

		// Change Radio Button to Welcome Header
		if (radioButtons != null)
			radioButtons.parentNode.replaceChild(welcomeHeader, radioButtons);

	}
}