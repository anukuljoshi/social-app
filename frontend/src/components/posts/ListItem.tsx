import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import {
	Box,
	Card,
	CardHeader,
	CardMedia,
	IconButton,
	Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";

import { IStoreState } from "../../redux/store";
import { upvotePostAction } from "../../redux/actions/posts";

import { BASE_API_URL } from "../../constants/api";

interface PostListItemProps {
	post: IPost;
}

const PostListItem = ({ post }: PostListItemProps) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: IStoreState) => state.auth);

	return (
		<Card sx={{ py: 1, mb: 2 }}>
			<CardHeader
				title={post.user.username}
				subheader={dayjs(post.created_at).format("MMM D, YYYY HH:mm A")}
				titleTypographyProps={{ variant: "body1" }}
				subheaderTypographyProps={{ variant: "body2" }}
				sx={{ py: 0 }}
			/>
			{post.image && (
				<CardMedia
					component={"img"}
					image={`${BASE_API_URL}${post.image}`}
					alt={`${post.content.substring(0, 20)}...`}
					height={200}
				/>
			)}
			<Box sx={{ px: 2, py: 1 }}>
				<Typography variant="body2">{post.content}</Typography>
			</Box>
			<Box alignItems={"end"} sx={{ px: 2, py: 0 }}>
				{post.votes}
				<IconButton
					size="small"
					onClick={() => {
						dispatch(upvotePostAction(post.id));
					}}
				>
					<Favorite
						color={
							post.upvoted_by.findIndex(
								(item) => item === user?.user_id
							) === -1
								? "disabled"
								: "primary"
						}
					/>
				</IconButton>
			</Box>
		</Card>
	);
};

export default PostListItem;
