import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
	Backdrop,
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from "@mui/material";

import UserDetailCard from "../../components/users/detail/DetailCard";
import PostList from "../../components/posts/List";

import { IStoreState } from "../../redux/store";
import {
	getUserDetailAction,
	getUserFollowersAction,
	getUserFollowingAction,
} from "../../redux/actions/users";
import {
	getUserCreatedPostsAction,
	getUserLikedPostsAction,
} from "../../redux/actions/posts";
import UserList from "../../components/users/list/List";

type UserDetailView = "CREATED" | "LIKED" | "FOLLOWERS" | "FOLLOWING";

const UserDetail = () => {
	const dispatch = useDispatch();
	const params: any = useParams();
	const {
		error: postError,
		loading: postLoading,
		posts,
	} = useSelector((state: IStoreState) => state.posts.list);
	const {
		error: userError,
		loading: userLoading,
		users,
	} = useSelector((state: IStoreState) => state.users.list);
	const { loading, error, user } = useSelector(
		(state: IStoreState) => state.users.detail
	);

	const [view, setView] = useState<UserDetailView>("CREATED");

	useEffect(() => {
		dispatch(getUserDetailAction(params.username));
	}, [dispatch, params.username]);

	useEffect(() => {
		if (user) {
			if (view === "CREATED") {
				dispatch(getUserCreatedPostsAction(user?.username!));
			} else if (view === "LIKED") {
				dispatch(getUserLikedPostsAction(user?.username!));
			} else if (view === "FOLLOWERS") {
				dispatch(getUserFollowersAction(user?.username!));
			} else if (view === "FOLLOWING") {
				dispatch(getUserFollowingAction(user?.username!));
			}
		}
	}, [dispatch, user, view]);

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
				{user ? (
					<>
						<Grid item xs={12} md={4} lg={4}>
							<UserDetailCard user={user} />
						</Grid>
						<Grid item xs={12} md={8} lg={6}>
							<ButtonGroup sx={{ mb: 2 }}>
								<Button
									variant={
										view === "CREATED"
											? "contained"
											: "outlined"
									}
									onClick={() => setView("CREATED")}
								>
									CREATED
								</Button>
								<Button
									variant={
										view === "LIKED"
											? "contained"
											: "outlined"
									}
									onClick={() => setView("LIKED")}
								>
									LIKED
								</Button>
								<Button
									variant={
										view === "FOLLOWERS"
											? "contained"
											: "outlined"
									}
									onClick={() => setView("FOLLOWERS")}
								>
									FOLLOWERS
								</Button>
								<Button
									variant={
										view === "FOLLOWING"
											? "contained"
											: "outlined"
									}
									onClick={() => setView("FOLLOWING")}
								>
									FOLLOWING
								</Button>
							</ButtonGroup>
							{(view === "CREATED" || view === "LIKED") &&
								postLoading && (
									<Box
										display={"flex"}
										justifyContent={"center"}
									>
										<CircularProgress color="inherit" />
									</Box>
								)}
							{(view === "CREATED" || view === "LIKED") &&
								postError && (
									<Typography variant={"h5"}>
										Error
									</Typography>
								)}
							{(view === "CREATED" || view === "LIKED") &&
								!postError &&
								!postLoading && <PostList posts={posts} />}

							{(view === "FOLLOWERS" || view === "FOLLOWING") &&
								userLoading && (
									<Box
										display={"flex"}
										justifyContent={"center"}
									>
										<CircularProgress color="inherit" />
									</Box>
								)}
							{(view === "FOLLOWERS" || view === "FOLLOWING") &&
								userError && (
									<Typography variant={"h5"}>
										Error
									</Typography>
								)}
							{(view === "FOLLOWERS" || view === "FOLLOWING") &&
								!userError &&
								!userLoading && <UserList users={users} />}
						</Grid>
						<Grid item xs={0} md={0} lg={2}></Grid>
					</>
				) : (
					<Box display={"flex"} justifyContent={"center"}>
						<CircularProgress color="inherit" />
					</Box>
				)}
			</Grid>
		</Container>
	);
};

export default UserDetail;
