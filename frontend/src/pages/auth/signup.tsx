import { Container, Grid, Paper } from "@mui/material";

import SignupForm from "../../components/auth/SignupForm";

const SignUp = () => {
	return (
		<Container>
			<Grid container justifyContent={"center"}>
				<Grid item xs={12} md={6} lg={4} component={Paper}>
					<SignupForm />
				</Grid>
			</Grid>
		</Container>
	);
};

export default SignUp;
