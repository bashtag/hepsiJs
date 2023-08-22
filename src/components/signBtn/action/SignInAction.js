import Hash from "../../../modules/authantication/hash.js";
import WrongInputTextComponent from "../../wrongText/wrongInputText.js";
import SignBtn from "../sign.js";
import SignAction from "./SignAction.js";

export default class	SignInAction extends SignAction {
	/**
	 * Construct this sign in action
	 * 
	 * @param {SignBtn} signBtn for bind functions in the super class
	 * @param {WrongInputTextComponent} wrongInputTextComp
	 * @param {string} inputText given text
	 * @param {number} isNumber is number or not? (email)
	 */
	constructor(signBtn, wrongInputTextComp, inputText, isNumber) {
		super(signBtn, wrongInputTextComp, inputText, isNumber);
	}

	/**
	 * Auth scene for sign in.
	 * Pure Virtual Method.
	 */
	generateAuthScene() {
		this.loggerService.emailMatchLog(this.customer);

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

		this.wrongInputTextComp.removeWrongInputText();	

		if (passwdInput.value == "")
			this.wrongInputTextComp.generateWrongInput("Bir şifre girmelisin!");
		// Voila
		else if (Hash.calculateHash(passwdInput.value) == this.customerHash.hashPass) {
			this.loggerService.successfulLoginLog(this.customer);
			this.#generateEntry();
		}
		else
			this.wrongInputTextComp.generateWrongInput("Hatalı Şifre!");
	}

	/**
	 * Work is finished.
	 * Congrat page
	 */
	#generateEntry() {
		// remove the listeners
		document.getElementById("signInSubmit").removeEventListener("click", this.boundAuth);
		document.getElementById("passwdInput").removeEventListener("keyup", this.boundAuthEnter);

		// remove all elements but hepsiburada header
		document.getElementById("auth").remove();
		document.getElementById("authDiff").remove();

		/* display identity */
		let	identityRowDiv = this.displayIdentity();

		// Add to container
		let	containerDiv = document.getElementsByClassName("container")[0];
		containerDiv.appendChild(identityRowDiv);

		/* Hello text */
		let	helloRowDiv = this.createHelloText();

		// Add to container
		containerDiv.insertBefore(helloRowDiv, identityRowDiv);

		// horizontal ruler below of the hepsiburada header
		let	hrElement = document.createElement("hr");

		// add to container
		containerDiv.insertBefore(hrElement, helloRowDiv);

		/* Log out button */
		let	buttonRowDiv = this.generateLogOutButton();

		// add to the container
		containerDiv.appendChild(buttonRowDiv);

		// add a listener
		document.getElementById("logOutBtn").addEventListener("click", function() {
			location.reload();
		});
	}

	/**
	 * Log out button to return the log in page
	 * @returns row of the button
	 */
	generateLogOutButton() {
		// row
		let	rowDiv = document.createElement("div");
		rowDiv.classList.add("row", "m-5");

		// col
		let	colDiv = document.createElement("div");
		colDiv.classList.add("col");
		rowDiv.appendChild(colDiv);

		// button
		let	button = document.createElement("button");
		button.classList.add("btn", "submit", "my-3");
		button.type = "button";
		button.innerText = "Çıkış yap";
		button.id = "logOutBtn";
		button.style.width = "200px"
		colDiv.appendChild(button);

		return (rowDiv);
	}

	/**
	 * The identity list for success page
	 * @return row of the list
	 */
	displayIdentity() {
		// list items
		let	liFirstName = document.createElement("li");
		liFirstName.innerText = "First Name: " + this.customer.firstName;
		liFirstName.classList.add("list-group-item")
		let	liLastName = document.createElement("li");
		liLastName.innerText = "Last Name: " + this.customer.lastName;
		liLastName.classList.add("list-group-item")
		let	liEmail = document.createElement("li");
		liEmail.innerText = "Email: " + this.customer.email;
		liEmail.classList.add("list-group-item")
		let	liNumber = document.createElement("li");
		liNumber.innerText = "Number: " + this.customer.number;
		liNumber.classList.add("list-group-item")
		let	liBirthDate = document.createElement("li");
		liBirthDate.innerText = "Birth Year: " + this.customer.birthDate;
		liBirthDate.classList.add("list-group-item")
		let	liCity = document.createElement("li");
		liCity.innerText = "City: " + this.customer.city;
		liCity.classList.add("list-group-item")

		// unordered list
		let	uList = document.createElement("ul");
		uList.classList.add("list-group");
		uList.append(liFirstName, liLastName, liEmail, liNumber, liBirthDate, liCity);

		// row
		let	rowDiv = document.createElement("div");
		rowDiv.classList.add("row", "m-5");

		// col
		let	colDiv = document.createElement("div");
		colDiv.classList.add("col");

		// childs are connected
		rowDiv.appendChild(colDiv);
		colDiv.appendChild(uList);

		return (rowDiv);
	}

	/**
	 * Hello text below the hepsiburada header for success page
	 * @returns Row div for the text
	 */
	createHelloText() {
		// row
		let	rowDiv = document.createElement("div");
		rowDiv.classList.add("row", "m-5");

		// col
		let	colDiv = document.createElement("div");
		colDiv.classList.add("col");
		rowDiv.appendChild(colDiv);

		// text
		let	helloText = document.createElement("h1");
		helloText.classList.add("fs-2");
		helloText.innerText = "Merhaba " + this.customer.firstName + "!";
		colDiv.appendChild(helloText);

		return (rowDiv);
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
		refreshPageButton.classList.add("btn");
		refreshPageButton.appendChild(refreshSvg);
		refreshPageButton.type = "button";
		
		// row
		let	rowDiv = document.createElement("div");
		rowDiv.classList.add("row");
		
		// col
		let	colDiv = document.createElement("div");
		colDiv.classList.add("col-1");
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

	/**
	 * To add welcome header for auth scene
	 */
	addWelcomeHeader() {
		// Welcome Header
		let	welcomeHeader = document.createElement("h1");
		welcomeHeader.classList.add("fs-3");
		welcomeHeader.innerText = "Hoş Geldiniz!";

		// Get the radio buttons
		let	radioButtons = document.getElementById("signRadios");

		// Change Radio Button to Welcome Header
		if (radioButtons != null)
			radioButtons.parentNode.replaceChild(welcomeHeader, radioButtons);

	}
}