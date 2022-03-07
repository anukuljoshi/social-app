import { Link } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";

const NotFoundPage = () => {
	return (
		<Container>
			<Typography>Page not found</Typography>
			<Link to={"/"}>
				<Button variant={"text"}>Go Back To Home Page</Button>
			</Link>
		</Container>
	);
};

export default NotFoundPage;
