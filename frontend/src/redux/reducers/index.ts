import { combineReducers } from "redux";

import { themeReducer } from "./theme";
import { authUserReducer } from "./auth";
import { postListReducer } from "./posts";
import { userListReducer, userDetailReducer } from "./users";

export const rootReducers = combineReducers({
	theme: themeReducer,
	auth: authUserReducer,
	posts: combineReducers({
		list: postListReducer,
	}),
	users: combineReducers({
		list: userListReducer,
		detail: userDetailReducer,
	}),
});
