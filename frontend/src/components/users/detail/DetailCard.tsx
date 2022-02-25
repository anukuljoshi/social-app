import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
	Avatar,
	Box,
	Button,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material";

import { IStoreState } from "../../../redux/store";
import { followUserAction } from "../../../redux/actions/users";

import { URLRoutes } from "../../../constants/routes";
import { BASE_API_URL } from "../../../constants/api";
import { Edit } from "@mui/icons-material";

interface UserDetailCardProps {
	user: IUser;
}

const UserDetailCard = ({ user }: UserDetailCardProps) => {
	const dispatch = useDispatch();
	const { user: authUser } = useSelector((state: IStoreState) => state.auth);

	return (
		<Stack
			component={Paper}
			justifyContent={"center"}
			spacing={1}
			sx={{ px: 2, py: 2 }}
		>
			<Avatar
				alt={`${user.username}`}
				src={`${BASE_API_URL}${user.profile.image}`}
				sx={{ width: 160, height: 160, margin: "auto" }}
			/>
			<Typography
				variant={"caption"}
				textAlign={"center"}
				fontStyle={"italic"}
			>
				{user.profile.bio}
			</Typography>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<Box>
					<Typography variant={"body1"}>{user.username}</Typography>
					<Typography variant={"body2"}>{user.email}</Typography>
				</Box>
				<Box>
					{user.id === authUser?.user_id && (
						<Link
							to={`/${URLRoutes.USERS}/${user.username}/update`}
						>
							<IconButton color={"primary"}>
								<Edit />
							</IconButton>
						</Link>
					)}
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
				</Box>
			</Box>
			<Box>
				<Typography variant={"body2"}>
					{`${user.followers.length} Followers, ${user.following.length} Following`}
				</Typography>
			</Box>
		</Stack>
	);
};

export default UserDetailCard;
