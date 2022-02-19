import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
	AppBar,
	Container,
	IconButton,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { DarkMode, LightMode, Logout } from "@mui/icons-material";

// redux
import { changeThemeAction } from "../../redux/actions/theme";
import { logoutUserAction } from "../../redux/actions/auth";
import { IStoreState } from "../../redux/store";

// contants
import { URLRoutes } from "../../constants/routes";

const Navbar = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: IStoreState) => state.auth);
	const { mode } = useSelector((state: IStoreState) => state.theme);

	const changeTheme = () => {
		dispatch(changeThemeAction());
	};

	const handleLogout = () => {
		dispatch(logoutUserAction());
	};

	return (
		<AppBar color={"secondary"}>
			<Toolbar>
				<Stack
					component={Container}
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Link to={""}>
						<Typography
							variant="h6"
							component="div"
							noWrap
							sx={{ fontWeight: "medium" }}
						>
							Social App
						</Typography>
					</Link>
					<Stack direction={"row"} alignItems={"center"} spacing={2}>
						<IconButton onClick={changeTheme}>
							{mode === "light" ? <DarkMode /> : <LightMode />}
						</IconButton>
						{user ? (
							<>
								<Link
									to={`${URLRoutes.USERS}/${user?.username}`}
								>
									<Typography
										variant="body1"
										component="div"
										noWrap
									>
										{user?.username}
									</Typography>
								</Link>
								<IconButton onClick={handleLogout}>
									<Logout />
								</IconButton>
							</>
						) : (
							<>
								<Link to={`${URLRoutes.SIGNUP}`}>
									<Typography
										variant="body1"
										component="div"
										noWrap
									>
										Sign Up
									</Typography>
								</Link>
								<Link to={`${URLRoutes.LOGIN}`}>
									<Typography
										variant="body1"
										component="div"
										noWrap
									>
										Log In
									</Typography>
								</Link>
							</>
						)}
					</Stack>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
