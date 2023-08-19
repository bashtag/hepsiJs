import BaseLogger from "../../../crossCuttingConcerns/logging/baselogger.js";
import CustomerService from "../../../services/CustomerService.js";
import SignAction from "./SignAction.js";

export default class	SignUpAction extends SignAction {
	
	/**
	 * 
	 * @param {CustomerService} customerService 
	 * @param {BaseLogger} loggerService 
	 * @param {string} inputText 
	 * @param {number} isNumber 
	 */
	constructor(customerService, loggerService, inputText, isNumber) {
		super(customerService, loggerService, inputText, isNumber)
	}

	/**
	 * Auth scene for sign up which including a form.
	 * Pure Virtual Method.
	 */
	generateAuthScene() {
		console.log("sign up")
	}
}