import BaseLogger from "../crossCuttingConcerns/logging/baselogger.js"
import { hashes } from "../data/hashes.js"
import { users } from "../data/users.js"
import Hash from "../modules/authantication/hash.js"
import Customer from "../modules/customer.js"
import DataError from "../modules/errorTypes/dataError.js"

export default class	CustomerService {
	// Private Members

	#customers = []

	// hash of passwds
	#passwdHashes = []

	// raising errors using object of this service
	#errors = []

	// A log service for logging
	#loggerService


	/**
	 * 
	 * @param {BaseLogger} loggerService 
	 */
	constructor(loggerService) {
		this.#loggerService = loggerService
		this.#load();
	}

	/**
	 * load data in users.js and hashes.js
	 */
	#load() {
		for (const user of users)
			this.addCustomer(user);
		
		for (const hash of hashes)
			this.addHash(hash);
	}

	/**
	 * Add Customers to the Customer List
	 * @param {Customer} customer 
	 */
	addCustomer(customer) {
		if (!this.checkCustomerValidityForErrors(customer))
			this.#customers.push(customer);

		this.#loggerService.addLog(customer);
	}

	/**
	 * Check user validty.
	 * If there will be a problem, then DataError occurs in of errors list
	 * @param {Customer} customer 
	 */
	checkCustomerValidityForErrors(customer) {
		let	required = "id firstName lastName email number birthDate city"
		let	requiredFields = required.split(" ");
		let	hasErrors = false;

		for (const field of requiredFields) {
			if (customer[field] === undefined) {
				hasErrors = true;
				this.#errors.push(new DataError(`Validation problem ${field} is required.`, customer));
			}
		}

		if (Number.isNaN(Number.parseInt(+customer.number))) {
			hasErrors = true;
			this.#errors.push(new DataError(`Validation problem. ${customer.number} is not a number.`, customer));
		}

		return (hasErrors);
	}

	/**
	 * Add hashes to the hash list
	 * @param {Hash} hash 
	 */
	addHash(hash) {
		if (!this.checkHashValidityForErrors(hash))
			this.#passwdHashes.push(hash);

		this.#loggerService.addLog(hash);
	}

	/**
	 * Check Hash object validity
	 * @param {Hash} hash 
	 */
	checkHashValidityForErrors(hash) {
		let	hasErrors = false;

		if (hash["id"] === undefined) {
			hasErrors = true;
			this.#errors.push(new DataError(`Validation problem id is required.`, hash));
		}

		if (Number.isNaN(hash.hashPass)) {
			hasErrors = true;
			this.#errors.push(new DataError(`Validation problem ${hash.hashPass} is not a number.`, hash));
		}

		return (hasErrors);
	}

	/**
	 * 
	 * @returns Customer List
	 */
	getCustomerList() {
		return (this.#customers);
	}

	/**
	 * 
	 * @returns Error List
	 */
	getErrorList() {
		return (this.#errors);
	}

	/**
	 * 
	 * @returns Hash List
	 */
	getHashList() {
		return (this.#passwdHashes);
	}
}