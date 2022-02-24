import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
	Button,
	ButtonGroup,
	Container,
	Grid,
	Typography,
} from "@mui/material";

import UserDetailCard from "../../components/users/detail/DetailCard";
import PostList from "../../components/posts/List";

import { IStoreState } from "../../redux/store";
import { getUserDetailAction } from "../../redux/actions/users";
import {
	getUserCreatedPostsAction,
	getUserLikedPostsAction,
} from "../../redux/actions/posts";

const UserDetail = () => {
	const dispatch = useDispatch();
	const params: any = useParams();
	const {
		error: postError,
		loading: postLoading,
		posts,
	} = useSelector((state: IStoreState) => state.posts.list);
	const { error, loading, user } = useSelector(
		(state: IStoreState) => state.users.detail
	);

	const [view, setView] = useState<string>("CREATED");

	useEffect(() => {
		dispatch(getUserDetailAction(params.username));
	}, [dispatch, params.username]);

	useEffect(() => {
		if (user) {
			if (view === "CREATED") {
				dispatch(getUserCreatedPostsAction(user?.username!));
			} else if (view === "LIKED") {
				dispatch(getUserLikedPostsAction(user?.username!));
			}
		}
	}, [dispatch, user, view]);

	if (loading) {
		return (
			<Container>
				<Typography variant={"h2"}>Loading...</Typography>
			</Container>
		);
	}

	if (error || !user) {
		return (
			<Container>
				<Typography variant={"h2"}>Error</Typography>
			</Container>
		);
	}

	return (
		<Container>
			<Grid container spacing={5}>
				<Grid item xs={0} md={4} lg={3}>
					<UserDetailCard user={user} />
				</Grid>
				<Grid item xs={12} md={8} lg={6}>
					<ButtonGroup sx={{ mb: 2 }}>
						<Button
							variant={
								view === "CREATED" ? "contained" : "outlined"
							}
							onClick={() => setView("CREATED")}
						>
							CREATED
						</Button>
						<Button
							variant={
								view === "LIKED" ? "contained" : "outlined"
							}
							onClick={() => setView("LIKED")}
						>
							LIKED
						</Button>
					</ButtonGroup>
					{postLoading && (
						<Typography variant={"h5"}>Loading...</Typography>
					)}
					{postError && <Typography variant={"h5"}>Error</Typography>}
					{!postLoading && !postError && <PostList posts={posts} />}
				</Grid>
				<Grid item xs={0} md={0} lg={3}></Grid>
			</Grid>
		</Container>
	);
};

export default UserDetail;
