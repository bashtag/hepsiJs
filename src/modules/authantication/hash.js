import { hashes } from "../../data/hashes.js";

/**
 * Hash Class to store password hashes
 */
export default class	Hash {
	/* Privates */

	// Logger Service
	#loggerService

	// Errors
	#errors = []

	/**
	 * Constructor that calculates the hash
	 * @param {number} id 
	 * @param {string} password 
	 * @param {*} loggerService 
	 */
	constructor(id, password, loggerService) {
		// id of the customer
		this.id = id;

		this.#loggerService = loggerService;

		// hashed password
		this.hashPass = Hash.calculateHash(password);

		this.isSuitable = this.#isThereMatchingIdOrHash();
	}

	/**
	 * Calculate the hash
	 * @param {string} password 
	 */
	static	calculateHash(password) {
		let asciiSum = password.split('')
			.reduce((acc, char) => {
				return acc + char.charCodeAt(0);
			}, 0);
		return (asciiSum * 599) % 2000000;
	}

	/**
	 * Catch the matching id or hash
	 * @returns if there is return true, otherwise false
	 */
	#isThereMatchingIdOrHash() {
		for (const hash of hashes) {
			if (hash[0] == this.id ||
				hash[1] == this.hashPass) {
				this.#errors.push(new DataError("id or hash not suitable."));
				return (true);
			}
		}

		return (false);
	}
}