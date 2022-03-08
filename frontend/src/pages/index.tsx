import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Backdrop,
	Button,
	ButtonGroup,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from "@mui/material";

import PostList from "../components/posts/List";
import PostCreateForm from "../components/posts/CreateForm";

import { IStoreState } from "../redux/store";
import {
	getAllPostListAction,
	getFollowingUserPostListAction,
} from "../redux/actions/posts";

type View = "all" | "following";

const HomePage = () => {
	const dispatch = useDispatch();
	const { loading, error, posts } = useSelector(
		(state: IStoreState) => state.posts.list
	);
	const [view, setView] = useState<View>("following");

	useEffect(() => {
		if (view === "following") {
			dispatch(getFollowingUserPostListAction());
		} else if (view === "all") {
			dispatch(getAllPostListAction());
		}
	}, [dispatch, view]);

	if (loading) {
		return (
			<Container>
				<Backdrop
					sx={{
						color: "#fff",
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={loading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			</Container>
		);
	}

	if (error) {
		return (
			<Container>
				<Typography variant={"h5"}>Error</Typography>
			</Container>
		);
	}

	return (
		<Container>
			<Grid container spacing={5}>
				<Grid item xs={0} md={2} lg={3}></Grid>
				<Grid item xs={12} md={8} lg={6}>
					{
						<>
							<PostCreateForm />
							<ButtonGroup sx={{ mb: 2 }}>
								<Button
									variant={
										view === "following"
											? "contained"
											: "outlined"
									}
									onClick={() => setView("following")}
								>
									FOLLOWING
								</Button>
								<Button
									variant={
										view === "all"
											? "contained"
											: "outlined"
									}
									onClick={() => setView("all")}
								>
									ALL
								</Button>
							</ButtonGroup>
							<PostList posts={posts} />
						</>
					}
				</Grid>
				<Grid item xs={0} md={2} lg={3}></Grid>
			</Grid>
		</Container>
	);
};

export default HomePage;
