import { Dispatch } from "redux";

import { ActionTypes } from "./types";

export const loginUserAction = (data: any) => {
	return (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: data });
	};
};

export const logoutUserAction = () => {
	return (dispatch: Dispatch) => {
		dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
	};
};
