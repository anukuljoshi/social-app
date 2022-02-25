import { useDispatch, useSelector } from "react-redux";

import {
	Avatar,
	Button,
	Card,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";

import { IStoreState } from "../../../redux/store";
import { followUserAction } from "../../../redux/actions/users";
import { Link } from "react-router-dom";
import { URLRoutes } from "../../../constants/routes";
import { BASE_API_URL } from "../../../constants/api";

interface UserListItemProps {
	user: IUser;
}

const UserListItem = ({ user }: UserListItemProps) => {
	const dispatch = useDispatch();
	const { user: authUser } = useSelector((state: IStoreState) => state.auth);

	return (
		<Card sx={{ mb: 2 }}>
			<ListItem
				alignItems="center"
				secondaryAction={
					user.id !== authUser?.user_id && (
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
					)
				}
			>
				<ListItemAvatar>
					<Link to={`/${URLRoutes.USERS}/${user.username}`}>
						<Avatar
							alt={user.username}
							src={`${BASE_API_URL}${user.profile.image}`}
							sx={{ height: 60, width: 60, mr: 2 }}
						/>
					</Link>
				</ListItemAvatar>
				<ListItemText
					primary={
						<Link to={`/${URLRoutes.USERS}/${user.username}`}>
							{user.username}
						</Link>
					}
					secondary={user.profile.bio}
				/>
			</ListItem>
		</Card>
	);
};

export default UserListItem;
