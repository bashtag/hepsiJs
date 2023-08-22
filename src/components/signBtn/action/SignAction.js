import Check from "../../../modules/authantication/check.js";
import WrongInputTextComponent from "../../wrongText/wrongInputText.js";

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
	 * @param {signBtn} signBtn to remove event listeners with bind functions
	 * @param {WrongInputTextComponent} wrongInputTextComp
	 * @param {string} inputText given text
	 * @param {number} isNumber is a number or an email text
	 */
	constructor(signBtn, wrongInputTextComp, inputText, isNumber) {
		this.customerService = signBtn.customerService;
		this.loggerService = signBtn.loggerService;
		this.inputText = inputText;
		this.#isNumber = isNumber;
		this.#signBtn = signBtn;
		this.wrongInputTextComp = wrongInputTextComp;

		// if there is a wrong input text, delete it
		this.wrongInputTextComp.removeWrongInputText();

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
				document.getElementById("noMailInput").removeEventListener("keyup", this.#signBtn.boundInUpEnter);
				this.generateAuthScene();
			}
			else
				this.wrongInputTextComp.generateWrongInput("E-Mail veya Numara Eksik");
		}
		else
			this.wrongInputTextComp.generateWrongInput("E-Mail veya Numara Hatalı");
	}

	/**
	 * This is a pure virtual method.
	 * Don't use it. Just fill it if necessary for subclass
	 */
	generateAuthScene() {
		throw	"Unimplemented Method";
	}
}