import { ActionTypes } from "../actions/types";

interface IThemeState {
	mode: "light" | "dark";
}

const themeState: IThemeState = {
	mode: localStorage.getItem("theme") === "dark" ? "dark" : "light",
};

export const themeReducer = (state = themeState, action: any): IThemeState => {
	switch (action.type) {
		case ActionTypes.CHANGE_THEME:
			if (state.mode === "light") {
				localStorage.setItem("theme", "dark");
			} else {
				localStorage.setItem("theme", "light");
			}
			return {
				mode: state.mode === "light" ? "dark" : "light",
			};
		default:
			return state;
	}
};
