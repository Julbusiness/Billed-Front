import { ROUTES_PATH } from "../constants/routes.js";
import Logout from "./Logout.js";

console.log("Je suis dans newbill.js du containers"); //!

export default class NewBill {
	constructor({ document, onNavigate, store, localStorage }) {
		this.document = document;
		this.onNavigate = onNavigate;
		this.store = store;
		const formNewBill = this.document.querySelector(
			`form[data-testid="form-new-bill"]`
		);
		formNewBill.addEventListener("submit", this.handleSubmit);
		const file = this.document.querySelector(`input[data-testid="file"]`);
		file.addEventListener("change", this.handleChangeFile);
		this.fileUrl = null;
		this.fileName = null;
		this.billId = null;
		new Logout({ document, localStorage, onNavigate });
	}

	handleChangeFile = (e) => {
		console.log("je suis dans  le fonction handleChangeFile dans NewBill.js"); //!
		e.preventDefault();
		const file = this.document.querySelector(`input[data-testid="file"]`)
			.files[0];

		//! test modif

		const allowedExtensions = ["jpg", "jpeg", "png"];
		const fileExtension = file.name.split(".").pop();

		if (allowedExtensions.includes(fileExtension)) {
			console.log("Je trouve bien une extension correcte");
			document.getElementById("error-filetype").classList.add("hide");

			const filePath = e.target.value.split(/\\/g);
			const fileName = filePath[filePath.length - 1];
			const formData = new FormData();
			const email = JSON.parse(localStorage.getItem("user")).email;
			formData.append("file", file);
			formData.append("email", email);

			this.store
				.bills()
				.create({
					data: formData,
					headers: {
						noContentType: true,
					},
				})
				.then(({ fileUrl, key }) => {
					console.log(fileUrl);
					this.billId = key;
					this.fileUrl = fileUrl;
					this.fileName = fileName;
				})
				.catch((error) => console.error(error));
		} else {
			document.getElementById("error-filetype").classList.remove("hide");
			this.document.querySelector(`input[data-testid="file"]`).value = null;
		}
	};
	handleSubmit = (e) => {
		console.log("je suis dans  le fonction handleSubmit dans NewBill.js"); //!

		e.preventDefault();
		console.log(
			'e.target.querySelector(`input[data-testid="datepicker"]`).value',
			e.target.querySelector(`input[data-testid="datepicker"]`).value
		);
		const email = JSON.parse(localStorage.getItem("user")).email;

		//!
		if (
			e.target.querySelector(`input[data-testid="expense-name"]`).value.length >
			5
		) {
			document.getElementById("error-expensename").classList.add("hide");

			const bill = {
				email,
				type: e.target.querySelector(`select[data-testid="expense-type"]`)
					.value,
				name: e.target.querySelector(`input[data-testid="expense-name"]`).value,
				amount: parseInt(
					e.target.querySelector(`input[data-testid="amount"]`).value
				),
				date: e.target.querySelector(`input[data-testid="datepicker"]`).value,
				vat: e.target.querySelector(`input[data-testid="vat"]`).value,
				pct:
					parseInt(e.target.querySelector(`input[data-testid="pct"]`).value) ||
					20,
				commentary: e.target.querySelector(`textarea[data-testid="commentary"]`)
					.value,
				fileUrl: this.fileUrl,
				fileName: this.fileName,
				status: "pending",
			};
			this.updateBill(bill);
			this.onNavigate(ROUTES_PATH["Bills"]);
		} else {
			document.getElementById("error-expensename").classList.remove("hide");
		}
		//!
	};

	// not need to cover this function by tests
	updateBill = (bill) => {
		console.log("je suis dans  le fonction updateBill dans NewBill.js"); //!

		if (this.store) {
			this.store
				.bills()
				.update({ data: JSON.stringify(bill), selector: this.billId })
				.then(() => {
					this.onNavigate(ROUTES_PATH["Bills"]);
				})
				.catch((error) => console.error(error));
		}
	};
}
