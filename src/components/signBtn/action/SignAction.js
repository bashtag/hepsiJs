import BaseLogger from "../../../crossCuttingConcerns/logging/baselogger.js";
import CustomerService from "../../../services/CustomerService.js";
import Check from "../../../modules/authantication/check.js";

/**
 * an abstract class
 */
export default class	SignAction {
	// for remove event listener
	#signBtn

	// for find method
	#isNumber

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
	constructor(signBtn, inputText, isNumber) {
		this.customerService = signBtn.customerService;
		this.loggerService = signBtn.loggerService;
		this.inputText = inputText;
		this.#isNumber = isNumber;
		this.#signBtn = signBtn;

		// if there is a wrong input text, delete it
		SignAction.removeWrongInputText();

		if (isNumber)
			this.#loggin(Check.checkNumberValidity);
		else
			this.#loggin(Check.checkEmailValidity);
	}

	/**
	 * Find the customer from customerList using CustomerService
	 * @returns a customer or undefined
	 */
	#findObject() {
		let	customer;
		
		if (this.#isNumber) {
			customer = this.customerService.getCustomerList().find(function(customer) {
					if (customer.number == this.inputText)
						return (true);
					return (false);
				}.bind(this))
		}
		else {
			customer = this.customerService.getCustomerList().find(function(customer) {
					if (customer.email == this.inputText)
						return (true);
					return (false);
				}.bind(this))
		}
		
		return (customer);
	}

	/**
	 * Sign operation.
	 * It changes whether it will be with email or number depends on the checker function.
	 * @param {string} inputText 
	 * @param {function} checker 
	 */
	#loggin(checker) {
		if (checker(this.inputText)) {
			this.customer = this.#findObject();
			if (this.customer) {
				this.customerHash = this.customerService.getHashList().find(function(customer) {
						if (customer.id == this.customer.id)
							return (true);
						return (false);
					}.bind(this));
				document.getElementById("signInSubmit").removeEventListener("click", this.#signBtn.boundInUp);
				document.getElementById("noMailInput").removeEventListener("keyup", this.#signBtn.boundInUpEnter)
				this.generateAuthScene();
			}
			else
				SignAction.generateWrongInput("E-Mail veya Numara Eksik");
		}
		else
			SignAction.generateWrongInput("E-Mail veya Numara Hatalı");
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
	 * @param {string} msg 
	 */
	static	generateWrongInput(msg) {
		if (!SignAction.isThereWrongInputText()) {
			let	wrongInputText = document.createElement("p");
			wrongInputText.classList.add("text-danger", "fw-semibold");
			wrongInputText.innerText = msg;
			wrongInputText.id = "wrongInputText"
			
			let	formCol = document.getElementById("mailInputGroup").parentElement;
			formCol.appendChild(wrongInputText);
		}
	}

	/**
	 * 
	 * @returns if there is any error, returns true
	 */
	static	isThereWrongInputText() {
		return (document.getElementById("wrongInputText") != null);
	}

	/**
	 * Remove the wrong input text if it is existing
	 */
	static	removeWrongInputText() {
		if (SignAction.isThereWrongInputText())
			document.getElementById("wrongInputText").remove();
	}
}