import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export const changeThemeAction = () => {
	return (dispatch: Dispatch<any>) => {
		dispatch({ type: ActionTypes.CHANGE_THEME });
	};
};
