/**
 * Check methods
 * email
 * telephone number
 */
export default class	Check {

	/**
	 * The email is valid or not.
	 * A regex algorithm is used
	 * @param {string} inputText 
	 * @returns boolean
	 */
	static	checkEmailValidity(inputText) {
		let hasErrors = inputText.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		) != null;

		return (hasErrors);
	}

	/**
	 * If the number is valid or not.
	 * A regex algorithm is used
	 * @param {string} inputText 
	 * @returns boolean
	 */
	static	checkNumberValidity(inputText) {
		let	hasErrors = inputText.match(
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		) != null;

		return (hasErrors);
	}
}