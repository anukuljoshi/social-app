import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import {
	Box,
	Button,
	FormControl,
	IconButton,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

import { createPostAction } from "../../redux/actions/posts";

import axiosInstance from "../../utils/axiosInstance";

import { FILE_SIZE, FILE_TYPES } from "../../constants/file";

interface PostCreateFormValues {
	content: string;
	image: File | null;
}

const PostCreateForm = () => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState<any>(null);

	const formik = useFormik<PostCreateFormValues>({
		initialValues: {
			content: "",
			image: null,
		},
		validationSchema: Yup.object({
			content: Yup.string().required("Required"),
			image: Yup.mixed()
				.test(
					"fileSize",
					"File Size is too large",
					(value) => value?.size <= FILE_SIZE
				)
				.test("fileType", "Unsupported file format", (value) =>
					FILE_TYPES.includes(value?.type)
				),
		}),
		onSubmit: (values, { setSubmitting, resetForm }) => {
			setSubmitting(false);
			const formData = new FormData();
			formData.append("content", values.content);
			if (values.image) {
				formData.append("image", values.image);
			}
			axiosInstance
				.post("/posts/create/", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					setSubmitting(true);
					console.log(res.data);
					if (res.status === 201) {
						dispatch(createPostAction(res.data));
					}
					resetForm();
				})
				.catch((error) => {
					setSubmitting(true);
					console.log("post create error", error);
					if (error.response.status === 400) {
						setErrors(error.response.data);
					}
				});
		},
	});
	return (
		<Paper sx={{ p: 2, mb: 2 }}>
			<form
				onSubmit={formik.handleSubmit}
				encType={"multipart/form-data"}
			>
				<FormControl fullWidth sx={{ mb: 2 }}>
					<TextField
						type={"text"}
						id={"content"}
						name={"content"}
						value={formik.values.content}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							(formik.touched.content &&
								Boolean(formik.errors.content)) ||
							(Boolean(errors) && Boolean(errors.errors.content))
						}
						helperText={
							formik.touched.content &&
							Boolean(formik.errors.content)
								? formik.errors.content
								: Boolean(errors) &&
								  Boolean(errors.errors.content)
								? errors.errors.content
								: null
						}
					/>
				</FormControl>
				<Box display={"flex"} justifyContent={"space-between"}>
					<div>
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
					</div>
					<div>
						<Button
							type={"submit"}
							variant={"contained"}
							size={"small"}
						>
							Post
						</Button>
					</div>
				</Box>
			</form>
		</Paper>
	);
};

export default PostCreateForm;
