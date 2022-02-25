import { Dispatch } from "redux";

import axiosInstance from "../../services/api";

import { ActionTypes } from "./types";

export const getUserFollowersAction = (username: string) => {
	return (dispatch: Dispatch) => {
		axiosInstance
			.get(`/users/${username}/followers/`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: ActionTypes.USER_LIST_SUCCESS,
						payload: res.data,
					});
				}
			})
			.catch((error) => {
				console.log("getUserFollowersAction error", error);
				dispatch({ type: ActionTypes.USER_LIST_ERROR });
			});
	};
};

export const getUserFollowingAction = (username: string) => {
	return (dispatch: Dispatch) => {
		axiosInstance
			.get(`/users/${username}/following/`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: ActionTypes.USER_LIST_SUCCESS,
						payload: res.data,
					});
				}
			})
			.catch((error) => {
				console.log("getUserFollowingAction error", error);
				dispatch({ type: ActionTypes.USER_LIST_ERROR });
			});
	};
};

export const getUserDetailAction = (username: string) => {
	return (dispatch: Dispatch) => {
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
				console.log("getUserDetailAction error", error.response);
				dispatch({ type: ActionTypes.USER_DETAIL_ERROR });
			});
	};
};

export const followUserAction = (followingId: string | number) => {
	return (dispatch: Dispatch) => {
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
				console.log("followUserAction error", error);
				dispatch({ type: ActionTypes.USER_LIST_ERROR });
			});
	};
};

export const changeUserImageAction = (data: any) => {
	return (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.USER_DETAIL_SUCCESS, payload: data });
	};
};
