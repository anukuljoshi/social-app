import { ActionTypes } from "../actions/types";

interface IUserList {
	loading: boolean;
	error: boolean;
	users: IUser[];
}

const userList: IUserList = {
	loading: false,
	error: false,
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
				users: [],
			};
		case ActionTypes.USER_LIST_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				users: [],
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
				(user) => user.id === action.payload.following.id
			);
			tempUsers[index] = action.payload.following;
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
	loading: boolean;
	error: boolean;
	user: IUser | null;
}

const userDetail: IUserDetail = {
	loading: false,
	error: false,
	user: null,
};

export const userDetailReducer = (
	state = userDetail,
	action: any
): IUserDetail => {
	let tempUser;
	switch (action.type) {
		case ActionTypes.USER_DETAIL_LOADING:
			return {
				...state,
				loading: true,
				error: false,
				user: null,
			};
		case ActionTypes.USER_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				user: null,
			};
		case ActionTypes.USER_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				user: action.payload,
			};
		case ActionTypes.USER_FOLLOW:
			tempUser = { ...state.user };
			if (tempUser.id === action.payload.following.id) {
				tempUser = action.payload.following;
			} else if (tempUser.id === action.payload.follower.id) {
				tempUser = action.payload.follower;
			}
			return {
				...state,
				loading: false,
				error: false,
				user: tempUser,
			};
		default:
			return state;
	}
};
