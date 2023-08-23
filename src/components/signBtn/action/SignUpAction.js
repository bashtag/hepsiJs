import Check from "../../../modules/authantication/check.js";
import SignAction from "./SignAction.js";
import SignInAction from "./SignInAction.js";

export default class	SignUpAction extends SignAction {
	
	/**
	 * 
	 * @param {string} inputText 
	 * @param {number} isNumber 
	 */
	constructor(signBtn, wrongInputTextComp, inputText, isNumber) {
		super(signBtn, wrongInputTextComp, inputText, isNumber);

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
	}

	/**
	 * It creates a registration form
	 */
	createForm() {
		let	passwdInput = document.getElementById("noMailInput");
		passwdInput.value = "";

		// first name input
		let	firstNameInput = passwdInput.cloneNode(true);
		firstNameInput.id = "firstNameInput";

		let	lastNameInput = passwdInput.cloneNode(true);
		lastNameInput.id = "lastNameInput";

		let	numberInput = passwdInput.cloneNode(true);
		numberInput.id = "numberInput";

		let	cityInput = passwdInput.cloneNode(true);
		cityInput.id = "cityInput";


		// now this is an password input
		passwdInput.type = "password";
		passwdInput.id = "passwdInput";
		passwdInput.placeholder = "Şifre";


		
		passwdInput.parentNode.insertBefore(firstNameInput, passwdInput);
		passwdInput.parentNode.insertBefore(lastNameInput, passwdInput);
		passwdInput.parentNode.insertBefore(numberInput, passwdInput);
		passwdInput.parentNode.insertBefore(cityInput, passwdInput);
	}

	/**
	 * To add a hello writing instead of radio buttons
	 */
	addHelloHeader() {
		// Hello
		let	helloWriting = document.createElement("h1");
		helloWriting.classList.add("fs-3");
		helloWriting.innerText = "Merhaba!";

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