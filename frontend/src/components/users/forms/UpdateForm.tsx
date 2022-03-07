import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import {
	Avatar,
	Box,
	Button,
	FormControl,
	IconButton,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

import { FILE_SIZE, FILE_TYPES } from "../../../constants/file";
import { BASE_API_URL } from "../../../constants/api";

import { changeUserImageAction } from "../../../redux/actions/users";

import axiosInstance from "../../../services/api";

interface UserUpdateFormValues {
	bio: string;
	image: File | null;
}

interface UserUpdateFormProps {
	user: IUser;
}

const UserUpdateForm = ({ user }: UserUpdateFormProps) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState<any>(null);

	const formik = useFormik<UserUpdateFormValues>({
		initialValues: {
			bio: user.profile.bio,
			image: null,
		},
		validationSchema: Yup.object({
			bio: Yup.string().required("Required"),
			image: Yup.mixed()
				.test("fileSize", "File Size is too large", (value) => {
					if (value) {
						return value.size <= FILE_SIZE;
					} else {
						return true;
					}
				})
				.test("fileType", "Unsupported file format", (value) => {
					if (value) {
						return FILE_TYPES.includes(value?.type);
					} else {
						return true;
					}
				}),
		}),
		onSubmit: (values, { setSubmitting }) => {
			setSubmitting(false);
			const formData = new FormData();
			formData.append("bio", values.bio);
			if (values.image) {
				formData.append("image", values.image);
			}

			axiosInstance
				.patch(`/users/${user.username}/update/`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					setSubmitting(true);
					if (res.status === 200) {
						dispatch(changeUserImageAction(res.data));
					}
				})
				.catch((error) => {
					setSubmitting(true);
					console.log("user update error", error);
					if (error.response.status === 400) {
						setErrors(error.response.data);
					}
				});
		},
	});

	return (
		<Stack
			component={Paper}
			justifyContent={"space-between"}
			alignItems={"center"}
			// spacing={2}
			sx={{ display: "flex", px: 2, py: 2 }}
		>
			<Box>
				<Avatar
					alt={`${user.username}`}
					src={`${BASE_API_URL}${user.profile.image}`}
					sx={{ width: 160, height: 160 }}
				/>
			</Box>
			<form
				onSubmit={formik.handleSubmit}
				encType={"multipart/form-data"}
			>
				<Box textAlign={"center"} sx={{ mb: 2 }}>
					{formik.touched.image && Boolean(formik.errors.image) && (
						<Typography variant={"caption"} color={"red"}>
							{formik.errors.image}
							<br />
						</Typography>
					)}
					<IconButton component="label">
						<AddPhotoAlternate color="primary" />
						<input
							type="file"
							id="image"
							name="image"
							onChange={(e) =>
								formik.setFieldValue(
									"image",
									e.currentTarget?.files?.[0]
								)
							}
							hidden
						/>
					</IconButton>
					{formik.values.image?.name}
				</Box>
				<FormControl fullWidth sx={{ mb: 2 }}>
					<TextField
						type={"text"}
						id={"bio"}
						name={"bio"}
						label={"About"}
						value={formik.values.bio}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							(formik.touched.bio &&
								Boolean(formik.errors.bio)) ||
							(Boolean(errors) && Boolean(errors.errors.bio))
						}
						helperText={
							formik.touched.bio && Boolean(formik.errors.bio)
								? formik.errors.bio
								: Boolean(errors) && Boolean(errors.errors.bio)
								? errors.errors.bio
								: null
						}
					/>
				</FormControl>
				<Button type={"submit"} variant={"contained"} size={"small"}>
					UPDATE
				</Button>
			</form>
		</Stack>
	);
};

export default UserUpdateForm;
