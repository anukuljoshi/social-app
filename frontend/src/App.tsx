import { useSelector } from "react-redux";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import Layout from "./components/layout/Layout";

import { IStoreState } from "./redux/store";

const lightTheme = createTheme({
	palette: {
		primary: {
			main: "#516BEB",
		},
		secondary: {
			main: "#12d2a1",
		},
		background: {
			default: "#FFFCDC",
			paper: "#EDD2F3",
		},
		text: {
			primary: "#252525",
			secondary: "#797979",
			disabled: "rgba(183,183,183,0.38)",
		},
		divider: "rgba(201,201,201,0.12)",
	},
	typography: {
		fontFamily: "Poppins",
	},
});

const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#226fe0",
		},
		secondary: {
			main: "#2bce9a",
		},
		background: {
			default: "#232931",
			paper: "#393E46",
		},
		text: {
			primary: "#d4d4d4",
			secondary: "#8e8e8e",
			disabled: "rgba(100,100,100,0.38)",
		},
		divider: "rgba(201,201,201,0.12)",
	},
	typography: {
		fontFamily: "Poppins",
	},
});

const App = () => {
	const { mode } = useSelector((state: IStoreState) => state.theme);

	return (
		<ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
			<CssBaseline />
			<Layout>
				<h1>Hello World</h1>
			</Layout>
		</ThemeProvider>
	);
};

export default App;
