import * as yup from "yup";

export default yup.object().shape({
	firstName: yup
		.string()
		.required('First Name is required'),
	lastName: yup
		.string()
		.required('Last Name is required'),
	email: yup
		.string().email()
		.required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(6)
		.max(20)
});