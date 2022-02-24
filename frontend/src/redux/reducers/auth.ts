import jwt_decode from "jwt-decode";

import { ActionTypes } from "../actions/types";

interface IAuthUser {
	loading: boolean;
	error: boolean;
	user: ITokenUser | null;
	access?: string | null;
	refresh?: string | null;
}

const authUserState: IAuthUser = {
	loading: false,
	error: false,
	user: localStorage.getItem("access")
		? jwt_decode(localStorage.getItem("access")!)
		: null,
};

export const authUserReducer = (
	state = authUserState,
	action: any
): IAuthUser => {
	switch (action.type) {
		case ActionTypes.AUTH_USER_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case ActionTypes.AUTH_USER_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				user: jwt_decode(action.payload.access),
			};
		case ActionTypes.LOGIN_SUCCESS:
			localStorage.setItem("access", action.payload.access);
			localStorage.setItem("refresh", action.payload.refresh);
			return {
				...state,
				loading: false,
				error: false,
				user: jwt_decode(action.payload.access),
			};
		case ActionTypes.AUTH_USER_ERROR:
		case ActionTypes.LOGOUT_SUCCESS:
			localStorage.removeItem("access");
			localStorage.removeItem("refresh");
			return {
				...state,
				loading: false,
				error: false,
				user: null,
			};
		default:
			return state;
	}
};
