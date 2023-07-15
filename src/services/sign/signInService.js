export default class	SignInService {
	constructor(customerService, loggerService) {

	}

	logIn(inputText) {

	}
	
	/**
	 * The email is valid or not.
	 * A regex algorithm is used
	 * @param {string} inputText 
	 * @returns boolean
	 */
	checkEmailValidity(inputText) {
		let hasErrors = inputText.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		) != null;

		// if (hasErrors)
		// 	this.#errors.push(new DataError("Wrong Email Type:", inputText));

		return (hasErrors);
	}

	/**
	 * If the number is valid or not.
	 * A regex algorithm is used
	 * @param {string} inputText 
	 * @returns boolean
	 */
	checkNumberValidity(inputText) {
		let	hasErrors = inputText.match(
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		) != null;

		// if (hasErrors)
		// 	this.#errors.push(new DataError("Wrong Number Type:" + inputText));

		return (hasErrors);
	}
}