import { useEffect, useState } from "react";

import { Container, Typography } from "@mui/material";

import useAxios from "../utils/useAxios";

const HomePage = () => {
	const [data, setData] = useState<any>();
	const axiosInstance = useAxios();

	useEffect(() => {
		axiosInstance
			.get("/posts/")
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Container>
			<Typography variant={"h2"}>Hello Home</Typography>
			{data && data.message}
		</Container>
	);
};

export default HomePage;
