import { ActionTypes } from "../actions/types";

interface IThemeState {
	mode: "light" | "dark";
}

const themeState: IThemeState = {
	mode: "light",
};

export const themeReducer = (state = themeState, action: any): IThemeState => {
	switch (action.type) {
		case ActionTypes.CHANGE_THEME:
			return {
				mode: state.mode === "light" ? "dark" : "light",
			};
		default:
			return state;
	}
};
