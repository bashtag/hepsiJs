import BaseLogger from "../../crossCuttingConcerns/logging/baselogger.js";
import CustomerService from "../CustomerService.js";
import SignService from "./SignService.js";

export default class	SignInService extends SignService {

	/**
	 * 
	 * @param {CustomerService} customerService 
	 * @param {BaseLogger} loggerService 
	 * @param {string} inputText 
	 * @param {number} isNumber 
	 */
	constructor(customerService, loggerService, inputText, isNumber) {
		super(customerService, loggerService, inputText, isNumber);
	}

	/**
	 * Auth scene for sign in.
	 * Pure Virtual Method.
	 */
	generateAuthScene() {
		console.log("sign in");
		let	authHtml = document.createElement("form");
		authHtml.innerHTML
	}
}