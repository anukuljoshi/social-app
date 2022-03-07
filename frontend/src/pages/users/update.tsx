import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { Container, Grid, Typography } from "@mui/material";

import UserDetailCard from "../../components/users/detail/DetailCard";
import UserUpdateForm from "../../components/users/forms/UpdateForm";

import { IStoreState } from "../../redux/store";
import { getUserDetailAction } from "../../redux/actions/users";

const UserUpdate = () => {
	const params: any = useParams();
	const dispatch = useDispatch();
	const { user: authUser } = useSelector((state: IStoreState) => state.auth);
	const { error, user } = useSelector(
		(state: IStoreState) => state.users.detail
	);

	useEffect(() => {
		if (authUser) {
			dispatch(getUserDetailAction(authUser?.username));
		}
	}, [dispatch, authUser]);

	if (authUser && params.username !== authUser.username) {
		return <Navigate to={`/users/${authUser.username}/update`} />;
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
				<Grid item xs={12} md={4} lg={4}>
					<UserDetailCard user={user} />
				</Grid>
				<Grid item xs={12} md={8} lg={6}>
					<UserUpdateForm user={user} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default UserUpdate;
