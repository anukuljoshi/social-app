import { combineReducers } from "redux";

import { themeReducer } from "./theme";
import { authUserReducer } from './auth';


export const rootReducers = combineReducers({
	theme: themeReducer,
    auth: authUserReducer,
});
