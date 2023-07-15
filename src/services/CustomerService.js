import { hashes } from "../data/hashes"
import { users } from "../data/users"
import Hash from "../modules/authantication/hash"
import Customer from "../modules/customer"

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
	 * @param {string} inputText 
	 */
	constructor(loggerService) {
		this.#loggerService = loggerService
		this.#load();
	}

	/**
	 * load data in users.js and hashes.js
	 */
	#load() {
		for (const user in users)
			this.#addCustomers(user);
		
		for (const hash in hashes)
			this.#addHashes(hash);
	}

	/**
	 * Add Customers to the Customer List
	 * @param {Customer} customer 
	 */
	#addCustomers(customer) {
		if (!this.#checkCustomerValidityForErrors(customer))
			this.#customers.push(customer);

		this.#loggerService.log(customer);
	}

	/**
	 * Check user validty.
	 * If there will be a problem, then DataError occurs in of errors list
	 * @param {Customer} customer 
	 */
	#checkCustomerValidityForErrors(customer) {
		let	required = "id firstName lastName email number birthDate city "
		let	requiredFields = required.split(" ");
		let	hasErrors = false;

		for (const field of requiredFields) {
			if (!customer[field]) {
				hasErrors = true;
				this.#errors.push(new DataError(`Validation problem ${field} is required.`, customer));
			}
		}

		if (Number.isNaN(Number.parseInt(+customer.number))) {
			hasErrors = true;
			this.#errors.push(`Validation problem. ${customer.number} is not a number.`, customer);
		}

		return (hasErrors);
	}

	/**
	 * Add hashes to the hash list
	 * @param {Hash} hash 
	 */
	#addHashes(hash) {
		if (!this.#checkHashValidityForErrors(hash))
			this.#passwdHashes.push(hash);

		this.#loggerService.log(hash);
	}

	/**
	 * Check Hash object validity
	 * @param {Hash} hash 
	 */
	#checkHashValidityForErrors(hash) {
		let	hasErrors = false;

		if (!hash["id"]) {
			hasErrors = true;
			this.#errors.push(new DataError(`Validation problem id is required.`, hash));
		}

		if (Number.isNaN(hash.getHash())) {
			hasErrors = true;
			this.#errors.push(new DataError(`Validation problem ${hash.getHash()} is not a number.`, hash));
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