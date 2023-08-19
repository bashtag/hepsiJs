import BaseLogger from "../../../crossCuttingConcerns/logging/baselogger.js";
import CustomerService from "../../../services/CustomerService.js";
import Check from "../../../modules/authantication/check.js";

/**
 * an abstract class
 */
export default class	SignAction {
	/**
	 * Construct a sign service.
	 * CustomerService for user validation.
	 * Logger service for logging.
	 * 
	 * @param {CustomerService} customerService 
	 * @param {BaseLogger} loggerService 
	 * @param {string} inputText 
	 * @param {number} isNumber 
	 */
	constructor(customerService, loggerService, inputText, isNumber) {
		this.customerService = customerService;
		this.loggerService = loggerService;
		this.inputText = inputText;

		// if there is a wrong input text, delete it
		if (this.#isThereWrongInputText())
			document.getElementById("wrongInputText").remove();

		if (isNumber)
			this.#emailLog(inputText);
		else
			this.#numberLog(inputText);
	}

	/**
	 * A sign operation using email
	 * @param {string} inputText 
	 */
	#emailLog(inputText) {
		if (Check.checkEmailValidity(inputText))
			this.generateAuthScene();
		else
			this.#generateWrongInput();
	}

	/**
	 * A sign operation with number
	 * @param {string} inputText 
	 */
	#numberLog(inputText) {
		if (Check.checkNumberValidity(inputText))
			this.generateAuthScene();
		else
			this.#generateWrongInput();
	}

	/**
	 * This is a pure virtual method.
	 * Don't use it. Just fill it if necessary for subclass
	 */
	generateAuthScene() {
		throw	"Unimplemented Method";
	}

	/**
	 * Generate a wrong input scene below the input
	 */
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

	/**
	 * 
	 * @returns if there is any error, returns true
	 */
	#isThereWrongInputText() {
		return (document.getElementById("wrongInputText") != null);
	}
}