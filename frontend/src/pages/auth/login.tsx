import { Container, Grid, Paper } from "@mui/material";

import LoginForm from "../../components/auth/LoginForm";

const LogIn = () => {
	return (
		<Container>
			<Grid container justifyContent={"center"}>
				<Grid item xs={12} md={6} lg={4} component={Paper}>
					<LoginForm />
				</Grid>
			</Grid>
		</Container>
	);
};

export default LogIn;
