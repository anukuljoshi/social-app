import { ActionTypes } from "../actions/types";

interface IAuthUser {
	loading: boolean;
	error: boolean;
    login: boolean;
	user: {
		username?: string;
		token?: string;
	};
}

const authUserState: IAuthUser = {
	loading: false,
	error: false,
    login: false,
	user: {},
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
            }
        case ActionTypes.AUTH_USER_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: false,
                login: true,
                user: action.payload,
            }
        case ActionTypes.AUTH_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: false,
                login: false,
                user: {}
            }
		default:
			return state;
	}
};
