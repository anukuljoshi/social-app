import jwt_decode from "jwt-decode";

import { ActionTypes } from "../actions/types";

interface IAuthUser {
	token_type?: string;
	exp?: number;
	iat?: number;
	jti?: string;
	user_id?: string | number;
	username?: string;
	email?: string;
}

interface IAuthUser {
	loading: boolean;
	error: boolean;
	user?: IAuthUser | null;
	access?: string | null;
	refresh?: string | null;
}

const authUserState: IAuthUser = {
	loading: false,
	error: false,
	user: localStorage.getItem("access")
		? jwt_decode(localStorage.getItem("access")!)
		: null,
	access: localStorage.getItem("access")
		? localStorage.getItem("access")
		: null,
	refresh: localStorage.getItem("refresh")
		? localStorage.getItem("refresh")
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
		case ActionTypes.LOGIN_SUCCESS:
			localStorage.setItem("access", action.payload.access);
			localStorage.setItem("refresh", action.payload.refresh);
			return {
				...state,
				loading: false,
				error: false,
				access: action.payload.access,
				refresh: action.payload.refresh,
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
				access: null,
				refresh: null,
				user: null,
			};
		default:
			return state;
	}
};
