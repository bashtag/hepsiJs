/**
 * Customer class for every customer data
 */
export default class	Customer {
	constructor(id, firstName, lastName, email, number, birthDate, city) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.number = number;
		this.birthDate = birthDate;
		this.city = city;
	}
}