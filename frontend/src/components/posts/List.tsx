import { Typography } from "@mui/material";

import PostListItem from "./ListItem";

interface PostListProps {
	posts: IPost[];
}

const PostList = ({ posts }: PostListProps) => {
	return (
		<>
			{posts.length > 0 ? (
				posts.map((post) => <PostListItem key={post.id} post={post} />)
			) : (
				<Typography variant={"h5"}>No posts</Typography>
			)}
		</>
	);
};

export default PostList;
