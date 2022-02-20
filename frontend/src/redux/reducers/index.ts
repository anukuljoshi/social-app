import { combineReducers } from "redux";

import { themeReducer } from "./theme";
import { authUserReducer } from "./auth";
import { postListReducer } from "./posts";

export const rootReducers = combineReducers({
	theme: themeReducer,
	auth: authUserReducer,
	posts: combineReducers({
		list: postListReducer,
	}),
});
