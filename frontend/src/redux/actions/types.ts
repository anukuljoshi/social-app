export enum ActionTypes {
	CHANGE_THEME = "CHANGE_THEME",

	// auth user
	AUTH_USER_ERROR = "AUTH_USER_ERROR",
	AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS",
	LOGIN_SUCCESS = "LOGIN_SUCCESS",
	LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
	REFRESH_TOKEN = "REFRESH_TOKEN",

	// posts
	POST_LIST_SUCCESS = "POST_LIST_SUCCESS",
	POST_LIST_ERROR = "POST_LIST_ERROR",
	POST_CREATE = "POST_CREATE",
	POST_UPVOTE = "POST_UPVOTE",

	// posts
	USER_LIST_SUCCESS = "USER_LIST_SUCCESS",
	USER_LIST_ERROR = "USER_LIST_ERROR",
	USER_DETAIL_SUCCESS = "USER_DETAIL_SUCCESS",
	USER_DETAIL_ERROR = "USER_DETAIL_ERROR",
	USER_FOLLOW = "USER_FOLLOW",
	USER_CREATED_POSTS = "USER_CREATED_POSTS",
	USER_LIKED_POSTS = "USER_LIKED_POSTS",
}
