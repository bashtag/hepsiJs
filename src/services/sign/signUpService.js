import BaseLogger from "../../crossCuttingConcerns/logging/baselogger.js";
import CustomerService from "../CustomerService.js";
import SignService from "./SignService.js";

export default class	SignUpService extends SignService {
	
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