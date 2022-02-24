import { ActionTypes } from "../actions/types";

interface IUserList {
	error: boolean;
	loading: boolean;
	users: IUser[];
}

const userList: IUserList = {
	error: false,
	loading: false,
	users: [],
};

export const userListReducer = (state = userList, action: any): IUserList => {
	let tempUsers, index;
	switch (action.type) {
		case ActionTypes.USER_LIST_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case ActionTypes.USER_LIST_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		case ActionTypes.USER_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				users: action.payload,
			};
		case ActionTypes.USER_FOLLOW:
			tempUsers = [...state.users];
			index = tempUsers.findIndex(
				(user) => user.id === action.payload.id
			);
			tempUsers[index] = action.payload;
			return {
				...state,
				loading: false,
				error: false,
				users: tempUsers,
			};
		default:
			return state;
	}
};

interface IUserDetail {
	error: boolean;
	loading: boolean;
	user: IUser | null;
}

const userDetail: IUserDetail = {
	error: false,
	loading: false,
	user: null,
};

export const userDetailReducer = (
	state = userDetail,
	action: any
): IUserDetail => {
	switch (action.type) {
		case ActionTypes.USER_DETAIL_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case ActionTypes.USER_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		case ActionTypes.USER_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				user: action.payload,
			};
		case ActionTypes.USER_FOLLOW:
			return {
				...state,
				loading: false,
				error: false,
				user: action.payload,
			};
		default:
			return state;
	}
};
