import { ActionTypes } from "../actions/types";

interface IPostList {
	error: boolean;
	loading: boolean;
	posts: IPost[];
}

const postList: IPostList = {
	error: false,
	loading: false,
	posts: [],
};

export const postListReducer = (state = postList, action: any): IPostList => {
	let tempPosts, index;
	switch (action.type) {
		case ActionTypes.POST_LIST_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case ActionTypes.POST_LIST_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		case ActionTypes.POST_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				posts: action.payload,
			};
		case ActionTypes.POST_CREATE:
			tempPosts = [...state.posts];
			tempPosts.unshift(action.payload);
			return {
				...state,
				loading: false,
				error: false,
				posts: tempPosts,
			};
		case ActionTypes.POST_UPVOTE:
			tempPosts = [...state.posts];
			index = tempPosts.findIndex(
				(post) => post.id === action.payload.id
			);
			tempPosts[index] = action.payload;
			return {
				...state,
				loading: false,
				error: false,
				posts: tempPosts,
			};
		default:
			return state;
	}
};
