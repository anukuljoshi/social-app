import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
} from "@mui/material";

import { IStoreState } from "../../../redux/store";
import { followUserAction } from "../../../redux/actions/users";

interface UserDetailCardProps {
	user: IUser;
}

const UserDetailCard = ({ user }: UserDetailCardProps) => {
	const dispatch = useDispatch();
	const { user: authUser } = useSelector((state: IStoreState) => state.auth);

	return (
		<Card>
			<CardHeader title={user.username} subheader={user.email} />
			<CardContent>
				<Typography variant={"body1"}>
					Followers: {user.followers.length}
				</Typography>
				<Typography variant={"body1"}>
					Following: {user.following.length}
				</Typography>
			</CardContent>
			<CardActions sx={{ px: 2 }}>
				{user.id !== authUser?.user_id && (
					<Button
						variant={"contained"}
						size={"small"}
						onClick={() => {
							dispatch(followUserAction(user.id));
						}}
					>
						{user.followers.findIndex(
							(follower) =>
								follower.follower === authUser?.user_id
						) === -1
							? "FOLLOW"
							: "UNFOLLOW"}
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default UserDetailCard;
