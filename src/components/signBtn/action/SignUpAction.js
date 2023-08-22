import SignAction from "./SignAction.js";

export default class	SignUpAction extends SignAction {
	
	/**
	 * 
	 * @param {string} inputText 
	 * @param {number} isNumber 
	 */
	constructor(signBtn, inputText, isNumber) {
		super(signBtn, inputText, isNumber)
	}

	/**
	 * Auth scene for sign up which including a form.
	 * Pure Virtual Method.
	 */
	generateAuthScene() {
		console.log("ABOV")
	}
}