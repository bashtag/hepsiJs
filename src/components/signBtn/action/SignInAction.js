import BaseLogger from "../../../crossCuttingConcerns/logging/baselogger.js";
import Hash from "../../../modules/authantication/hash.js";
import CustomerService from "../../../services/CustomerService.js";
import SignBtn from "../sign.js";
import SignAction from "./SignAction.js";

export default class	SignInAction extends SignAction {
	/**
	 * 
	 * @param {SignBtn} signBtn
	 * @param {CustomerService} customerService 
	 * @param {BaseLogger} loggerService 
	 * @param {string} inputText 
	 * @param {number} isNumber 
	 */
	constructor(signBtn, customerService, loggerService, inputText, isNumber) {
		super(signBtn, customerService, loggerService, inputText, isNumber);
	}

	/**
	 * Auth scene for sign in.
	 * Pure Virtual Method.
	 */
	generateAuthScene() {

		this.addWelcomeHeader()
		
		this.addEmailNoText();

		this.addRefreshPage();

		this.addBackButtonAction();

		this.addPasswdInput();

		// bind functions
		this.boundAuth = this.authanticate.bind(this);
		this.boundAuthEnter = function(event) {
				if (event.key == "Enter")
					this.authanticate();
			}.bind(this);

		document.getElementById("signInSubmit").addEventListener("click", this.boundAuth);
		document.getElementById("passwdInput").addEventListener("keyup", this.boundAuthEnter);
	}

	/**
	 * if the input's hash matches the customer's hash,
	 * Authanticate successfuly
	 */
	authanticate() {
		let	passwdInput = document.getElementById("passwdInput");

		SignAction.removeWrongInputText();	

		if (passwdInput.value == "")
			SignAction.generateWrongInput("Bir şifre girmelisin!");
		// Voila
		else if (Hash.calculateHash(passwdInput.value) == this.customerHash.hashPass)
			this.#generateEntry();
		else
			SignAction.generateWrongInput("Hatalı Şifre!");
	}

	/**
	 * Work is finished.
	 * Congrat page
	 */
	#generateEntry() {
		// remove the listeners
		document.getElementById("signInSubmit").removeEventListener("click", this.boundAuth);
		document.getElementById("passwdInput").removeEventListener("keyup", this.boundAuthEnter);

		let	mainContainer = document.getElementsByClassName("container")[0];

		console.log("(DEBUG) Congrats!");
	}
	
	/**
	 * Change email input to a password input
	 * @returns if password input is already existing on the page, return false
	 */
	addPasswdInput() {
		if (document.getElementById("passwdInput"))
			return (false);

		let	mailForm = document.getElementById("noMailInput");
		mailForm.type = "password";
		mailForm.id = "passwdInput";
		mailForm.placeholder = "Şifre";
		mailForm.value = "";
	}
	
	/**
	 * Add an action to the back button
	 */
	addBackButtonAction() {
		if (document.getElementById("backButton"))
			document.getElementById("backButton").addEventListener("click", function() {
				location.reload();
			});
	}

	/**
	 * Add back button
	 * @returns If back-button is already there, it returns false.
	 */
	addRefreshPage() {
		// check the button is there or not
		if (document.getElementById("backButton"))
			return (false);

		// refresh page svg
		let	refreshSvg = document.createElement("img");
		refreshSvg.src = "assets/backButton.svg";

		// back button
		let	refreshPageButton = document.createElement("button");
		refreshPageButton.id = "backButton";
		refreshPageButton.classList.add(["btn"]);
		refreshPageButton.appendChild(refreshSvg);
		refreshPageButton.type = "button";
		
		// row
		let	rowDiv = document.createElement("div");
		rowDiv.classList.add(["row"]);
		
		// col
		let	colDiv = document.createElement("div");
		colDiv.classList.add(["col-1"]);
		rowDiv.appendChild(colDiv);

		// append email text
		colDiv.appendChild(refreshPageButton);

		// get form
		let	authForm = document.getElementById("authForm");
		authForm.insertBefore(rowDiv, authForm.firstChild);

		return (true);
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
		emailNoText.innerText = this.customer.email;

		// row
		let	rowDiv = document.createElement("div");
		rowDiv.classList.add(["row", "justify-content-center"]);
		
		// col
		let	colDiv = document.createElement("div");
		colDiv.classList.add(["col"]);
		rowDiv.appendChild(colDiv);

		// append email text
		colDiv.appendChild(emailNoText);

		// get form
		let	authForm = document.getElementById("authForm");
		authForm.insertBefore(rowDiv, authForm.childNodes.item(2));

		return (true);
	}

	/**
	 * To add welcome header for auth scene
	 */
	addWelcomeHeader() {
		// Welcome Header
		let	welcomeHeader = document.createElement("h1");
		welcomeHeader.classList.add(["fs-3"]);
		welcomeHeader.innerText = "Hoş Geldiniz!";

		// Get the radio buttons
		let	radioButtons = document.getElementById("signRadios");

		// Change Radio Button to Welcome Header
		if (radioButtons != null)
			radioButtons.parentNode.replaceChild(welcomeHeader, radioButtons);

	}
}