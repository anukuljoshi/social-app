import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import {
	Box,
	Button,
	FormControl,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { loginUserAction } from "../../redux/actions/auth";

import { BASE_API_URL } from "../../constants/api";

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errors, setErrors] = useState<any>(null);

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("Required"),
			password: Yup.string().required("Required"),
		}),
		onSubmit: (values, { setSubmitting }) => {
			setSubmitting(false);
			axios
				.post(`${BASE_API_URL}/api/users/login/`, values, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					setSubmitting(true);
					if (res.status === 200) {
						dispatch(loginUserAction(res.data));
						navigate("/");
					}
				})
				.catch((error) => {
					setSubmitting(true);
					console.log("log in error", error);
					if (error.response.status === 400) {
						setErrors(error.response.data);
					}
				});
		},
	});

	const handleTestUserLogin = () => {
		axios
			.get(`${BASE_API_URL}/api/users/login/guest/`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				if (res.status === 200) {
					dispatch(loginUserAction(res.data));
					navigate("/");
				}
			})
			.catch((error) => {
				console.log("log in error", error);
				if (error.response && error.response.status === 400) {
					setErrors(error.response.data);
				}
			});
	};

	return (
		<Box sx={{ px: 3, py: 2 }}>
			<form onSubmit={formik.handleSubmit}>
				<Typography variant={"h4"} align={"center"}>
					Log In
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
				<Stack
					direction={"row"}
					justifyContent={"center"}
					alignItems={"center"}
					spacing={2}
					sx={{ mb: 1 }}
				>
					<Button type={"submit"} variant={"contained"}>
						Log In
					</Button>
					<Button variant={"contained"} onClick={handleTestUserLogin}>
						Log In as Guest
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default LoginForm;
