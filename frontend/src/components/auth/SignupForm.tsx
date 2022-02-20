import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

import { URLRoutes } from "../../constants/routes";
import { BASE_API_URL } from "../../constants/api";

const SignupForm = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState<any>(null);

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			cnfpassword: "",
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.max(25, "Must be 25 characters or less")
				.required("Required"),
			email: Yup.string().email("Invalid email").required("Required"),
			password: Yup.string()
				.min(6, "Must be 6 characters or more")
				.required("Required"),
			cnfpassword: Yup.string().equals(
				[Yup.ref("password")],
				"Must be same as password"
			),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			// console.log(values);
			setSubmitting(false);
			axios
				.post(`${BASE_API_URL}/api/users/signup/`, values, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					setSubmitting(true);
					if (res.status === 201) {
						navigate(`${URLRoutes.LOGIN}`);
					}
				})
				.catch((error) => {
					setSubmitting(true);
					console.log("sign up error", error);
					if (error.response.status === 400) {
						setErrors(error.response.data);
					}
				});
		},
	});

	return (
		<Box sx={{ px: 3, py: 2 }}>
			<form onSubmit={formik.handleSubmit}>
				<Typography variant={"h4"} align={"center"}>
					Sign Up
				</Typography>
				<FormControl fullWidth>
					<TextField
						type={"text"}
						name={"username"}
						id={"username"}
						label={"Username"}
						variant={"standard"}
						onChange={formik.handleChange}
						value={formik.values.username}
						onBlur={formik.handleBlur}
						sx={{ mb: 2 }}
						error={
							(formik.touched.username &&
								Boolean(formik.errors.username)) ||
							(Boolean(errors) && Boolean(errors.errors.username))
						}
						helperText={
							formik.touched.username &&
							Boolean(formik.errors.username)
								? formik.errors.username
								: Boolean(errors) &&
								  Boolean(errors.errors.username)
								? errors.errors.username
								: null
						}
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						type={"email"}
						name={"email"}
						id={"email"}
						label={"Email"}
						variant={"standard"}
						onChange={formik.handleChange}
						value={formik.values.email}
						onBlur={formik.handleBlur}
						sx={{ mb: 2 }}
						error={
							(formik.touched.email &&
								Boolean(formik.errors.email)) ||
							(Boolean(errors) && Boolean(errors.errors.email))
						}
						helperText={
							formik.touched.email && Boolean(formik.errors.email)
								? formik.errors.email
								: Boolean(errors) &&
								  Boolean(errors.errors.email)
								? errors.errors.email
								: null
						}
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						type={"password"}
						name={"password"}
						id={"password"}
						label={"Password"}
						variant={"standard"}
						onChange={formik.handleChange}
						value={formik.values.password}
						onBlur={formik.handleBlur}
						sx={{ mb: 2 }}
						error={
							(formik.touched.password &&
								Boolean(formik.errors.password)) ||
							(Boolean(errors) && Boolean(errors.errors.password))
						}
						helperText={
							formik.touched.password &&
							Boolean(formik.errors.password)
								? formik.errors.password
								: Boolean(errors) &&
								  Boolean(errors.errors.password)
								? errors.errors.password
								: null
						}
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						type={"password"}
						name={"cnfpassword"}
						id={"cnfpassword"}
						label={"Confirm Password"}
						variant={"standard"}
						onChange={formik.handleChange}
						value={formik.values.cnfpassword}
						onBlur={formik.handleBlur}
						sx={{ mb: 2 }}
						error={
							formik.touched.cnfpassword &&
							Boolean(formik.errors.cnfpassword)
						}
						helperText={
							formik.touched.cnfpassword &&
							Boolean(formik.errors.cnfpassword)
								? formik.errors.cnfpassword
								: null
						}
					/>
				</FormControl>
				<Box textAlign={"center"}>
					<Button
						type={"submit"}
						variant={"contained"}
						sx={{ mb: 1 }}
					>
						Sign Up
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default SignupForm;
