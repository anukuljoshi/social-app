import { Dispatch } from "redux";

import { ActionTypes } from "./types";

import axiosInstance from "../../utils/axiosInstance";

export const getAllPostListAction = () => {
	return (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.POST_LIST_LOADING });

		axiosInstance
			.get("/posts/all")
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: ActionTypes.POST_LIST_SUCCESS,
						payload: res.data,
					});
				}
			})
			.catch((error) => {
				console.log("get all post list action error", error);
				dispatch({ type: ActionTypes.POST_LIST_ERROR });
			});
	};
};

export const createPostAction = (data: any) => {
	return (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.POST_CREATE, payload: data });
	};
};

export const upvotePostAction = (postId: string | number) => {
	return (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.POST_LIST_LOADING });

		axiosInstance
			.patch(`/posts/${postId}/upvote/`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: ActionTypes.POST_UPVOTE,
						payload: res.data,
					});
				}
			})
			.catch((error) => {
				console.log("upvote post action error", error);
				dispatch({ type: ActionTypes.POST_LIST_ERROR });
			});
	};
};
