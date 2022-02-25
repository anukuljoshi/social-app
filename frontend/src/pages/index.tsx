import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Button,
	ButtonGroup,
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
	const { error, posts } = useSelector(
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

	return (
		<Container>
			<Grid container spacing={5}>
				<Grid item xs={0} md={2} lg={3}></Grid>
				<Grid item xs={12} md={8} lg={6}>
					<PostCreateForm />
					<ButtonGroup sx={{ mb: 2 }}>
						<Button
							variant={
								view === "following" ? "contained" : "outlined"
							}
							onClick={() => setView("following")}
						>
							FOLLOWING
						</Button>
						<Button
							variant={view === "all" ? "contained" : "outlined"}
							onClick={() => setView("all")}
						>
							ALL
						</Button>
					</ButtonGroup>
					{error && <Typography variant={"h5"}>Error</Typography>}
					{!error && <PostList posts={posts} />}
				</Grid>
				<Grid item xs={0} md={2} lg={3}></Grid>
			</Grid>
		</Container>
	);
};

export default HomePage;
