import SignBtn from "./components/signBtn/sign.js";
import SwitchBtn from "./components/signRadioBtn/switch.js";
import JsLogger from "./crossCuttingConcerns/logging/logger.js";
import Page from "./modules/page.js";
import CustomerService from "./services/CustomerService.js"

// Page Action Infos
let	pageActionInfo = new Page();

// Radio Button Attribute
let	radioBtnAttribute = new SwitchBtn(pageActionInfo);

// Logger
let	jsLogger = new JsLogger();

// Customer Service
let	customerService = new CustomerService(jsLogger);

// Sign Button
let	signButtonAction = new SignBtn(pageActionInfo, customerService, jsLogger);
