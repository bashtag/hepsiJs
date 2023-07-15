// Page Class Module
export default class	Page {
	// Private
	#isIn;

	/**
	 * Default Constructor
	 */
	constructor() {

		// Private Members
		this.#isIn = true;
	}

	/**
	 * In login mode or not?
	 * @returns {Boolean}
	 */
	isSignIn() {
		return (this.#isIn);
	}

	/**
	 * Set the page boolean to sign up mode
	 */
	setSignOut() {
		this.#isIn = false;
	}

	/**
	 * set the page boolean to sign in mode
	 */
	setSignIn() {
		this.#isIn = true;
	}
}