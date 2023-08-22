// import Page from "../modules/page.js";

/**
 * Class for Switch Button Job
 */
export default class	SwitchBtn {
	#signInUnderButton;
	#page;

	/**
	 * It takes radio buttons and adds the listener each of them.
	 * It uses a Page class to indicate.
	 * @param {Page} page 
	 */
	constructor(page) {
		this.signInRadio = document.getElementById("signInRadio");
		this.signOutRadio = document.getElementById("signUpRadio");
		this.#page = page;

		this.#getSignInUnderButton();
		this.#addListener();
	}

	/**
	 * Get the help button on sign in mode for once
	 */
	#getSignInUnderButton() {
		let	helpBtn = document.getElementById("helpBtn");
		this.#signInUnderButton = helpBtn.cloneNode(true);
	}

	/**
	 * Add Listeners to radio buttons
	 */
	#addListener() {
		this.signInRadio.addEventListener("change", this.#getSignIn.bind(this));
		this.signOutRadio.addEventListener("change", this.#getSignUp.bind(this));
	}

	/**
	 * Switch to Sign Up Mode
	 */
	#getSignUp() {
		// Button text
		let	submitBtn = document.getElementById("signInSubmit");
		submitBtn.innerText = "Devam et";

		// Clarification part
		let	newParagraphTag = document.createElement("p");
		newParagraphTag.innerText = "Kişisel verileriniz, Aydınlatma Metni kapsamında işlenmektedir. “Devam et” veya “Sosyal Hesap” butonlarından birine basarak Üyelik Sözleşmesi’ni ve Gizlilik Politikası’nı okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz."
		newParagraphTag.classList.add("clarification-text");

		let	removingElement = document.getElementById("helpBtn");
		let	parentElement = removingElement.parentNode;

		parentElement.replaceChild(newParagraphTag, removingElement);

		// Indicate to the Page
		this.#page.setSignOut();
	}

	/**
	 * Switch to Sign In Mode
	 */
	#getSignIn() {
		// Button text
		let	submitBtn = document.getElementById("signInSubmit");
		submitBtn.innerText = "Giriş yap";

		// Help button part
		let	clarifText = document.getElementsByClassName("clarification-text")[0];
		let	parentEl = clarifText.parentNode;

		parentEl.replaceChild(this.#signInUnderButton, clarifText);

		// Indicate to the Page
		this.#page.setSignIn();
	}
}