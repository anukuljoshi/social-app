import { useSelector, useDispatch } from "react-redux";

import {
	AppBar,
	Box,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

// redux
import { changeThemeAction } from "../../redux/actions/theme";

// typescript
import { IStoreState } from "../../redux/store";

const Navbar = () => {
	const dispatch = useDispatch();
	const { mode } = useSelector((state: IStoreState) => state.theme);

	const changeTheme = () => {
		dispatch(changeThemeAction());
	};
    
	return (
		<AppBar color={"secondary"}>
			<Container maxWidth={"xl"}>
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						component="div"
						noWrap
						sx={{ fontWeight: "medium" }}
					>
						Social App
					</Typography>
					<Box>
						<IconButton onClick={changeTheme}>
							{mode === "light" ? <DarkMode /> : <LightMode />}
						</IconButton>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
