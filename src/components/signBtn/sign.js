import SignInService from "../../services/sign/signInService.js";
import SignUpService from "../../services/sign/signUpService.js";

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

	constructor(page, customerService, loggerService) {
		this.#page = page;
		this.#customerService = customerService;
		this.#loggerService = loggerService;
		document.getElementById("signInSubmit").addEventListener("click", this.#signInUp.bind(this));
	}

	#signInUp() {
		let	inputText = document.getElementById("noMailInput").value;
		let	isNumber = !Number.isNaN(inputText);

		if (this.#page)
			this.#signIn(inputText, isNumber);
		else
			this.#signUp(inputText, isNumber);
	}

	#signIn(inputText, isNumber) {
		let	signInService = new SignInService(this.#customerService, this.#loggerService);

		if (isNumber) {
			if (signInService.checkNumberValidity(inputText)) {

			}
			else {
				
			}
		}
		else if (signInService.checkEmailValidity(inputText)) {

		}
	}

	#signUp(inputText, isNumber) {
		let signUpService = new SignUpService(this.#customerService, this.#loggerService);
	}
}