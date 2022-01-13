import { combineReducers } from "redux";

import { themeReducer } from "./theme";

export const rootReducers = combineReducers({
	theme: themeReducer,
});
