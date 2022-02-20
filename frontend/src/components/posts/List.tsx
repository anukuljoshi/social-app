import PostListItem from "./ListItem";

interface PostListProps {
	posts: IPost[];
}

const PostList = ({ posts }: PostListProps) => {
	return (
		<>
			{posts.map((post) => (
				<PostListItem key={post.id} post={post} />
			))}
		</>
	);
};

export default PostList;
