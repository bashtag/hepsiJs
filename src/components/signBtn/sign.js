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
			new SignInService(this.#customerService, this.#loggerService, inputText, isNumber);
		else
			new SignUpService(this.#customerService, this.#loggerService, inputText, isNumber);
	}
}