import { Dispatch } from "redux";
import axiosInstance from "../../services/api";

import { ActionTypes } from "./types";

export const getUserDetailAction = (username: string | number) => {
	return (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.USER_DETAIL_LOADING });
		axiosInstance
			.get(`/users/${username}/`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: ActionTypes.USER_DETAIL_SUCCESS,
						payload: res.data,
					});
				}
			})
			.catch((error) => {
				console.log("upvote post action error", error);
				dispatch({ type: ActionTypes.USER_LIST_ERROR });
			});
	};
};

export const followUserAction = (followingId: string | number) => {
	return (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.USER_LIST_LOADING });
		axiosInstance
			.patch(`/users/${followingId}/follow/`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: ActionTypes.USER_FOLLOW,
						payload: res.data,
					});
				}
			})
			.catch((error) => {
				console.log("upvote post action error", error);
				dispatch({ type: ActionTypes.USER_LIST_ERROR });
			});
	};
};
