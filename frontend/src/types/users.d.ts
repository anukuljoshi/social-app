interface ITokenUser {
	token_type: string;
	exp: number;
	iat: number;
	jti: string;
	user_id: string | number;
	username: string;
	email: string;
}

interface IFollowUser {
	id: string | number;
	follower: string | number;
	following: string | number;
	created_at: string;
}

interface IUser {
	id: string | number;
	username: string;
	email: string;
	profile: {
		image: string;
	};
	followers: IFollowUser[];
	following: IFollowUser[];
}
