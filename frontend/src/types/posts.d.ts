interface IPost {
	id: string | number;
	user: IUser;
	content: string;
	image: string;
	upvoted_by: string[] | number[];
	downvoted_by: string[] | number[];
	votes: number;
	created_at: string;
	updated_at: string;
}
