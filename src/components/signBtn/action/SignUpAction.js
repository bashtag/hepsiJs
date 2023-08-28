import Check from "../../../modules/authantication/check.js";
import Hash from "../../../modules/authantication/hash.js";
import Customer from "../../../modules/customer.js";
import WarningComponent from "../../warningText/warningComp.js";
import WrongInputWarningComponent from "../../warningText/wrongInputWarning.js";
import SuccessfulInputWarningComponent from "../../warningText/successfulInputWarning.js"
import SignAction from "./SignAction.js";

export default class	SignUpAction extends SignAction {
	
	/**
	 * Constructor of SignUpAction
	 * Creates a login form and register the customer to the customer service if it is necessary.
	 * @param {SignBtn} signBtn 
	 * @param {SuccessfulInputWarningComponent} successfulInputWarningComp
	 * @param {WrongInputWarningComponent} wrongInputWarningComp 
	 * @param {string} inputText 
	 * @param {number} isNumber 
	 */
	constructor(signBtn, wrongInputWarningComp, successfulInputWarningComp, inputText, isNumber) {
		super(signBtn, wrongInputWarningComp, inputText, isNumber);
		this.successfulInputWarningComp = successfulInputWarningComp;

		if (isNumber)
			this.signUp(Check.checkNumberValidity);
		else
			this.signUp(Check.checkEmailValidity);
	}

	/**
	 * Auth scene for sign up which including a form.
	 * Pure Virtual Method.
	 */
	generateAuthScene() {

		this.addHelloHeader();

		this.addEmailNoText();

		SignAction.addRefreshPage();

		SignAction.addBackButtonAction();

		this.createForm();

		// change the go on button's writing
		document.getElementById("signInSubmit").innerText = "Kayıt ol";

		// bind functions
		this.boundAddToService = this.addToCustomerService.bind(this);
		this.boundAddToServiceEnter = function(event) {
				if (event.key == "Enter")
					this.addToCustomerService();
			}.bind(this);

		// Submit button click
		document.getElementById("signInSubmit").addEventListener("click", this.boundAddToService);
		
		// Enter key press
		let	inputFields = document.querySelectorAll(".form-control");
		inputFields.forEach(function(inputField) {
				inputField.addEventListener("keyup", this.boundAddToServiceEnter);
			}.bind(this))

	}

	/**
	 * if all the inputs are correct,
	 * then add this customer to the customer service object.
	 */
	addToCustomerService() {
		// firstly remove the wrong input text
		WarningComponent.removeAllTheWarnings();

		// new customer property values
		let	firstName = document.getElementById("firstNameInput").value;
		let	lastName = document.getElementById("lastNameInput").value;
		let	number = document.getElementById("numberInput").value;
		let	birthDate = document.getElementById("birthDateInput").value;
		let	city = document.getElementById("cityInput").value;
		let	passwd = document.getElementById("passwdInput").value;

		// new customer id
		let	customerList = this.customerService.getCustomerList();
		let	newCustomerId  = customerList[customerList.length - 1].id + 1;

		// new customer
		let	customer = new Customer(newCustomerId, firstName, lastName,
			this.inputText, number, birthDate, city);

		// passwd hash
		let	hash = new Hash(newCustomerId, passwd);

		// blank input check
		let	isThereABlankInput = (passwd == "");
		let	customerValues = Object.values(customer);
		customerValues.forEach(value => {
				if (value == "")
					isThereABlankInput = true;
			})

		// Is there any same email on the customerService?
		let	isThereAnyMatchingEmail = this.customerService.getCustomerList().find(function(customer) {
				if (customer.email == this.inputText)
					return (true);
				return (false);
			}.bind(this)) != undefined;

		if (isThereABlankInput)
			this.wrongInputWarningComp.generateWarning("Bir şeyler eksik!");
		else if (isThereAnyMatchingEmail)
			this.wrongInputWarningComp.generateWarning("Aynı email ile bir daha kayıt olamazsın!");
		// success
		else if (!this.customerService.checkCustomerValidityForErrors(customer) &&
			!this.customerService.checkHashValidityForErrors(hash)) {
			this.customerService.addCustomer(customer);
			this.customerService.addHash(hash);

			this.successfulInputWarningComp.generateWarning("Başarıyla kayıt oldunuz!");

			console.log(customerList);
			console.log(this.customerService.getHashList())
		}
		else {
			this.wrongInputWarningComp.generateWarning("Bir şeyler yanlış ya da eksik!");
		}
	}

	/**
	 * It creates a registration form
	 */
	createForm() {
		let	passwdInput = document.getElementById("noMailInput");
		passwdInput.value = "";
		passwdInput.classList.add("my-3");
		passwdInput.style.height = "50px";

		// first name input
		let	firstNameInput = passwdInput.cloneNode(true);
		firstNameInput.id = "firstNameInput";
		firstNameInput.placeholder = "İsim";
		
		let	lastNameInput = passwdInput.cloneNode(true);
		lastNameInput.id = "lastNameInput";
		lastNameInput.placeholder = "Soyisim";

		let	numberInput = passwdInput.cloneNode(true);
		numberInput.id = "numberInput";
		numberInput.placeholder = "Cep Telefon Numarası";
		numberInput.type = "tel"

		let	birthDateInput = passwdInput.cloneNode(true);
		birthDateInput.id = "birthDateInput";
		birthDateInput.placeholder = "Doğum Yılı";
		birthDateInput.type = "number";
		birthDateInput.min = "1900";
		birthDateInput.max = "2100";
		birthDateInput.step = "1";

		let	cityInput = passwdInput.cloneNode(true);
		cityInput.id = "cityInput";
		cityInput.placeholder = "Şehir";


		// now this is an password input
		passwdInput.type = "password";
		passwdInput.id = "passwdInput";
		passwdInput.placeholder = "Şifre";
		
		passwdInput.parentNode.insertBefore(firstNameInput, passwdInput);
		passwdInput.parentNode.insertBefore(lastNameInput, passwdInput);
		passwdInput.parentNode.insertBefore(numberInput, passwdInput);
		passwdInput.parentNode.insertBefore(birthDateInput, passwdInput);
		passwdInput.parentNode.insertBefore(cityInput, passwdInput);
	}

	/**
	 * To add a hello writing instead of radio buttons
	 */
	addHelloHeader() {
		// Hello
		let	helloWriting = document.createElement("h1");
		helloWriting.classList.add("fs-3", "mt-3");
		helloWriting.innerText = "Merhaba Yeni Kullanıcı!";

		// Get the radio buttons
		let	radioButtons = document.getElementById("signRadios");

		// Change Radio Button to Welcome Header
		if (radioButtons != null)
			radioButtons.parentNode.replaceChild(helloWriting, radioButtons);
	}

	/**
	 * Add the email text below the welcome header
	 * @returns If email text is already there, it returns false.
	 */
	addEmailNoText() {
		// Check the text is there or not
		if (document.getElementById("welcomeEmailNoText"))
			return (false);

		// Email Text
		let	emailNoText = document.createElement("p");
		emailNoText.id = "welcomeEmailNoText"
		emailNoText.className = "fs-5";
		emailNoText.innerText = this.inputText;

		// row
		let	rowDiv = document.createElement("div");
		rowDiv.classList.add("row", "justify-content-center");
		
		// col
		let	colDiv = document.createElement("div");
		colDiv.classList.add("col");
		rowDiv.appendChild(colDiv);

		// append email text
		colDiv.appendChild(emailNoText);

		// get form
		let	authForm = document.getElementById("authForm");
		authForm.insertBefore(rowDiv, authForm.childNodes.item(2));

		return (true);
	}
}