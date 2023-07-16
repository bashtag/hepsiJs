import BaseLogger from "../../crossCuttingConcerns/logging/baselogger.js";
import CustomerService from "../CustomerService.js";
import Check from "../../modules/authantication/check.js";

export default class	SignInService {

	#customerService

	#loggerService

	#inputText

	/**
	 * 
	 * @param {CustomerService} customerService 
	 * @param {BaseLogger} loggerService 
	 * @param {string} inputText 
	 * @param {number} isNumber 
	 */
	constructor(customerService, loggerService, inputText, isNumber) {
		this.#customerService = customerService;
		this.#loggerService = loggerService;

		if (isNumber)
			this.#emailLogIn(inputText);
		else
			this.#numberLogIn(inputText);
	}

	#emailLogIn(inputText) {
		if (Check.checkEmailValidity(inputText)) {
			this.#generatePasswordScene();


		}
		else
			this.#generateWrongInput();
	}

	#numberLogIn(inputText) {
		if (Check.checkNumberValidity(inputText)) {
			this.#generatePasswordScene();
			
		}
		else
			this.#generateWrongInput();
	}

	#generatePasswordScene() {

	}

	#generateWrongInput() {
		if (!this.#isThereWrongInputText()) {
			let	wrongInputText = document.createElement("p");
			wrongInputText.classList.add("text-danger", "fw-semibold");
			wrongInputText.innerText = "E-Mail veya Numara Hatalı";
			wrongInputText.id = "wrongInputText"
			
			let	formCol = document.getElementById("mailInputGroup").parentElement;
			formCol.appendChild(wrongInputText);
		}
	}

	#isThereWrongInputText() {
		return (document.getElementById("wrongInputText") != null);
	}
}